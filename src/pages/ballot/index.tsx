import { AlertCircle, FileDown, FileUp } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import { useAccount } from "wagmi";
import { Alert } from "~/components/ui/Alert";
import { Button, IconButton } from "~/components/ui/Button";
import { Dialog } from "~/components/ui/Dialog";
import { Form } from "~/components/ui/Form";
import { Spinner } from "~/components/ui/Spinner";
import { config } from "~/config";
import { AllocationForm } from "~/features/ballot/components/AllocationList";
import {
  useBallot,
  sumBallot,
  useSaveBallot,
} from "~/features/ballot/hooks/useBallot";
import { BallotSchema, type Vote } from "~/features/ballot/types";
import { useProjectsById } from "~/features/projects/hooks/useProjects";
import { LayoutWithBallot } from "~/layouts/DefaultLayout";
import { useMaci } from "~/contexts/Maci";
import { parse, format } from "~/utils/csv";
import { formatNumber } from "~/utils/formatNumber";
import { getAppState } from "~/utils/state";
import { EAppState } from "~/utils/types";

export default function BallotPage() {
  const { data: ballot, isLoading } = useBallot();
  const { address, isConnecting } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!address && !isConnecting) {
      router.push("/").catch(console.log);
    }
  }, [address, isConnecting, router]);

  if (isLoading) return null;

  const votes = ballot?.votes.sort((a, b) => b.amount - a.amount);

  if (!votes) {
    return <EmptyBallot />;
  }

  return (
    <LayoutWithBallot sidebar="right" requireAuth>
      {isLoading ? null : (
        <Form
          schema={BallotSchema}
          defaultValues={{ votes }}
          onSubmit={console.log}
        >
          <BallotAllocationForm />
        </Form>
      )}
      <div className="py-8" />
    </LayoutWithBallot>
  );
}

function BallotAllocationForm() {
  const form = useFormContext<{ votes: Vote[] }>();
  const { pollData, initialVoiceCredits} = useMaci();
  const pollId = pollData?.id.toString();

  const save = useSaveBallot();
  const appState = getAppState();

  const votes = form.watch("votes");
  const { data: ballot } = useBallot();
  const sum = sumBallot(ballot?.votes);

  function handleSaveBallot({ votes }: { votes: Vote[] }) {
    save.mutate({ votes, pollId: pollId! });
  }

  function getCustomError (){
      if(sum < initialVoiceCredits){
        return "Todos tus votos deben ser utilizados"
      } if (sum > initialVoiceCredits) {
        return "Excediste tu cantidad de votos permitidos"
      } else {
        return "Todos los campos deben ser completados con valores numéricos."
      }
    }

  return (
    <div>
      <h1 className="mb-2 text-2xl font-bold">Revisar tu Votación</h1>
      <p className="mb-6">
        Una vez que haya revisado tu asignación de votos, puede enviarlos.
      </p>
      {
        (save.error || sum < initialVoiceCredits || sum > initialVoiceCredits) && (
        <Alert
          icon={AlertCircle}
          title={getCustomError()}
          className="mb-4"
          variant="warning"
        />
      )}
      <div className="mb-2 justify-between lg:flex">
        <div className="flex gap-2 mb-2q lg:mb-0">
          <ImportCSV />
          <ExportCSV votes={votes} />
        </div>
        {votes?.length ? <ClearBallot /> : null}
      </div>
      <div className="relative rounded-2xl border border-gray-300 dark:border-gray-800">
        <div className="p-8">
          <div className="relative flex max-h-[500px] min-h-[360px] flex-col overflow-auto">
            {votes?.length ? (
              <AllocationForm
                disabled={appState === EAppState.RESULTS}
                onSave={handleSaveBallot}
              />
            ) : (
              <EmptyBallot />
            )}
          </div>
        </div>

        <div className="flex h-16 items-center justify-between rounded-b-2xl border-t border-gray-300 px-8 py-4 text-lg font-semibold dark:border-gray-800">
          <div>Total de Votos</div>
          <div className="flex items-center gap-2">
            {save.isPending && <Spinner />}
            <TotalAllocation />
          </div>
        </div>
      </div>

    </div>
  );
}

function ImportCSV() {
  const form = useFormContext();
  const [votes, setVotes] = useState<Vote[]>([]);
  const save = useSaveBallot();
  const csvInputRef = useRef<HTMLInputElement>(null);
  const { pollData } = useMaci();
  const pollId = pollData?.id.toString();

  const importCSV = useCallback((csvString: string) => {
    // Parse CSV and build the ballot data (remove name column)
    const { data } = parse<Vote>(csvString);
    const votes =
      data?.map(({ projectId, amount }) => ({
        projectId,
        amount: Number(amount),
      })) ?? [];
    setVotes(votes);
  }, []);

  return (
    <>
      <IconButton
        size="sm"
        icon={FileUp}
        onClick={() => csvInputRef.current?.click()}
      >
        Importar CSV
      </IconButton>

      <input
        ref={csvInputRef}
        type="file"
        accept="*.csv"
        className="hidden"
        onChange={(e) => {
          const [file] = e.target.files ?? [];
          if (!file) return;
          // CSV parser doesn't seem to work with File
          // Read the CSV contents as string
          const reader = new FileReader();
          reader.readAsText(file);
          reader.onload = () => importCSV(String(reader.result));
          reader.onerror = () => console.log(reader.error);
        }}
      />
      <Dialog
        size="sm"
        title="Save ballot?"
        isOpen={votes?.length > 0}
        onOpenChange={() => setVotes([])}
      >
        <p className="mb-6 leading-6">
          Esto reemplazará tu votación con el CSV.
        </p>
        <div className="flex justify-end">
          <Button
            variant="primary"
            disabled={save.isPending}
            onClick={() => {
              save
                .mutateAsync({ votes, pollId: pollId! })
                .then(() => form.reset({ votes }))
                .catch(console.log);
              setVotes([]);
            }}
          >
            Si. Estoy de acuerdo
          </Button>
        </div>
      </Dialog>
    </>
  );
}

function ExportCSV({ votes }: { votes: Vote[] }) {
  // Fetch projects for votes to get the name
  const projects = useProjectsById(votes?.map((v) => v.projectId) ?? []);

  const exportCSV = useCallback(async () => {
    // Append project name to votes
    const votesWithProjects =
      votes?.map((vote) => ({
        ...vote,
        name: projects.data?.find((p) => p.id === vote.projectId)?.name,
      })) ?? [];

    // Generate CSV file
    const csv = format(votesWithProjects, {
      columns: ["projectId", "name", "amount"],
    });
    window.open(`data:text/csv;charset=utf-8,${csv}`);
  }, [projects, votes]);

  return (
    <IconButton size="sm" icon={FileDown} onClick={exportCSV}>
      Exportar CSV
    </IconButton>
  );
}

function ClearBallot() {
  const form = useFormContext();
  const [isOpen, setOpen] = useState(false);
  const { mutateAsync, isPending } = useSaveBallot();
  const { pollData } = useMaci();
  const pollId = pollData?.id.toString();

  if ([EAppState.TALLYING, EAppState.RESULTS].includes(getAppState()))
    return null;

  return (
    <>
      <Button variant="outline" onClick={() => setOpen(true)}>
        Quitar todos los proyectos de la Votación
      </Button>

      <Dialog
        title="Estás de acuerdo?"
        size="sm"
        isOpen={isOpen}
        onOpenChange={setOpen}
      >
        <p className="mb-6 leading-6">
          Esto vaciará tus votos y eliminará todos los proyectos que hayas agregado.
        </p>
        <div className="flex justify-end">
          <Button
            variant="primary"
            disabled={isPending}
            onClick={() =>
              mutateAsync({ votes: [], pollId: pollId! }).then(() => {
                setOpen(false);
                form.reset({ votes: [] });
              })
            }
          >
            {isPending ? <Spinner /> : "Si. Estoy de acuerdo"}
          </Button>
        </div>
      </Dialog>
    </>
  );
}

const EmptyBallot = () => (
  <div className="flex flex-1 items-center justify-center">
    <div className=" max-w-[360px] space-y-4">
      <h3 className="text-center text-lg font-bold">Tu votación está vacia</h3>
      <p className="text-center text-sm text-gray-700">
        Tu votación actualmente no tiene ningún proyecto agregado. 
      </p>
      <div className="flex items-center justify-center gap-3">
        <Button as={Link} href={"/projects"}>
          Ver Proyectos
        </Button>
        <div className="text-gray-700">o</div>
        <Button as={Link} href={"/lists"}>
          Ver Listas
        </Button>
      </div>
    </div>
  </div>
);

const TotalAllocation = () => {
  const form = useFormContext<{ votes: Vote[] }>();
  const votes = form.watch("votes") ?? [];
  const sum = sumBallot(votes);

  return (
    <div>
      {formatNumber(sum)} {config.tokenName}
    </div>
  );
};

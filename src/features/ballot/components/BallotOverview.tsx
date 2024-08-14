import { type PropsWithChildren, type ReactNode, useState } from "react";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

import { Alert } from "~/components/ui/Alert";
import { Button } from "~/components/ui/Button";
import { Progress } from "~/components/ui/Progress";
import { formatNumber } from "~/utils/formatNumber";
import { Dialog } from "~/components/ui/Dialog";
import { VotingEndsIn } from "./VotingEndsIn";
import { Spinner } from "~/components/ui/Spinner";
import {
  useProjectCount,
  useProjectIdMapping,
} from "~/features/projects/hooks/useProjects";
import { config } from "~/config";
import { getAppState } from "~/utils/state";
import { EAppState } from "~/utils/types";
import dynamic from "next/dynamic";
import { useMaci } from "~/contexts/Maci";
import { useBallot } from "~/contexts/Ballot";
import { useIsCorrectNetwork } from "~/hooks/useIsCorrectNetwork";

function BallotOverview() {
  const router = useRouter();

  const { isCorrectNetwork, correctNetwork } = useIsCorrectNetwork();
  const { isRegistered, isEligibleToVote, initialVoiceCredits } = useMaci();
  const { sumBallot, ballot } = useBallot();

  const sum = sumBallot(ballot?.votes);

  const allocations = ballot?.votes ?? [];
  const canSubmit = router.route === "/ballot" && allocations.length;
  const viewBallot = router.route !== "/ballot" && allocations.length;

  const { data: projectCount } = useProjectCount();

  const appState = getAppState();

  const { address } = useAccount();

  if (appState === EAppState.LOADING) {
    return <Spinner className="h-6 w-6" />;
  }

  console.log(">>STATE");
  console.log(appState);

  if(address === undefined || !isCorrectNetwork )
    return (
      <div className="flex flex-col items-center gap-2 pt-8 bg-gray-50 rounded-xl py-6">
        <BallotSection title="Conecta tu wallet para continuar" ></BallotSection>
      </div>
    );


  if (appState === EAppState.RESULTS)
    return (
      <div className="flex flex-col items-center gap-2 pt-8 bg-gray-50 rounded-xl py-8">
        <BallotHeader>¡Resultados publicados!</BallotHeader>
        {/** 
        <Button as={Link} href={"/projects/results"}>
          Ir a los resultados
        </Button>
        */}
      </div>
    );

  if (appState === EAppState.TALLYING)
    return (
      <div className="flex flex-col items-center gap-2 pt-8 bg-gray-50 rounded-xl py-6">
        <BallotHeader>La votación ha finalizado</BallotHeader>
        <BallotSection title="Votos están siendo contados"></BallotSection>
      </div>
    );

  if (appState !== EAppState.VOTING)
    return (
      <div className="flex flex-col items-center gap-2 pt-8 bg-gray-50 rounded-xl py-6">
        <BallotHeader>La votación aún no comienza</BallotHeader>
        {appState === EAppState.REVIEWING ? (
          <BallotSection title="Las aplicaciones están siendo revisadas" />
        ) : (
          <Button as={Link} href={"/applications/new"}>
            Crear Aplicación
          </Button>
        )}
      </div>
    );

  return (
    <div className="space-y-6 bg-gray-50 rounded-xl py-6 px-3">
      <BallotHeader>Ronda de Votación: {config.roundId}</BallotHeader>
      <BallotSection title="La votación termina en">
        <VotingEndsIn />
      </BallotSection>
      {address && isRegistered && (
        <>
          <BallotHeader>Tu Votación</BallotHeader>
          <BallotSection title="proyectos agregados:">
            <div>
              <span className="text-gray-900 dark:text-gray-300">
                {allocations.length}
              </span>
              /{projectCount?.count}
            </div>
          </BallotSection>
          <BallotSection
            title={
              <div className="flex justify-between">
                {config.tokenName} asignados:
                <div
                  className={clsx("text-gray-900 dark:text-gray-300", {
                    ["text-primary-500"]: sum > initialVoiceCredits || sum < initialVoiceCredits,
                  })}
                >
                  {formatNumber(sum)} {config.tokenName}
                </div>
              </div>
            }
          >
            <Progress value={sum} max={initialVoiceCredits} />
            <div className="flex justify-between text-xs">
              <div>Total</div>
              <div>
                {formatNumber(initialVoiceCredits)} {config.tokenName}
              </div>
            </div>
          </BallotSection>
        </>
      )}
      {!isRegistered || !isEligibleToVote ? null : ballot?.published ? (
        <Button
          className="w-full"
          variant="primary"
          as={Link}
          href={`/ballot/confirmation`}
        >
          Ver votación enviada
        </Button>
      ) : canSubmit ? (
        <SubmitBallotButton disabled={sum > initialVoiceCredits} />
      ) : viewBallot ? (
        <Button className="w-full" variant="primary" as={Link} href={`/ballot`}>
          Ver mi votación
        </Button>
      ) : (
        <Button className={"w-full"} variant="primary" disabled>
          No hay proyectos agregados
        </Button>
      )}
    </div>
  );
}

const SubmitBallotButton = ({ disabled = false }) => {
  const [isOpen, setOpen] = useState(false);
  const { isLoading, error, onVote } = useMaci();
  const { ballot, publishBallot } = useBallot();

  const projectIndices = useProjectIdMapping(ballot);

  const router = useRouter();

  const submit = {
    isLoading,
    error,
    mutate: async () => {
      const votes =
        ballot?.votes.map(({ amount, projectId }) => ({
          voteOptionIndex: BigInt(projectIndices[projectId]!),
          newVoteWeight: BigInt(amount),
        })) ?? [];

      await onVote(
        votes,
        async () => {},
        async () => {
          await router.push("/ballot/confirmation");
          publishBallot();
        },
      );
    },
  };

  const messages = {
    signing: {
      title: "Firmar votación",
      instructions:
        "Confirma la transacción en tu wallet para enviar tu votación",
    },
    submitting: {
      title: "Enviar votación",
      instructions:
        "Una vez que envies tu votación, no podrá cambiarla. Si estás listo, ¡adelante!",
    },
    error: {
      title: "Error al enviar votación",
      instructions: (
        <Alert
          variant="warning"
          title={(submit.error as { message?: string })?.message}
        >
          Hubo un error al enviar tu votación
        </Alert>
      ),
    },
  };

  const { title, instructions } =
    messages[
      submit.isLoading ? "signing" : submit.error ? "error" : "submitting"
    ];

  return (
    <>
      <Button
        className="w-full"
        variant="primary"
        disabled={disabled}
        onClick={async () => setOpen(true)}
      >
        Enviar votación
      </Button>
      <Dialog size="sm" isOpen={isOpen} onOpenChange={setOpen} title={title}>
        <p className="pb-8">{instructions}</p>
        <div
          className={clsx("flex gap-2", {
            ["hidden"]: submit.isLoading,
          })}
        >
          <Button
            variant="ghost"
            className="flex-1"
            onClick={() => setOpen(false)}
          >
            Regresar
          </Button>
          <Button
            className="flex-1"
            variant="primary"
            onClick={() => submit.mutate()}
          >
            Enviar votación
          </Button>
        </div>
      </Dialog>
    </>
  );
};

function BallotHeader(props: PropsWithChildren) {
  return (
    <h3
      className="text-sm font-semibold uppercase tracking-widest text-gray-700 dark:text-gray-300"
      {...props}
    />
  );
}

function BallotSection({
  title,
  children,
}: { title: string | ReactNode } & PropsWithChildren) {
  return (
    <div className="space-y-1 text-gray-500">
      <h4 className="text-sm font-semibold ">{title}</h4>
      <div className="space-y-1 text-lg font-semibold">{children}</div>
    </div>
  );
}

export default dynamic(() => Promise.resolve(BallotOverview), { ssr: false });

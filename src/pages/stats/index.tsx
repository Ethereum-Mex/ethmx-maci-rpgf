import { differenceInDays } from "date-fns";
import dynamic from "next/dynamic";
import { useMemo, type PropsWithChildren } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "~/components/ConnectButton";
import { Alert } from "~/components/ui/Alert";
import { Heading } from "~/components/ui/Heading";
import { config } from "~/config";
import { useMaci } from "~/contexts/Maci";
import {
  useProjectCount,
  useProjectsResults,
  useResults,
} from "~/hooks/useResults";
import { Layout } from "~/layouts/DefaultLayout";
import { formatNumber } from "~/utils/formatNumber";
import { getAppState } from "~/utils/state";
import { EAppState } from "~/utils/types";

const ResultsChart = dynamic(
  async () => await import("~/features/results/components/Chart"),
  { ssr: false },
);

export default function StatsPage() {
  const appState = getAppState();
  const duration = differenceInDays(config.resultsAt, new Date());

  return (
    <Layout>
      <Heading as="h1" size="3xl">
        Estadísticas
      </Heading>

      {appState === EAppState.RESULTS ? (
        <Stats />
      ) : (
        <Alert variant="info" className="mx-auto max-w-sm text-center">
          Los resultados serán revelados en {" "}
          <div className="text-3xl">{duration > 0 ? duration : 0}</div>
          días
        </Alert>
      )}
    </Layout>
  );
}

function Stats() {
  const { isLoading, pollData } = useMaci();
  const results = useResults(pollData);
  const count = useProjectCount();
  const { data: projectsResults } = useProjectsResults(pollData);
  const { isConnected } = useAccount();

  const { averageVotes, projects = {} } = results.data ?? {};

  const chartData = useMemo(() => {
    const data = (projectsResults?.pages?.[0] ?? [])
      .map((project) => ({
        x: project.name,
        y: projects[project.id]?.votes,
      }))
      .slice(0, 15);

    return [{ id: "awarded", data }];
  }, [projects, projectsResults]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  if (!pollData && !isConnected) {
    return (
      <Alert variant="info" className="mx-auto max-w-sm text-center">
        <h3 className="text-lg font-bold">
          Conecta tu wallet para ver los resultados
        </h3>

        <div className="mt-4">
          <ConnectButton />
        </div>
      </Alert>
    );
  }

  if (!pollData) {
    return <div>Algo salió mal. Intenta de nuevo.</div>;
  }

  return (
    <div>
      <h3 className="text-lg font-bold">Proyectos Principales</h3>
      <div className="mb-8 h-[400px] rounded-xl bg-white text-black">
        <ResultsChart data={chartData} />
      </div>

      <div className="grid gap-2 md:grid-cols-3">
        <Stat title="Proyectos Participantes">{count.data?.count}</Stat>
        <Stat title="Proyectos Votados ">{Object.keys(projects).length}</Stat>
        <Stat title="Votantes">
          {pollData?.numSignups ? Number(pollData?.numSignups) - 1 : 0}
        </Stat>
        <Stat title="Votos Promedio Por Proyecto">
          {formatNumber(averageVotes)}
        </Stat>
      </div>
    </div>
  );
}
function Stat({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="rounded border p-2 dark:border-gray-700">
      <h3 className="font-bold text-gray-500">{title}</h3>
      <div className="text-4xl">{children}</div>
    </div>
  );
}

import { differenceInDays } from "date-fns";
import dynamic from "next/dynamic";
import { useMemo, useEffect, useState, type PropsWithChildren } from "react";
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
  return (
    <Layout>
      <Heading as="h1" size="3xl">
        Resultados preliminares de la ronda #1 Ethereum México PGF
      </Heading>

      <Stats />
    </Layout>
  );
}

function Stats() {
  const { isLoading, pollData } = useMaci();
  const results = useResults(pollData);
  const count = useProjectCount();
  const { data: projectsResults } = useProjectsResults(pollData);
  const { isConnected } = useAccount();
  const appState = getAppState();
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const duration = differenceInDays(config.resultsAt, new Date());

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

  useEffect(() => {
    const loadScript = () => {
      if (!isScriptLoaded) {
        const script = document.createElement("script");
        script.src = "https://public.flourish.studio/resources/embed.js";
        script.async = true;
        document.body.appendChild(script);
        script.onload = () => setIsScriptLoaded(true);

        // Limpiar el script cuando el componente se desmonte
        return () => {
          document.body.removeChild(script);
          setIsScriptLoaded(false);
        };
      }
    };

    loadScript(); // Cargar el script inicialmente

    // Vuelve a cargar el script cuando el componente se vuelve a mostrar
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        loadScript();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isScriptLoaded]);

  if (isLoading) {
    return <div>Cargando...</div>;
  }

  return /*appState === EAppState.RESULTS ?]*/ (
    <>
      <div>
        <br />
        <h3 className="text-lg">
          En los próximos días compartiremos un análisis más detallado de los
          resultados.
        </h3>
        <a
          style={{ textDecoration: "underline" }}
          href="https://docs.google.com/spreadsheets/d/18KNgbFJRwynSWX5wXRTxSxzLLoj5Rybcq1Yg3q0DOAo/edit?gid=663021552#gid=663021552"
          target="_blank"
          rel="noopener noreferrer"
        >
          Consulta la información adicional aquí.
        </a>
        <br /> <br />
        <p className="text-lg">¡Muchas gracias por participar!</p>
        <br />

        <div
          className="flourish-embed flourish-hierarchy"
          data-src="visualisation/19217853"
        >
          <noscript>
            <img
              src="https://public.flourish.studio/visualisation/19217853/thumbnail"
              width="100%"
              alt="hierarchy visualization"
            />
          </noscript>
        </div>
      </div>
    </>
  )/* : (
    <Alert variant="info" className="mx-auto max-w-sm text-center">
      Los resultados serán revelados en{" "}
      <div className="text-3xl">{duration > 0 ? duration : 0}</div> días
    </Alert>
  );*/
}

function Stat({ title, children }: PropsWithChildren<{ title: string }>) {
  return (
    <div className="rounded border p-2 dark:border-gray-700">
      <h3 className="font-bold text-gray-500">{title}</h3>
      <div className="text-4xl">{children}</div>
    </div>
  );
}

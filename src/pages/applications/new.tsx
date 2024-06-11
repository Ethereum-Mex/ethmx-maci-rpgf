import { Layout } from "~/layouts/DefaultLayout";

import { ApplicationForm } from "~/features/applications/components/ApplicationForm";
import { Markdown } from "~/components/ui/Markdown";
import { useAccount } from "wagmi";
import { getAppState } from "~/utils/state";
import { EAppState } from "~/utils/types";
import { Alert } from "~/components/ui/Alert";

export default function NewProjectPage() {
  const { address } = useAccount();
  const state = getAppState();

  return (
    <Layout>
      <Markdown className={"mb-8"}>
        {`
### Nueva Aplicación
Rellena este formulario para crear una solicitud para tu proyecto. Posteriormente será revisada por nuestros administradores.

Tu progreso se guarda localmente para que puedas volver a esta página y reanudar tu solicitud.
`}
      </Markdown>
      {state !== EAppState.APPLICATION ? (
        <Alert variant="info" title="Ha terminado el periodo de registrar aplicaciones"></Alert>
      ) : (
        <ApplicationForm address={address} />
      )}
    </Layout>
  );
}

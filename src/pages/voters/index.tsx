import { Alert } from "~/components/ui/Alert";
import { Heading } from "~/components/ui/Heading";
import { config } from "~/config";
import ApproveVoters from "~/features/voters/components/ApproveVoters";
import { VotersList } from "~/features/voters/components/VotersList";
import { AdminLayout } from "~/layouts/AdminLayout";

export default function VotersPage() {
  return (
    <AdminLayout title="Manage voters">
      <div className="flex items-center justify-between">
        <Heading as="h1" size="3xl">
          Votantes Aprobados
        </Heading>
        <ApproveVoters />
      </div>
      {config.skipApprovedVoterCheck ? (
        <Alert variant="warning" className="mb-4 ">
          La configuración ha deshabilitado la verificación de aprobación de los votantes. Cualquiera es un votante elegible.
        </Alert>
      ) : null}
      <VotersList />
    </AdminLayout>
  );
}

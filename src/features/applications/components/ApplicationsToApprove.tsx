import { z } from "zod";
import { useMemo } from "react";
import Link from "next/link";
import { useFormContext } from "react-hook-form";

import { Button } from "~/components/ui/Button";
import { Checkbox, Form } from "~/components/ui/Form";
import { Markdown } from "~/components/ui/Markdown";
import { useMetadata } from "~/hooks/useMetadata";
import { useApplications } from "~/features/applications/hooks/useApplications";
import { ProjectAvatar } from "~/features/projects/components/ProjectAvatar";
import { type Application } from "~/features/applications/types";
import { type Attestation } from "~/utils/fetchAttestations";
import { Badge } from "~/components/ui/Badge";
import { useApproveApplication } from "../hooks/useApproveApplication";
import { useIsAdmin } from "~/hooks/useIsAdmin";
import { Skeleton } from "~/components/ui/Skeleton";
import { Spinner } from "~/components/ui/Spinner";
import { EmptyState } from "~/components/EmptyState";
import { formatDate } from "~/utils/time";
import { ClockIcon } from "lucide-react";
import { useIsCorrectNetwork } from "~/hooks/useIsCorrectNetwork";
import { useApprovedApplications } from "../hooks/useApprovedApplications";
import { Alert } from "~/components/ui/Alert";

export function ApplicationItem({
  id,
  recipient,
  name,
  metadataPtr1,
  time,
  isApproved,
  isLoading,
}: Attestation & { isApproved?: boolean; isLoading?: boolean }) {
  const metadata = useMetadata<Application>(metadataPtr1);

  const form = useFormContext();

  const { bio, fundingSources = [], impactMetrics = [] } = metadata.data ?? {};

  return (
    <div className="flex items-center gap-2 rounded border-b dark:border-gray-800 hover:dark:bg-gray-800">
      <label className="flex flex-1 cursor-pointer items-center gap-4 p-2">
        <Checkbox
          disabled={isApproved}
          value={id}
          {...form.register(`selected`)}
          type="checkbox"
        />

        <ProjectAvatar isLoading={isLoading} size="sm" profileId={recipient} />
        <div className=" flex-1">
          <div className="flex items-center justify-between">
            <Skeleton isLoading={isLoading} className="mb-1 min-h-5 min-w-24">
              {name}
            </Skeleton>
          </div>
          <div>
            <div className="flex gap-4 text-xs dark:text-gray-400">
              <div>{fundingSources.length} Fuentes de Financimiento</div>
              <div>{impactMetrics.length} Métricas de Impacto</div>
            </div>
            <div className="line-clamp-2 text-sm dark:text-gray-300">{bio}</div>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-700 dark:text-gray-400">
          <ClockIcon className="size-3" />
          <Skeleton isLoading={isLoading} className="mb-1 min-h-5 min-w-24">
            {formatDate(time * 1000)}
          </Skeleton>
        </div>
        {isApproved ? (
          <Badge variant="success">Aprobada</Badge>
        ) : (
          <Badge>Pendiente</Badge>
        )}
        <Button
          disabled={isLoading}
          as={Link}
          target="_blank"
          href={`/applications/${id}`}
          className="transition-transform group-data-[state=closed]:rotate-180"
          type="button"
          variant=""
        >
          Revisar
        </Button>
      </label>
    </div>
  );
}

const ApplicationsToApproveSchema = z.object({
  selected: z.array(z.string()),
});

type ApplicationsToApprove = z.infer<typeof ApplicationsToApproveSchema>;

export function ApplicationsToApprove() {
  const applications = useApplications();
  const approved = useApprovedApplications();
  const approve = useApproveApplication({});

  const approvedById = useMemo(
    () =>
      approved.data?.reduce(
        (map, x) => (map.set(x.refUID, true), map),
        new Map<string, boolean>(),
      ),
    [approved.data],
  );

  const applicationsToApprove = applications.data?.filter(
    (application) => !approvedById?.get(application.id),
  );

  return (
    <Form
      defaultValues={{ selected: [] }}
      schema={ApplicationsToApproveSchema}
      onSubmit={(values) => approve.mutate(values.selected)}
    >
      <Markdown>{`### Revisión de Aplicaciones
Seleccione las solicitudes que desea aprobar. Debes ser administrador para aprobarlas.

`}</Markdown>
      <Alert>
        Las solicitudes recién enviadas pueden tardar alrededor de 10 minutos en mostrarse.
      </Alert>
      <div className="my-2 flex items-center justify-between">
        <div>
          {applications.data?.length
            ? `${applications.data?.length} aplicaciones encontradas`
            : ""}
        </div>
        <div className="flex gap-2">
          <SelectAllButton applications={applicationsToApprove} />
          <ApproveButton isLoading={approve.isPending} />
        </div>
      </div>

      {applications.isLoading ? (
        <div className="flex items-center justify-center py-16">
          <Spinner />
        </div>
      ) : !applications.data?.length ? (
        <EmptyState title="No hay Aplicaciones">
          <Button variant="primary" as={Link} href={`/applications/new`}>
            Ir a crear aplicación
          </Button>
        </EmptyState>
      ) : null}
      {applications.data?.map((item) => (
        <ApplicationItem
          key={item.id}
          {...item}
          isLoading={applications.isLoading}
          isApproved={approvedById?.get(item.id)}
        />
      ))}
    </Form>
  );
}

function SelectAllButton({
  applications = [],
}: {
  applications: Attestation[] | undefined;
}) {
  const form = useFormContext<ApplicationsToApprove>();
  const selected = form.watch("selected");
  const isAllSelected =
    selected?.length > 0 && selected?.length === applications?.length;
  return (
    <Button
      disabled={!applications.length}
      type="button"
      onClick={() => {
        const selectAll = isAllSelected ? [] : applications.map(({ id }) => id);
        form.setValue("selected", selectAll);
      }}
    >
      {isAllSelected ? "Deseleccionar Todo" : "Seleccionar Todo"}
    </Button>
  );
}

function ApproveButton({ isLoading = false }) {
  const isAdmin = useIsAdmin();
  const { isCorrectNetwork, correctNetwork } = useIsCorrectNetwork();
  const form = useFormContext<ApplicationsToApprove>();
  const selectedCount = Object.values(form.watch("selected") ?? {}).filter(
    Boolean,
  ).length;
  return (
    <Button
      suppressHydrationWarning
      disabled={!selectedCount || !isAdmin || isLoading || !isCorrectNetwork}
      variant="primary"
      type="submit"
    >
      {!isCorrectNetwork
        ? `Conectar a ${correctNetwork.name}`
        : isAdmin
          ? `Aprobar ${selectedCount} aplicaciones`
          : "Debes ser admin"}
    </Button>
  );
}

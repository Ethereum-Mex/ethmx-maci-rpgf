import { ProjectBanner } from "~/features/projects/components/ProjectBanner";
import { ProjectAvatar } from "~/features/projects/components/ProjectAvatar";
import { Heading } from "~/components/ui/Heading";
import ProjectContributions from "./ProjectContributions";
import ProjectImpact from "./ProjectImpact";
import { NameENS } from "~/components/ENS";
import { suffixNumber } from "~/utils/suffixNumber";
import { useProjectMetadata } from "../hooks/useProjects";
import { type ReactNode } from "react";
import { type Attestation } from "~/utils/fetchAttestations";
import { ImpactCategories } from "./ImpactCategories";
export default function ProjectDetails({
  attestation,
  action,
}: {
  action: ReactNode;
  attestation?: Attestation;
}) {
  const metadata = useProjectMetadata(attestation?.metadataPtr);

  const { bio, twitterUrl, telegramUrl, email, payoutAddress, fundingSources } =
    metadata.data ?? {};

  return (
    <div className="relative">
      <div className="sticky left-0 right-0 top-0 z-10 bg-white p-4 dark:bg-gray-900">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">{attestation?.name}</h1>
          {action}
        </div>
      </div>
      <div className="overflow-hidden rounded-3xl">
        <ProjectBanner size="lg" profileId={attestation?.recipient} />
      </div>
      <div className="mb-8 flex items-end gap-4">
        <ProjectAvatar
          rounded="full"
          size={"lg"}
          className="-mt-20 ml-8"
          profileId={attestation?.recipient}
        />
        <div>
          <div className="">
            <NameENS address={payoutAddress} />
            <a href={twitterUrl} target="_blank" className="hover:underline">
              {twitterUrl}
            </a>
            <br></br>
            <a href={telegramUrl} target="_blank" className="hover:underline">
              {telegramUrl}
            </a>
            <br></br>
          </div>
        </div>
      </div>
      <p className="text-2xl">{bio}</p>
      <div>
        <Heading as="h2" size="3xl">
          Descripción del Impacto
        </Heading>

        <Heading as="h3" size="2xl">
          Categoría
        </Heading>

         <ImpactCategories tag={metadata.data?.impactCategory} />

        <ProjectContributions
          isLoading={metadata.isLoading}
          project={metadata.data}
        />

        <ProjectImpact isLoading={metadata.isLoading} project={metadata.data} />

        <Heading as="h3" size="2xl">
          Grants y Financiamientos Pasados
        </Heading>
        <div className="space-y-4">
          {fundingSources?.map((source, i) => {
            const type =
              {
                OTHER: "Otro",
                GOVERNANCE_FUND: "Fondo de Gobernanza",
                REVENUE: "Ingresos",
              }[source.type] ?? source.type;
            return (
              <div key={i} className="flex items-center gap-5">
                <div className="flex-1 whitespace-normal break-all text-xl">
                  {source.description} 

                </div>
                <div className="text-sm tracking-widest text-gray-700 dark:text-gray-400">
                  {type}
                </div>
                <div className="w-32 text-xl font-medium">
                  {suffixNumber(source.amount)} {source.currency}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

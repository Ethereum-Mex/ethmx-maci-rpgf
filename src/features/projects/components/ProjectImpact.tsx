import { Markdown } from "~/components/ui/Markdown";
import { Heading } from "~/components/ui/Heading";
import { LinkBox } from "./LinkBox";
import { suffixNumber } from "~/utils/suffixNumber";
import { type Application } from "~/features/applications/types";
import { string } from "zod";

type Props = { isLoading: boolean; project?: Application };

export default function ProjectImpact({ isLoading, project }: Props) {
  return (
    <>
      <Heading as="h3" size="2xl">
        Impacto
      </Heading>
      <div className="flex gap-4">
        <div className="md:w-2/3">
          <Markdown isLoading={isLoading}>
            {project?.impactDescription}
          </Markdown>
          {/*
          <Heading as="h3" size="2xl">
          Consideración del impacto del proyecto en USD
          </Heading>
          <Markdown isLoading={isLoading}>
            {`${String(project?.impactAmount)} USD`}
          </Markdown>
          <Heading as="h3" size="2xl">
          Clasificación del Impacto
          </Heading>
           <Markdown isLoading={isLoading}>
            {project?.impactClassification === 'INDIRECT_IMPACT'
              ? 'Impacto Indirecto'
              : 'Impacto Directo'
            }
            </Markdown>
          */}
        </div>
        <div className="md:w-1/3">
          <LinkBox
            label="Metricas de Impacto"
            links={project?.impactMetrics}
            renderItem={(link) => (
              <>
                
                <div className="flex-1 truncate" title={link.description}>
                  {link.description}
                </div>
                <div className="font-medium">{suffixNumber(link.number)}</div>
                
              </>
            )}
          />
        </div>
      </div>
    </>
  );
}

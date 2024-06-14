import { tv } from "tailwind-variants";
import Link from "next/link";
import React from "react";
import { Lock } from "lucide-react";

import { AllocationList } from "./AllocationList";
import { Button } from "~/components/ui/Button";
import { createComponent } from "~/components/ui";
import { type Vote } from "../types";
import { config } from "~/config";

const feedbackUrl = process.env.NEXT_PUBLIC_FEEDBACK_URL;

const Card = createComponent(
  "div",
  tv({ base: "rounded-3xl border p-8 dark:border-gray-700" }),
);

export const BallotConfirmation = ({ votes }: { votes: Vote[] }) => {
  return (
    <section>
      <div className="grid gap-6">
        <Card>
          <div className="flex flex-col items-center gap-10 sm:flex-row sm:gap-16">
            <div>
              <h3 className="mb-3 text-2xl font-bold text-gray-900 dark:text-gray-100 md:text-4xl">
                Tu voto ha sido recibido 🥳
              </h3>
              <p className="mb-10 text-gray-700 dark:text-gray-300">
              Gracias por participar ¡Ayúdanos a mejorar el proceso brindándonos comentarios sobre tu experiencia en esta ronda!
              </p>
              <Button
                variant="primary"
                as={Link}
                target="_blank"
                href={feedbackUrl}
              >
                Comparte tu Feedback
              </Button>
            </div>
            <div className="h-[400px] max-h-[30vw] w-[400px] max-w-[30vw] flex-shrink-0 rounded-[40px]" />
          </div>
        </Card>

        <Card>
          <div className="mb-6">
            <h5 className="mb-3 text-2xl font-bold">
              ¡Ya has votado!
            </h5>
            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300">
              <Lock className="h-4 w-4 " />
              <p>Tu voto siempre sera privado</p>
            </div>
          </div>
          <div className="flex items-center justify-between border-b py-3 text-gray-600 dark:border-gray-700 dark:text-gray-300">
            <p>Nombre del Proyecto</p>
            <p>{config.tokenName} </p>
          </div>

          <section className="max-h-[480px] overflow-y-scroll">
            {votes && <AllocationList votes={votes} />}
          </section>
        </Card>
        <Card>
          <div>
            <h5 className="mb-3 text-2xl font-bold">
              Ayúdanos a mejorar la próxima ronda
            </h5>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
            Tus comentarios anónimos nos ayudaran a mejorar el proceso.
            </p>
            <Button
              variant="primary"
              as={Link}
              target="_blank"
              href={feedbackUrl}
            >
              Comparte tu feedback
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
};

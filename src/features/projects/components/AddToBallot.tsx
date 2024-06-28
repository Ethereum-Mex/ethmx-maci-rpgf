import { useState } from "react";
import { z } from "zod";
import clsx from "clsx";
import { useAccount } from "wagmi";
import { useFormContext } from "react-hook-form";
import { Check } from "lucide-react";

import { Alert } from "~/components/ui/Alert";
import { Button, IconButton } from "~/components/ui/Button";
import { formatNumber } from "~/utils/formatNumber";
import { Dialog } from "~/components/ui/Dialog";
import { Form } from "~/components/ui/Form";
import { AllocationInput } from "~/features/ballot/components/AllocationInput";
import { config } from "~/config";
import { getAppState } from "~/utils/state";
import { EAppState } from "~/utils/types";
import { useMaci } from "~/contexts/Maci";
import { useBallot } from "~/contexts/Ballot";

type Props = { id?: string; name?: string };

export const ProjectAddToBallot = ({ id, name }: Props) => {
  const { address } = useAccount();
  const [isOpen, setOpen] = useState(false);

  const { isRegistered, isEligibleToVote, initialVoiceCredits, pollId } =
    useMaci();
  const { ballot, ballotContains, sumBallot, addToBallot, removeFromBallot } =
    useBallot();

  const inBallot = ballotContains(id!);
  const allocations = ballot?.votes ?? [];
  const sum = sumBallot(allocations.filter((p) => p.projectId !== id));
  const numVotes = ballot?.votes.length ?? 0;

  if (getAppState() !== EAppState.VOTING) return null;

  return (
    <div>
      {numVotes > config.voteLimit && (
        <Alert variant="warning">
          Has excedido tu límite de votos. Sólo puedes votar por{" "}
          {config.voteLimit} opciones.
        </Alert>
      )}

      {!isEligibleToVote || !isRegistered ? null : ballot?.published ? (
        <Button disabled>Votación Publicada</Button>
      ) : inBallot ? (
        <IconButton
          onClick={() => setOpen(true)}
          variant="primary"
          icon={Check}
        >
          {formatNumber(inBallot.amount)} asignados
        </IconButton>
      ) : (
        <Button
          disabled={!address || numVotes > config.voteLimit}
          onClick={() => setOpen(true)}
          variant="primary"
          className="w-full md:w-auto"
        >
          Agregar a mi votación
        </Button>
      )}
      <Dialog
        size="sm"
        isOpen={isOpen}
        onOpenChange={setOpen}
        title={`Vote for ${name}`}
      >
        <p className="pb-4 leading-relaxed">
          ¿Cuántos {config.tokenName} debería recibir este proyecto?
        </p>
        <Form
          defaultValues={{ amount: inBallot?.amount }}
          schema={z.object({
            amount: z
              .number()
              .min(0)
              .max(Math.sqrt(Math.min(initialVoiceCredits, initialVoiceCredits - sum)))
              .default(0),
          })}
          onSubmit={({ amount }) => {
            addToBallot([{ projectId: id!, amount }], pollId);
            setOpen(false);
          }}
        >
          <ProjectAllocation
            current={sum}
            inBallot={Boolean(inBallot)}
            onRemove={() => {
              removeFromBallot(id!);
              setOpen(false);
            }}
          />
        </Form>
      </Dialog>
    </div>
  );
};

const ProjectAllocation = ({
  current = 0,
  inBallot,
  onRemove,
}: {
  current: number;
  inBallot: boolean;
  onRemove: () => void;
}) => {
  const form = useFormContext();
  const formAmount = form.watch("amount") as string;
  const amount = formAmount
    ? parseFloat(String(formAmount).replace(/,/g, ""))
    : 0;
  const total = (amount ** 2) + current;
  const { initialVoiceCredits } = useMaci();

  const exceededProjectTokens = amount ** 2 > initialVoiceCredits;
  const exceededMaxTokens = total > initialVoiceCredits;

  const isError = exceededProjectTokens || exceededMaxTokens;
  return (
    <div>
      <AllocationInput
        tokenAddon
        error={isError}
        name="amount"
        votingMaxProject={initialVoiceCredits}
      />
      <div className="flex justify-between gap-2 pt-2 text-sm">
        <div className="flex gap-2">
          <span className="text-gray-600 dark:text-gray-400">
            Total asignados:
          </span>
          <span
            className={clsx("font-semibold", {
              ["text-primary-500"]: exceededMaxTokens,
            })}
          >
            {formatNumber(total)}
          </span>
        </div>
        <div className="flex gap-2">
          <span
            className={clsx("font-semibold", {
              ["text-primary-500"]: exceededProjectTokens,
            })}
          >
            {formatNumber(initialVoiceCredits - total)}
          </span>
          <span className="text-gray-600 dark:text-gray-400">/</span>
          <span className="text-gray-600 dark:text-gray-400">
            {formatNumber(initialVoiceCredits)}
          </span>
        </div>
      </div>
      <div className="space-y-2 pt-2">
        <Button
          variant="primary"
          type="submit"
          className="w-full"
          disabled={isError}
        >
          {inBallot ? "Update" : "Add"} votes
        </Button>
        {inBallot ? (
          <Button
            type="button"
            variant="ghost"
            className="w-full"
            onClick={onRemove}
          >
            Quitar de la Votación
          </Button>
        ) : null}
      </div>
    </div>
  );
};

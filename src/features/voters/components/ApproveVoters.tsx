import { z } from "zod";
import { Form, FormControl, Textarea } from "~/components/ui/Form";
import { useFormContext } from "react-hook-form";
import { IconButton } from "~/components/ui/Button";
import { useMemo, useState } from "react";
import { UserRoundPlus } from "lucide-react";
import { isAddress } from "viem";
import { Spinner } from "~/components/ui/Spinner";
import { toast } from "sonner";
import { Dialog } from "~/components/ui/Dialog";
import { useApproveVoters } from "../hooks/useApproveVoters";
import { useIsAdmin } from "~/hooks/useIsAdmin";
import { useIsCorrectNetwork } from "~/hooks/useIsCorrectNetwork";
import dynamic from "next/dynamic";
import { EthAddressSchema } from "~/features/distribute/types";

function parseAddresses(addresses: string): string[] {
  return addresses
    .split(",")
    .map((addr) => addr.trim())
    .filter((addr) => isAddress(addr))
    .filter((addr, i, self) => self.indexOf(addr) === i);
}

function ApproveVoters() {
  const isAdmin = useIsAdmin();
  const { isCorrectNetwork, correctNetwork } = useIsCorrectNetwork();

  const [isOpen, setOpen] = useState(false);
  const approve = useApproveVoters({
    onSuccess: () => {
      toast.success("¡Votantes aprobados con éxito!");
      setOpen(false);
    },
    onError: (err: { reason?: string; data?: { message: string } }) =>
      toast.error("Error al aprobar a los votantes", {
        description: err.reason ?? err.data?.message,
      }),
  });
  return (
    <div>
      <IconButton
        icon={UserRoundPlus}
        variant="primary"
        disabled={!isAdmin || !isCorrectNetwork}
        onClick={() => setOpen(true)}
      >
        {!isCorrectNetwork
          ? `Connect to ${correctNetwork.name}`
          : isAdmin
            ? `Agregar votantes`
            : "Debes ser Administrador"}
      </IconButton>
      <Dialog isOpen={isOpen} onOpenChange={setOpen} title={`Aprobar votantes`}>
        <p className="pb-4 leading-relaxed">
          Agrega los votantes a quienes se les permitirá votar en la ronda.
        </p>
        <p className="pb-4 leading-relaxed">
        Ingresa todas las direcciones como una lista separada por comas a continuación. Las direcciones duplicadas y no válidas se eliminarán automáticamente.
        </p>
        <Form
          schema={z.object({
            voters: EthAddressSchema,
          })}
          onSubmit={(values) => {
            const voters = parseAddresses(values.voters);
            console.log("Approve voters", { voters });
            approve.mutate(voters);
          }}
        >
          <div className="mb-2"></div>
          <FormControl name="voters">
            <Textarea
              placeholder="Lista de direcciones separadas por comas para aprobar"
              rows={8}
            />
          </FormControl>
          <div className="flex items-center justify-end">
            <ApproveButton isLoading={approve.isPending} isAdmin={isAdmin} />
          </div>
        </Form>
      </Dialog>
    </div>
  );
}

function ApproveButton({ isLoading = false, isAdmin = false }) {
  const form = useFormContext<{ voters: string }>();
  const voters = form.watch("voters");

  const selectedCount = useMemo(
    () => parseAddresses(voters ?? "").length,
    [voters],
  );

  return (
    <IconButton
      suppressHydrationWarning
      icon={isLoading ? Spinner : UserRoundPlus}
      disabled={!selectedCount || !isAdmin || isLoading}
      variant="primary"
      type="submit"
    >
      {isAdmin ? `Aprobar ${selectedCount} votantes` : "Debes ser administrador"}
    </IconButton>
  );
}

export default dynamic(() => Promise.resolve(ApproveVoters), { ssr: false });

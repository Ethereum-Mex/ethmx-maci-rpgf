import { config, eas } from "~/config";
import { useAttest } from "~/hooks/useEAS";
import { useEthersSigner } from "~/hooks/useEthersSigner";
import { useMutation } from "@tanstack/react-query";
import { createAttestation } from "~/lib/eas/createAttestation";
import type { JsonRpcSigner } from "ethers";

// TODO: Move this to a shared folders
export type TransactionError = { reason?: string; data?: { message: string } };

export function useApproveVoters(options: {
  onSuccess: () => void;
  onError: (err: TransactionError) => void;
}) {
  const attest = useAttest();
  const signer = useEthersSigner();

  return useMutation({
    mutationFn: async (voters: string[]) => {
      if (!signer) throw new Error("Connect wallet first");


      console.log("Values:", { type1: "voter", round1: config.roundId });
      console.log("SchemaUID:", eas.schemas.approval);
      voters.forEach((recipient) => console.log("Recipient:", recipient));

      const attestations = await Promise.all(
        voters.map((recipient) =>
          createAttestation(
            {
              values: { type1: "voter", round1: config.roundId },
              schemaUID: eas.schemas.approval,
              recipient,
            },
            signer as JsonRpcSigner,
          ),
        ),
      );
      console.log(attestations)
      console.log(signer)

      return attest.mutateAsync(
        attestations.map((att) => ({ ...att, data: [att.data] })),
      );
    },
    ...options,
  });
}

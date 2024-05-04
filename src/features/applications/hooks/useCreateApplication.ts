import { useMutation } from "@tanstack/react-query";
import { config, eas } from "~/config";
import { useUploadMetadata } from "~/hooks/useMetadata";
import { useAttest, useCreateAttestation } from "~/hooks/useEAS";
import type { Application, Profile } from "../types";
import { type TransactionError } from "~/features/voters/hooks/useApproveVoters";

export function useCreateApplication(options: {
  onSuccess: () => void;
  onError: (err: TransactionError) => void;
}) {
  const attestation = useCreateAttestation();
  const attest = useAttest();
  const upload = useUploadMetadata();

  const mutation = useMutation({
    mutationFn: async (values: {
      application: Application;
      profile: Profile;
    }) => {
      console.log("Uploading profile and application metadata");
      return Promise.all([
        upload.mutateAsync(values.application).then(({ url: metadataPtr1 }) => {
          console.log("Creating application attestation data");
          return attestation.mutateAsync({
            schemaUID: eas.schemas.metadata,
            values: {
              name1: values.application.name,
              metadataType1: 0, // "http"
              metadataPtr1,
              type1: "application",
              round1: config.roundId,
            },
          });
        }),
        upload.mutateAsync(values.profile).then(({ url: metadataPtr1 }) => {
          console.log("Creating profile attestation data");
          return attestation.mutateAsync({
            schemaUID: eas.schemas.metadata,
            values: {
              name1: values.profile.name,
              metadataType1: 0, // "http"
              metadataPtr1,
              type1: "profile",
              round1: config.roundId,
            },
          });
        }),
      ]).then((attestations) => {
        console.log("Creating onchain attestations", attestations, values);
        return attest.mutateAsync(
          attestations.map((att) => ({ ...att, data: [att.data] })),
        );
      });
    },

    ...options,
  });

  return {
    ...mutation,
    error: attest.error ?? upload.error ?? mutation.error,
    isAttesting: attest.isPending,
    isUploading: upload.isPending,
  };
}

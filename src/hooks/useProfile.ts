import { type Address } from "viem";
import { api } from "~/utils/api";
import { useMetadata } from "./useMetadata";

export function useProfile(id?: Address, nameProject?: String) {
  const result = api.profile.get.useQuery({ id: String(id) }, { enabled: Boolean(id) });
  console.log("Resultado de useProfile:", result);
  return result
}

export function useProfileWithMetadata(id?: Address, nameProject?: String) {
  const profile = useProfile(id, nameProject);


  return useMetadata<{ profileImageUrl: string; bannerImageUrl: string }>(
    profile.data?.metadataPtr1,
  );
}

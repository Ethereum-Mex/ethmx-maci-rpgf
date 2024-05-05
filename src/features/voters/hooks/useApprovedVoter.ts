import { type Address } from "viem";

import { api } from "~/utils/api";

export function useApprovedVoter(address: Address) {
  console.log(api.voters.approved.useQuery({ address }))
  return api.voters.approved.useQuery({ address });

}

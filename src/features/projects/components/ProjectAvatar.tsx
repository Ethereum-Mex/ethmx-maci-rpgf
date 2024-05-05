import { type ComponentProps } from "react";
import { type Address } from "viem";

import { Avatar } from "~/components/ui/Avatar";
import { useProfileWithMetadata } from "~/hooks/useProfile";

export function ProjectAvatar(
  props: { profileId?: Address, nameProject?: string } & ComponentProps<typeof Avatar>,
) {
  const profile = useProfileWithMetadata(props.profileId, props.nameProject);
  const { profileImageUrl } = profile.data ?? {};

  return <Avatar {...props} src={profileImageUrl} />;
}



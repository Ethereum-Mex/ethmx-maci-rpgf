import type { ReactNode, PropsWithChildren } from "react";
import { useAccount } from "wagmi";

import Header from "~/components/Header";
import BallotOverview from "~/features/ballot/components/BallotOverview";
import { BaseLayout, type LayoutProps } from "./BaseLayout";
import { getAppState } from "~/utils/state";
import { EAppState } from "~/utils/types";
import { config } from "~/config";

type Props = PropsWithChildren<
  {
    sidebar?: "left" | "right";
    sidebarComponent?: ReactNode;
  } & LayoutProps
>;
export const Layout = ({ children, ...props }: Props) => {
  const { address } = useAccount();
  const appState = getAppState();

  const navLinks = [
    {
      href: "/projects",
      children: "Proyectos",
    },
    {
      href: "/info",
      children: "Información",
    },
    {
      href: "/faq",
      children: "FAQ"
    }
  ];

  if (appState === EAppState.RESULTS) {
    navLinks.push({
      href: "/stats",
      children: "Estadísticas",
    });
  }

  if (config.admins.includes(address!)) {
    navLinks.push(
      ...[
        {
          href: "/applications",
          children: "Aplicaciones",
        },
        {
          href: "/voters",
          children: "Votantes",
        },
        {
          href: "/distribute",
          children: "Distribuir",
        },
      ],
    );
  }

  return (
    <BaseLayout {...props} header={<Header navLinks={navLinks} />}>
      {children}
    </BaseLayout>
  );
};

export function LayoutWithBallot(props: Props) {
  return (
    <Layout sidebar="left" sidebarComponent={<BallotOverview />} {...props} />
  );
}

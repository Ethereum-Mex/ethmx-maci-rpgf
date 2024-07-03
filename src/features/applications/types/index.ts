import { z } from "zod";
import { EthAddressSchema } from "~/features/voters/types";
import { reverseKeys } from "~/utils/reverseKeys";

export const MetadataSchema = z.object({
  name: z.string().min(3),
  metadataType: z.enum(["1"]),
  metadataPtr: z.string().min(3),
});

export const ProfileSchema = z.object({
  name: z.string().min(5),
  profileImageUrl: z.string(),
  bannerImageUrl: z.string(),
});

export type Profile = z.infer<typeof ProfileSchema>;

export const contributionTypes = {
  CONTRACT_ADDRESS: "Dirección de Contrato",
  NOTION: "Notion",
  GITHUB_REPO: "Github repo",
  OTHER: "Otro",
} as const;

export const fundingSourceTypes = {
  GOVERNANCE_FUND: "Fondo de Gobernanza",
  REVENUE: "Ingresos",
  OTHER: "Otro",
} as const;

export const impactTypes = {
  DIRECT_IMPACT: "Impacto Directo",
  INDIRECT_IMPACT: "Impacto Indirecto",
} as const;

export const ApplicationSchema = z.object({
  name: z.string().min(15),
  bio: z.string().min(140).max(500),
  twitterUrl: z.string().url().min(1),
  telegramUrl: z.string().url().min(1), //New
  email: z.string().email(), //New
  payoutAddress: EthAddressSchema,
  contributionDescription: z.string().min(140).max(500),
  impactDescription: z.string().min(140).max(500),
  impactCategory: z.string().min(1),
  //impactCategory: z.array(z.string()).min(1),
  impactAmount: z.number(),
  impactClassification: z.nativeEnum(reverseKeys(impactTypes)),
  contributionLinks: z
    .array(
      z.object({
        description: z.string().min(15).max(500),
        type: z.nativeEnum(reverseKeys(contributionTypes)),
        url: z
          .string()
          .min(1)
          .transform((url) => {
            // Automatically prepend "https://" if it's missing
            return /^(http:\/\/|https:\/\/)/i.test(url)
              ? url
              : `https://${url}`;
          }),
      }),
    )
    .min(1),
  impactMetrics: z
    .array(
      z.object({
        description: z.string().min(3).max(500),
        url: z
          .string()
          .min(1)
          .transform((url) => {
            // Automatically prepend "https://" if it's missing
            return /^(http:\/\/|https:\/\/)/i.test(url)
              ? url
              : `https://${url}`;
          }),
        number: z.number(),
      }),
    )
    .min(1),
  fundingSources: z
    .array(
      z.object({
        description: z.string().min(15).max(500),
        amount: z.number(),
        currency: z.string().min(3).max(4),
        type: z.nativeEnum(reverseKeys(fundingSourceTypes)),
      }),
    )
    .default([]),
});

export type Application = z.infer<typeof ApplicationSchema>;

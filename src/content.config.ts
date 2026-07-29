import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const localeCard = z.object({
  label: z.string().min(1),
  title: z.string().min(1),
  summary: z.string().min(1),
  audience: z.string().min(1),
  primaryCta: z.string().min(1),
  secondaryCta: z.string().min(1).optional()
});

const metric = z.object({
  value: z.string().min(1),
  label: z.string().min(1)
});

const localeDetail = z.object({
  eyebrow: z.string().min(1),
  title: z.string().min(1),
  lead: z.string().min(1),
  metrics: z.array(metric).min(1),
  rolesLabel: z.string().min(1),
  roles: z.array(z.string().min(1)).min(1),
  capabilitiesLabel: z.string().min(1),
  capabilities: z.array(z.string().min(1)).min(1),
  modulesSummary: z.string().min(1),
  modulesTitle: z.string().min(1),
  modules: z.array(z.string().min(1)).min(1),
  notice: z.string().min(1),
  primaryCta: z.string().min(1),
  secondaryCta: z.string().min(1),
  imageAlt: z.string().min(1)
});

const cardLocales = z.object({
  zhCN: localeCard,
  zhHant: localeCard,
  en: localeCard
});

const detailLocales = z.object({
  zhCN: localeDetail,
  zhHant: localeDetail,
  en: localeDetail
});

const products = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/products" }),
  schema: z.object({
    productId: z.string().regex(/^[a-z0-9-]+$/),
    category: z.enum(["personal", "professional"]),
    order: z.number().int().nonnegative(),
    published: z.boolean().default(true),
    href: z.string().url(),
    visual: z.enum(["whiteboard", "poetry", "lineage", "image", "generic"]).default("generic"),
    coverImage: z.string().startsWith("/").optional(),
    detailAnchor: z.string().regex(/^[a-z0-9-]+$/).optional(),
    locales: cardLocales,
    detail: z.object({
      enabled: z.literal(true),
      image: z.string().startsWith("/"),
      contactHref: z.string().startsWith("mailto:"),
      locales: detailLocales
    }).optional()
  }).superRefine((data, ctx) => {
    if (data.detail?.enabled && !data.detailAnchor) {
      ctx.addIssue({
        code: "custom",
        message: "detailAnchor is required when homepage detail is enabled",
        path: ["detailAnchor"]
      });
    }
    if (data.visual === "image" && !data.coverImage) {
      ctx.addIssue({
        code: "custom",
        message: "coverImage is required when visual is image",
        path: ["coverImage"]
      });
    }
  })
});

export const collections = { products };

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

const localeMedia = z.object({
  title: z.string().min(1),
  alt: z.string().min(1)
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
  media: z.array(localeMedia).min(1).max(3)
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
      media: z.array(z.object({
        image: z.string().startsWith("/")
      })).min(1).max(3),
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
    if (data.detail) {
      const mediaCount = data.detail.media.length;
      (["zhCN", "zhHant", "en"] as const).forEach((localeKey) => {
        if (data.detail?.locales[localeKey].media.length !== mediaCount) {
          ctx.addIssue({
            code: "custom",
            message: `${localeKey} detail media must match the detail media count`,
            path: ["detail", "locales", localeKey, "media"]
          });
        }
      });
    }
  })
});

export const collections = { products };

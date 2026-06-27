import { z } from 'zod';

/** Validação de entrada do caminho do dinheiro (lead + checkout). Idiomas zod 4. */

const attribution = z
  .looseObject({
    utm_source: z.string().max(200).optional(),
    utm_medium: z.string().max(200).optional(),
    utm_campaign: z.string().max(200).optional(),
    utm_content: z.string().max(200).optional(),
    utm_term: z.string().max(200).optional(),
    gclid: z.string().max(200).optional(),
    fbclid: z.string().max(200).optional(),
  })
  .optional();

export const leadSchema = z.looseObject({
  email: z.email().max(254),
  name: z.string().max(120).nullish(),
  phone: z.string().max(40).nullish(),
  profissao: z.string().max(120).nullish(),
  event_id: z.string().max(64).nullish(),
  isca: z.string().max(40).optional(),
  variant: z.string().max(4).optional(),
  quiz_result: z.string().max(40).nullish(),
  sample: z.string().max(40).optional(),
  source_surface: z.string().max(40).optional(),
  client_id: z.string().max(80).nullish(),
  fbp: z.string().max(160).nullish(),
  fbc: z.string().max(240).nullish(),
  attribution,
});

export const checkoutSchema = z.looseObject({
  checkout_intent: z.literal('site_checkout'),
  email: z.email().max(254).optional(),
  produto: z.enum(['arsenal', 'tripwire', 'curso']).optional(),
  client_id: z.string().max(80).optional(),
  fbp: z.string().max(160).optional(),
  fbc: z.string().max(240).optional(),
  attribution,
});

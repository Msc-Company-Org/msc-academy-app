// Edge Function `crm-data` (Supabase) — leitura segura do CRM.
// A service_role é AUTO-INJETADA pelo Supabase aqui dentro (nunca sai do servidor).
// O app Next chama com um segredo compartilhado (gate por hash SHA-256).
// Deploy: via MCP Supabase (deploy_edge_function) ou `supabase functions deploy crm-data`.
import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const SECRET_HASH = "56fb7cc73301e53d1fb828209f094c406344069238d959e8dbc5d7b6daa276ba"; // sha256(CRM_EDGE_SECRET)
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const SERVICE = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

async function sha256hex(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function q(path: string): Promise<unknown[]> {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    headers: { apikey: SERVICE, Authorization: `Bearer ${SERVICE}` },
  });
  if (!r.ok) return [];
  return await r.json();
}

Deno.serve(async (req) => {
  const presented = req.headers.get("x-crm-secret") || "";
  if (!presented || (await sha256hex(presented)) !== SECRET_HASH) {
    return new Response(JSON.stringify({ error: "forbidden" }), {
      status: 403, headers: { "Content-Type": "application/json" },
    });
  }
  const [leads, purchases] = await Promise.all([
    q("leads?select=*&order=created_at.desc&limit=1000"),
    q("purchases?select=*&status=eq.paid&order=created_at.desc"),
  ]);
  return new Response(JSON.stringify({ leads, purchases }), {
    headers: { "Content-Type": "application/json" },
  });
});

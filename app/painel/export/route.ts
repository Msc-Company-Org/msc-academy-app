import { isAuthed } from '@/lib/auth';
import { getLeads } from '@/lib/crm';

export const dynamic = 'force-dynamic';

const COLS = ['created_at', 'email', 'whatsapp', 'nome', 'profissao', 'isca', 'variante', 'quiz_result', 'source_surface', 'gclid', 'utm_source', 'utm_campaign', 'email_status'] as const;

export async function GET() {
  if (!(await isAuthed())) return new Response('unauthorized', { status: 401 });
  const leads = await getLeads({}, 5000);
  const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
  const csv = [COLS.join(','), ...leads.map((l) => COLS.map((c) => esc((l as Record<string, unknown>)[c])).join(','))].join('\n');
  return new Response('﻿' + csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': 'attachment; filename="leads-arsenal.csv"',
    },
  });
}

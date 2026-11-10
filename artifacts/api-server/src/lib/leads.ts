import { randomUUID } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

export type Lead = {
  id: string;
  createdAt: string;
  payload: { name: string; email: string; phone: string; message: string };
};

const file = resolve(process.env["LEADS_FILE"] || "data/leads.json");
let queue: Promise<unknown> = Promise.resolve();

export async function listLeads(): Promise<Lead[]> {
  try {
    return JSON.parse(await readFile(file, "utf8")) as Lead[];
  } catch {
    return [];
  }
}

export function saveLead(payload: Lead["payload"]): Promise<Lead> {
  const lead: Lead = { id: randomUUID(), createdAt: new Date().toISOString(), payload };
  const run = queue.then(async () => {
    const leads = await listLeads();
    leads.push(lead);
    await mkdir(dirname(file), { recursive: true });
    await writeFile(file, JSON.stringify(leads, null, 2));
    return lead;
  });
  queue = run.catch(() => undefined);
  return run;
}

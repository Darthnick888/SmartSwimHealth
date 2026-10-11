import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const schema = readFileSync(new URL("../supabase/schema.sql", import.meta.url), "utf8");

test("schema protects both user-owned tables with row-level security", () => {
  assert.match(schema, /alter table public\.pain_entries enable row level security/i);
  assert.match(schema, /alter table public\.recovery_entries enable row level security/i);
  assert.equal((schema.match(/auth\.uid\(\)/g) ?? []).length, 10);
});

test("schema keeps tracker rows linked to Supabase Auth users", () => {
  assert.match(schema, /pain_entries[\s\S]*references auth\.users\(id\)/i);
  assert.match(schema, /recovery_entries[\s\S]*references auth\.users\(id\)/i);
});

import { createClient } from "@supabase/supabase-js";
import { env } from "@/env/env";

export const client = createClient(
  env.database.url ?? "",
  env.database.anonKey ?? "",
);

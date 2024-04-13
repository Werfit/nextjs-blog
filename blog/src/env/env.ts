export const env = {
  database: {
    url: process.env.DATABASE_URL,
    // url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
  },
} as const;

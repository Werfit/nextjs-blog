export const env = {
  database: {
    url: process.env.DATABASE_URL,
    // url: process.env.SUPABASE_URL,
    anonKey: process.env.SUPABASE_ANON_KEY,
  },
  storage: {
    region: process.env.AWS_REGION ?? "",
    bucketName: process.env.BUCKET_NAME ?? "",
    accessKey: process.env.ACCESS_KEY ?? "",
    secretKey: process.env.SECRET_ACCESS_KEY ?? "",
  },
} as const;

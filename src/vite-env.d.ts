// vite-env.d.ts

/// <reference types="vite/client" />

interface ImportMetaEnv {
  // Add the specific environment variable here:
  readonly VITE_SEPOLIA_RPC_URL: string;
  
  // You can add others you might use, like VITE_API_KEY
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
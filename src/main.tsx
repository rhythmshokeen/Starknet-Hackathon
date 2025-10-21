// src/main.tsx 

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css'; // Your base styles

// Import correct libraries for EVM development
import { createConfig, http, WagmiConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { injected } from 'wagmi/connectors';

// --- Configuration ---

// 1. Define the chains you want to support
const chains = [sepolia, mainnet] as const;

// 2. Configure the Wagmi Client and Connectors
const config = createConfig({
  connectors: [
    injected(), // Auto-detects most injected wallets
  ],
  
  chains: chains,
  transports: {
    // FIX: Use the non-nullable assertion (!) to tell TypeScript the variable exists.
    // This removes the red line without changing the project's type definitions.
    [sepolia.id]: http(import.meta.env.VITE_SEPOLIA_RPC_URL! || 'https://rpc.sepolia.org'),
    [mainnet.id]: http(), 
    // If using Anvil (local testnet): [31337]: http("http://127.0.0.1:8545"), 
  },
});

const queryClient = new QueryClient();

// --- Render Application ---
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </WagmiConfig>
  </React.StrictMode>,
);
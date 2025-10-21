// src/components/ConnectWalletButton.tsx
import React from 'react';
import { useAccount, useConnect, useDisconnect } from '@starknet-react/core';

export function ConnectWalletButton() {
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { address, isConnected } = useAccount();

  if (isConnected) {
    return (
      <div className="flex items-center space-x-2">
        <span className="text-sm font-mono bg-green-700 p-1 rounded">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Connected'}
        </span>
        <button 
          onClick={() => disconnect()} 
          className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded transition"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <div className="flex space-x-2">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => connect({ connector })}
          disabled={!connector.available()}
          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded transition disabled:opacity-50"
        >
          Connect {connector.name}
        </button>
      ))}
    </div>
  );
}
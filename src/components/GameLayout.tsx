
import React from 'react';
import { useAccount } from 'wagmi';

import ConnectWalletButton from './ConnectWalletButton.tsx';
import ResourceDashboard from './ResourceDashboard.tsx';
import MapView from './MapView.tsx';


const GameLayout: React.FC = () => {
  // Hook to check the user's wallet connection status and address
  const { isConnected, address } = useAccount();

  if (!isConnected) {
    // --- LANDING SCREEN (Displayed if wallet is NOT connected) ---
    return (
      <div className="landing-page">
        <h1 className="game-title">⚔️ STARKNET CLANS 🏰</h1>
        <p className="game-pitch">
          Purchase land, train your army, and battle for gold and glory!
        </p>
        <div className="connection-area">
          <h3>Connect Wallet to Begin</h3>
          <ConnectWalletButton />
          <p className="note">
            Your land and resources are linked to your wallet address.
          </p>
        </div>
      </div>
    );
  }

  // --- MAIN GAME SCREEN (Displayed if wallet IS connected) ---
  // The 'address' is passed down to children components to fetch user-specific data
  return (
    <div className="game-layout">
      {/* Top Bar: Displays Gold, Troops, and other persistent info */}
      <header className="game-header">
        {/* Pass the connected address to fetch real-time resources */}
        <ResourceDashboard userAddress={address} />
        <div className="settings-button">⚙️</div>
      </header>
      
      {/* Main Game Content Area: The map and interaction zone */}
      <main className="game-main">
        {/* MapView contains the Phaser engine and handles tile selection */}
        <MapView userAddress={address} />
      </main>
      
      {/* Footer or Status Bar */}
      <footer className="game-footer">
        <p>Connected as: **{address.slice(0, 6)}...{address.slice(-4)}**</p>
      </footer>
    </div>
  );
};

export default GameLayout;
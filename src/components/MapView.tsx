// src/components/MapView.tsx

import React, { useState } from 'react';
// FIX: Explicitly add the .tsx extension to all sibling imports
import PhaserGame from './PhaserGame.tsx'; 
import TerritoryCard from './TerritoryCard.tsx';
import ActionPanel from './ActionPanel.tsx';
import { useContractRead } from 'wagmi'; // Required for actual initialization check

interface MapViewProps {
  userAddress: `0x${string}`;
}

const MapView: React.FC<MapViewProps> = ({ userAddress }) => {
  // Local state to manage which territory (token ID) is currently selected
  const [selectedTokenId, setSelectedTokenId] = useState<number | null>(null);
  
  // NOTE: In a real game, the Phaser component will emit an event 
  // (e.g., when a user clicks a tile) which should call this function.
  const handleTileSelect = (tokenId: number) => {
    setSelectedTokenId(tokenId);
  };

  // --- Purchase Land Placeholder/Check ---
  // A real check would look at Land.balanceOf(userAddress) or a custom "isInitialized" function
  // For now, we keep the placeholder logic:
  const isInitialized = true; // Use actual contract check here later

  if (!isInitialized) {
    return (
      <div className="map-placeholder">
        <h2>You Own No Land!</h2>
        <p>Purchase your first plot to begin building your clan.</p>
        <button className="buy-land-btn">Buy Land (0.1 ETH)</button>
      </div>
    );
  }

  // --- Main Game View ---
  return (
    <div className="map-view-container">
      {/* The Phaser Game Engine is rendered here */}
      <PhaserGame onTileSelect={handleTileSelect} /> 

      {/* Renders the Territory Card / Action Panel as a modal/overlay */}
      {selectedTokenId !== null && (
        <div className="map-overlay">
          <TerritoryCard 
            tokenId={selectedTokenId} 
            userAddress={userAddress}
            onClose={() => setSelectedTokenId(null)} // Allows the user to close the card
          />
          {/* ActionPanel can be nested inside TerritoryCard or placed here */}
          <ActionPanel 
            attackerTokenId={selectedTokenId} // Assuming the user attacks FROM the selected territory
            defenderTokenId={selectedTokenId} // Passes the selected ID as the target/defender
            userAddress={userAddress} 
          />
        </div>
      )}
    </div>
  );
};

export default MapView;
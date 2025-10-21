// src/App.tsx

import React, { useRef, useEffect } from 'react';
import { useAccount, useContractRead, useContractWrite, useContract } from '@starknet-react/core';

// --- IMPORTANT: Import your components ---
import { ConnectWalletButton } from './components/ConnectWalletButton'; 
import PhaserGame, { IPhaserGameRef } from './components/PhaserGame.tsx';
// --- Contract ABIs & Address (Replace with your actual data) ---
// You will need to create a LandAbi.json file in your src/abis folder
import LandAbi from './abis/LandAbi.json'; 
const LAND_CONTRACT_ADDRESS = '0x0...YOUR_LAND_CONTRACT_ADDRESS'; // Replace with your deployed address

// --- Utility Function (You need to implement this) ---
// Converts raw Starknet/Cairo data (e.g., felt252 arrays) into a simple JS array for Phaser
const formatCairoMapData = (rawMapData: any): Array<{ x: number, y: number, type: string }> => {
    if (!rawMapData || rawMapData.length === 0) return [];
    
    // Example transformation: assumes your Cairo function returns a simple array of map state
    // For a simple demo, we return dummy data:
    return [
        { x: 5, y: 5, type: 'grass_tile' },
        { x: 10, y: 10, type: 'building_hq' },
    ];
};


function App() {
  // --- 1. Phaser Reference ---
  // This ref holds a link to the running Phaser game, allowing React to call game functions.
  const phaserRef = useRef<IPhaserGameRef | null>(null);
  const { address, isConnected } = useAccount();

  // --- 2. Starknet Read (Data from Blockchain -> Phaser) ---
  // Fetch the player's land ownership state from the Land contract
  const { data: playerLand, isLoading: landLoading, error: landError } = useContractRead({
    abi: LandAbi, // Using the imported ABI object
    address: LAND_CONTRACT_ADDRESS,
    functionName: 'get_player_land_map', // Replace with your actual view function
    args: isConnected ? [address] : [], // Only query if connected
    watch: true, // Auto-refetch on new block
  });

  // PUSH UPDATED STATE TO PHASER
  useEffect(() => {
    if (isConnected && playerLand && phaserRef.current?.updateLandMap) {
        // Format the blockchain data before sending it to Phaser
        const formattedTiles = formatCairoMapData(playerLand); 
        phaserRef.current.updateLandMap(formattedTiles);
    }
    if (!isConnected) {
        // Clear map if user disconnects
        phaserRef.current?.updateLandMap([]); 
    }
  }, [playerLand, landLoading, isConnected]);


  // --- 3. Starknet Write (Phaser -> Transaction) ---
  // Get the contract instance for write calls (e.g., GameLogic.sol or Land.sol)
  const { contract: landContract } = useContract({
    abi: LandAbi,
    address: LAND_CONTRACT_ADDRESS,
  });
  
  // Hook for executing transactions
  const { writeAsync: executeAction } = useContractWrite({ calls: [] });

  // Game input handler called by Phaser
  const handlePhaserInteraction = React.useCallback(async ({ action, x, y }: { action: string, x: number, y: number }) => {
    if (!isConnected || !landContract) {
        console.warn("Wallet not connected or contract not initialized.");
        return;
    }

    if (action === 'ClaimLand') {
        try {
            // Prepare the call data for your 'claim_land' function
            const call = landContract.populate('claim_land', [x, y]); 
            const tx = await executeAction({ calls: [call] });
            console.log(`Transaction sent: ${tx.transaction_hash}`);
            
            // Optional: Show immediate animation feedback in Phaser
            phaserRef.current?.spawnTroopAnimation(x * 32, y * 32, 'builder'); 

        } catch (error) {
            console.error('Starknet Transaction Failed:', error);
        }
    }
  }, [isConnected, landContract, executeAction]);

  // LISTEN for events coming from the Phaser scene
  useEffect(() => {
    // We listen for a custom event 'interaction' emitted from GameScene.ts
    phaserRef.current?.scene?.events.on('interaction', handlePhaserInteraction);
    return () => {
      phaserRef.current?.scene?.events.off('interaction', handlePhaserInteraction);
    };
  }, [handlePhaserInteraction]);


  // --- 4. Render UI and Game Canvas ---
  return (
    // Use flex-grow and h-screen for a full-page layout
    <div className="flex flex-col h-screen bg-gray-100"> 
      
      {/* Top Header/HUD: Wallet Status & Resources (React/HTML UI) */}
      <header className="p-4 bg-gray-900 text-white flex justify-between items-center z-10">
        <h1 className="text-xl font-bold text-yellow-400">StarkClans Alpha</h1>
        <ConnectWalletButton />
      </header>

      {/* Main Game Area: Phaser Canvas */}
      <div className="flex-grow flex items-center justify-center relative">
        {/* Pass the ref to the Phaser component */}
        <PhaserGame ref={phaserRef} /> 
        
        {/* Loading/Error Overlay (React UI over Phaser) */}
        {(landLoading || !isConnected) && (
            <div className="absolute inset-0 bg-black bg-opacity-70 flex items-center justify-center text-white text-2xl">
                {landLoading ? 'Loading Game State...' : 'Connect Wallet to Play'}
            </div>
        )}
      </div>
    </div>
  );
}

export default App;
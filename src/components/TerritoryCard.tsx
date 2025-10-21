import React from 'react';
import { useContractRead } from 'wagmi';
import { Abi } from 'viem'; // FIX: Import Abi type from Viem
// FIX: Ensure ActionPanel is imported with the correct extension
import ActionPanel from './ActionPanel.tsx'; 
// Import ABIs
import GameLogicAbi from '../abis/GameLogicAbi.json'; 
import ResourcesAbi from '../abis/ResourcesAbi.json'; 

// --- IMPORTANT: Replace with your DEPLOYED Contract Addresses ---
const GAMELOGIC_CONTRACT_ADDRESS = "0x..."; 
const RESOURCES_CONTRACT_ADDRESS = "0x...";

interface TerritoryCardProps {
  tokenId: number;
  userAddress: `0x${string}`;
  onClose: () => void;
}

// FIX: Cast ABIs to Abi type to resolve import and usage errors
const gameLogicAbi = GameLogicAbi as Abi; 
const resourcesAbi = ResourcesAbi as Abi;

// Define a type for the contract return: [x, y, owner]
type TerritoryStruct = [bigint, bigint, `0x${string}`];

const TerritoryCard: React.FC<TerritoryCardProps> = ({ tokenId, userAddress, onClose }) => {
  
  // 1. Fetch Territory Data (x, y, owner)
  // FIX: Explicitly cast the hook's return type for safe destructuring
  const { data: territoryData, isLoading: isLoadingTerritory } = useContractRead({
    address: GAMELOGIC_CONTRACT_ADDRESS,
    abi: gameLogicAbi, 
    functionName: 'territories',
    args: [BigInt(tokenId)], 
    query: {
        refetchInterval: 5000, 
    }
  }) as { data: TerritoryStruct | undefined, isLoading: boolean }; 
  
  // Safely access data using the defined type
const currentTerritory = territoryData;
const ownerAddress = currentTerritory ? currentTerritory[2] : undefined;
// ... (code up to line 43)

// Safely access data using the defined type
const currentTerritory = territoryData;
const ownerAddress = currentTerritory ? currentTerritory[2] : undefined;
  
// 2. Fetch Owner's Troop Count (for battle info)
const { data: ownerTroops } = useContractRead({
  address: RESOURCES_CONTRACT_ADDRESS,
  abi: resourcesAbi,
  functionName: 'troops',
  
  // FIX 1: Pass the address and assert non-null.
  // We check for the zero address in the enabled property below.
  args: [ownerAddress!],

  // FIX 2: Use the standard enabled property with simplified logic
  // The hook should only run if the address is a non-zero address string.
  enabled: !!ownerAddress && ownerAddress !== '0x0000000000000000000000000000000000000000',

  // FIX 3 (CRUCIAL): Explicitly define the query options and dependencies
  query: {
    refetchInterval: 5000,
    // Add the variables that change as dependencies here
    enabled: !!ownerAddress && ownerAddress !== '0x0000000000000000000000000000000000000000',
  }
});
// src/components/ResourceDashboard.tsx

import React from 'react';
import { useContractRead } from 'wagmi';
import { Abi } from 'viem'; // Import the Abi type from viem
import ResourcesAbi from '../abis/ResourcesAbi.json'; 

// --- IMPORTANT: Replace with your DEPLOYED Resources Contract Address ---
const RESOURCES_CONTRACT_ADDRESS = "0x..."; 

interface ResourceDashboardProps {
  userAddress: `0x${string}`; // Wagmi type for address
}

// Cast the imported JSON object to the Abi type to satisfy TypeScript
const resourcesAbi = ResourcesAbi as Abi; 

const ResourceDashboard: React.FC<ResourceDashboardProps> = ({ userAddress }) => {
  // 1. Fetching Troop Count
  const { data: troopsData, isLoading: isLoadingTroops } = useContractRead({
    address: RESOURCES_CONTRACT_ADDRESS,
    abi: resourcesAbi, // Use the type-asserted ABI
    functionName: 'troops', // Must match function in Resources.sol
    args: [userAddress],
    
    // FIX: Use 'refetchInterval' inside 'query' to enable polling
    query: {
      refetchInterval: 5000, // Refresh data every 5 seconds
    },
  });

  // 2. Fetching Gold/Money Balance (Assuming a 'goldBalance' function exists in Resources.sol)
  const { data: goldData, isLoading: isLoadingGold } = useContractRead({
    address: RESOURCES_CONTRACT_ADDRESS,
    abi: resourcesAbi, // Use the type-asserted ABI
    functionName: 'goldBalance', // Must match function in Resources.sol
    args: [userAddress],
    
    // FIX: Use 'refetchInterval' inside 'query' to enable polling
    query: {
      refetchInterval: 5000, // Refresh data every 5 seconds
    },
  });

  const troops = troopsData ? String(troopsData) : '0';
  const gold = goldData ? String(goldData) : '0';

  return (
    <div className="resource-dashboard-coc">
      <div className="resource-item gold">
        <span role="img" aria-label="gold-icon">💰</span> 
        {isLoadingGold ? 'Loading...' : gold}
      </div>
      <div className="resource-item troops">
        <span role="img" aria-label="troop-icon">⚔️</span> 
        {isLoadingTroops ? 'Loading...' : troops}
      </div>
      {/* Add a button for "Purchase Land" or "Train" here */}
      <button className="dashboard-action-btn">Store</button>
    </div>
  );
};

export default ResourceDashboard;
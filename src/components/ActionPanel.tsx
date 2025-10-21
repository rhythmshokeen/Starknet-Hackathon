// src/components/ActionPanel.tsx

import React, { useState } from 'react';
// FIX: Separate the Wagmi imports and ensure the correct hook is referenced
import { useContractWrite, useWaitForTransaction } from 'wagmi';
import GameLogicAbi from '../abis/GameLogicAbi.json';

// --- IMPORTANT: Replace with your DEPLOYED GameLogic Contract Address ---
const GAMELOGIC_CONTRACT_ADDRESS = "0x..."; 

interface ActionPanelProps {
  attackerTokenId: number; // The token ID the user owns and is attacking from
  defenderTokenId: number; // The target token ID (if attacking)
  userAddress: `0x${string}`;
}

const ActionPanel: React.FC<ActionPanelProps> = ({ attackerTokenId, defenderTokenId, userAddress }) => {
  const [attackingTroops, setAttackingTroops] = useState('');
  
  // Logic to determine if this panel is for an attacking action
  const isAttackingAction = defenderTokenId !== 0;

  // 1. Attack Function Logic
  const { data: attackTx, write: attackClan, isLoading: isWriteLoading } = useContractWrite({
    address: GAMELOGIC_CONTRACT_ADDRESS,
    abi: GameLogicAbi,
    functionName: 'attack',
    args: [
      BigInt(attackerTokenId), 
      BigInt(defenderTokenId), 
      BigInt(attackingTroops)  
    ],
    // Only enable if action is valid and troop count is set
    enabled: isAttackingAction && attackerTokenId !== 0 && parseInt(attackingTroops) > 0, 
  });

  const { isLoading: isTxConfirming } = useWaitForTransaction({
    hash: attackTx?.hash,
  });

  if (!isAttackingAction) return null; 

  const isLoading = isWriteLoading || isTxConfirming;

  return (
    <div className="action-panel-coc">
      <h3>Launch Assault on Land #{defenderTokenId}</h3>
      
      <div className="attack-form">
        <label htmlFor="attackerId">Your Attacking Land (Token ID):</label>
        <input 
          id="attackerId"
          type="number" 
          value={attackerTokenId} 
          readOnly={true} 
        />
        
        <label htmlFor="troops">Troops to Send:</label>
        <input 
          id="troops"
          type="number" 
          placeholder="Max: (Check Dashboard)"
          value={attackingTroops} 
          onChange={(e) => setAttackingTroops(e.target.value)}
          disabled={isLoading}
        />
        
        <button onClick={() => attackClan()} disabled={isLoading} className="attack-btn">
          {isLoading ? 'Processing...' : 'Attack Now!'}
        </button>
        
        {isTxConfirming && <p>Transaction pending confirmation...</p>}
      </div>
    </div>
  );
};

export default ActionPanel;
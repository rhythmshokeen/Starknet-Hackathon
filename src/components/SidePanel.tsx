import { useGameStore } from "../state/gameStore";
import { useWalletStore } from "../state/walletStore";

export default function SidePanel() {
  const { selectedTile, trainUnit, gold } = useGameStore();
  const { address } = useWalletStore();

  if (!selectedTile || !address) return null;

  return (
    <div
      style={{
        padding: 16,
        width: 200,
        borderLeft: "1px solid #222",
      }}
    >
      <h4>Tile #{selectedTile.id}</h4>
      <p>Gold: {gold}</p>

      <button
        disabled={gold < 20}
        onClick={() => trainUnit(address)}
      >
        Train Unit (20 Gold)
      </button>
    </div>
  );
}
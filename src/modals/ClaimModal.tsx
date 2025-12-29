import { useGameStore } from "../state/gameStore";
import { useWalletStore } from "../state/walletStore";

export default function ClaimModal() {
  const { selectedTile, claimTile, closeModal } = useGameStore();
  const { address } = useWalletStore();

  if (!selectedTile) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.6)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          background: "#111",
          padding: 24,
          borderRadius: 8,
          width: 300,
        }}
      >
        <h3>Claim Tile #{selectedTile.id}</h3>

        <p style={{ opacity: 0.7, marginTop: 8 }}>
          This land will belong to your wallet.
        </p>

        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          <button
            onClick={() => address && claimTile(address)}
          >
            Claim
          </button>

          <button onClick={closeModal}>Cancel</button>
        </div>
      </div>
    </div>
  );
}
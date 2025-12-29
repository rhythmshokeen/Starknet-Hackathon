import { useWalletStore } from "../state/walletStore";
import { useGameStore } from "../state/gameStore";

export default function TopBar() {
  const { status, address, disconnect } = useWalletStore();
  const gold = useGameStore((s) => s.gold);

  return (
    <div
      style={{
        height: "56px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 20px",
        borderBottom: "1px solid #222",
        background: "#111",
      }}
    >
      <div style={{ fontWeight: 600 }}>
        Cairo Conquest
      </div>

      <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
        <div>🪙 Gold: {gold}</div>

        {status === "connected" && address ? (
          <>
            <div
              style={{
                padding: "4px 10px",
                background: "#222",
                borderRadius: 6,
                fontSize: 13,
              }}
            >
              {address.slice(0, 6)}…{address.slice(-4)}
            </div>

            <button
              onClick={disconnect}
              style={{
                background: "transparent",
                color: "#ff6b6b",
                border: "none",
                cursor: "pointer",
              }}
            >
              Disconnect
            </button>
          </>
        ) : (
          <span style={{ fontSize: 13, opacity: 0.6 }}>
            Wallet not connected
          </span>
        )}
      </div>
    </div>
  );
}
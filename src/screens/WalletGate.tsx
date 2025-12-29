import { useWalletStore } from "../state/walletStore";

export default function WalletGate({ onSuccess }: { onSuccess: () => void }) {
  const { connect, status } = useWalletStore();

  const handleConnect = async () => {
    await connect();
    onSuccess();
  };

  return (
    <div className="app">
      <h2>Connect Wallet</h2>

      <button onClick={handleConnect} disabled={status === "connecting"}>
        {status === "connecting" ? "Connecting…" : "Connect Starknet Wallet"}
      </button>
    </div>
  );
}
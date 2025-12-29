import { useState } from "react";
import LandingScreen from "./screens/LandingScreen";
import WalletGate from "./screens/WalletGate";
import GameLayout from "./screens/GameLayout";

export default function App() {
  const [stage, setStage] = useState<
    "landing" | "wallet" | "game"
  >("landing");

  if (stage === "landing") {
    return <LandingScreen onEnter={() => setStage("wallet")} />;
  }

  if (stage === "wallet") {
    return <WalletGate onSuccess={() => setStage("game")} />;
  }

  return <GameLayout />;
}
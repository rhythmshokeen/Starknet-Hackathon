import TopBar from "../components/TopBar";
import GameMap from "../components/GameMap";
import SidePanel from "../components/SidePanel";
import ClaimModal from "../modals/ClaimModal";

export default function GameLayout() {
  return (
    <div>
      <TopBar />

      <div style={{ display: "flex" }}>
        <GameMap />
        <SidePanel />
      </div>

      <ClaimModal />
    </div>
  );
}
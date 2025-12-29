import { Tile as TileType, Unit } from "../state/gameStore";

type Props = {
  tile: TileType;
  unit?: Unit;
  onClick: () => void;
};

export default function Tile({ tile, unit, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      style={{
        width: 48,
        height: 48,
        background: tile.owner ? "#16a34a" : "#27272a",
        border: "1px solid #111",
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontSize: 12,
        color: "#fff",
      }}
    >
      {unit && (
        <>
          ⚔️
          <span style={{ fontSize: 10 }}>{unit.hp} HP</span>
        </>
      )}
      {!unit && tile.owner && "⛳"}
    </div>
  );
}
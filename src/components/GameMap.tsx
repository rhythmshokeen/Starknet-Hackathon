import Tile from "./Tile";
import { useGameStore } from "../state/gameStore";

export default function GameMap() {
  const {
    tiles,
    units,
    selectedUnit,
    selectTile,
    selectUnit,
    moveUnit,
    attackUnit,
  } = useGameStore();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(8, 48px)",
        gap: 4,
        padding: 16,
      }}
    >
      {tiles.map((tile) => {
        const unit = units.find((u) => u.tileId === tile.id);

        return (
          <Tile
            key={tile.id}
            tile={tile}
            unit={unit}
            onClick={() => {
              if (selectedUnit && unit && unit.owner !== selectedUnit.owner) {
                attackUnit(unit);
              } else if (selectedUnit && !unit) {
                moveUnit(tile.id);
              } else if (unit) {
                selectUnit(unit);
              } else {
                selectTile(tile);
              }
            }}
          />
        );
      })}
    </div>
  );
}
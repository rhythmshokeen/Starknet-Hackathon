import { create } from "zustand";

export type Tile = {
  id: number;
  owner: string | null;
};

export type Unit = {
  id: number;
  tileId: number;
  owner: string;
  hp: number;
};

interface GameState {
  tiles: Tile[];
  units: Unit[];
  selectedTile: Tile | null;
  selectedUnit: Unit | null;
  gold: number;

  selectTile: (tile: Tile) => void;
  selectUnit: (unit: Unit) => void;

  claimTile: (address: string) => void;
  trainUnit: (address: string) => void;
  moveUnit: (targetTileId: number) => void;
  attackUnit: (defender: Unit) => void;

  closeSelection: () => void;
}

const GRID_SIZE = 8;
const GOLD_PER_TILE = 10;
const UNIT_COST = 20;
const ATTACK_DAMAGE = 40;

export const useGameStore = create<GameState>((set, get) => ({
  tiles: Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, i) => ({
    id: i,
    owner: null,
  })),

  units: [],
  selectedTile: null,
  selectedUnit: null,
  gold: 0,

  selectTile: (tile) =>
    set({ selectedTile: tile, selectedUnit: null }),

  selectUnit: (unit) =>
    set({ selectedUnit: unit, selectedTile: null }),

  claimTile: (address) =>
    set((state) => {
      const updatedTiles = state.tiles.map((t) =>
        t.id === state.selectedTile?.id
          ? { ...t, owner: address }
          : t
      );

      const ownedCount = updatedTiles.filter(
        (t) => t.owner === address
      ).length;

      return {
        tiles: updatedTiles,
        selectedTile: null,
        gold: ownedCount * GOLD_PER_TILE,
      };
    }),

  trainUnit: (address) =>
    set((state) => {
      if (!state.selectedTile || state.gold < UNIT_COST) return state;

      const tileId = state.selectedTile.id;
      const occupied = state.units.some(
        (u) => u.tileId === tileId
      );
      if (occupied) return state;

      return {
        units: [
          ...state.units,
          {
            id: Date.now(),
            tileId,
            owner: address,
            hp: 100,
          },
        ],
        gold: state.gold - UNIT_COST,
        selectedTile: null,
      };
    }),

  moveUnit: (targetTileId) =>
    set((state) => {
      if (!state.selectedUnit) return state;

      return {
        units: state.units.map((u) =>
          u.id === state.selectedUnit!.id
            ? { ...u, tileId: targetTileId }
            : u
        ),
        selectedUnit: null,
      };
    }),

  attackUnit: (defender) =>
    set((state) => {
      if (!state.selectedUnit) return state;

      const attacker = state.selectedUnit;

      const updatedUnits = state.units
        .map((u) =>
          u.id === defender.id
            ? { ...u, hp: u.hp - ATTACK_DAMAGE }
            : u
        )
        .filter((u) => u.hp > 0);

      return {
        units: updatedUnits,
        selectedUnit: null,
      };
    }),

  closeSelection: () =>
    set({ selectedTile: null, selectedUnit: null }),
}));
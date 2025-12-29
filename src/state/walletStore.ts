import { create } from "zustand";
import type { Account } from "starknet";
import { getStarknet } from "@starknet-io/get-starknet-wallet-standard";

type WalletStatus = "disconnected" | "connecting" | "connected";

interface WalletState {
  status: WalletStatus;
  address: string | null;
  account: Account | null;

  connect: () => Promise<void>;
  disconnect: () => void;
}

export const useWalletStore = create<WalletState>((set) => ({
  status: "disconnected",
  address: null,
  account: null,

  connect: async () => {
    set({ status: "connecting" });

    const wallet = await getStarknet();
    if (!wallet) {
      set({ status: "disconnected" });
      alert("No Starknet wallet found");
      return;
    }

    await wallet.enable();

    if (!wallet.account) {
      set({ status: "disconnected" });
      alert("Wallet not connected");
      return;
    }

    set({
      status: "connected",
      account: wallet.account,
      address: wallet.account.address,
    });
  },

  disconnect: () => {
    set({
      status: "disconnected",
      address: null,
      account: null,
    });
  },
}));
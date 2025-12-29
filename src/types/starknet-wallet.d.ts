declare module "@starknet-io/get-starknet-wallet-standard" {
  export function getStarknet(): Promise<{
    enable: (options?: any) => Promise<void>;
    account?: import("starknet").Account;
  } | null>;
}
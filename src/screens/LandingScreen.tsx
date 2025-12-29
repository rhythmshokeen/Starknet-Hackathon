type Props = {
  onEnter: () => void;
};

export default function LandingScreen({ onEnter }: Props) {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Cairo Conquest</h1>
      <p className="mb-8 text-zinc-400">
        Fully on-chain strategy game on Starknet
      </p>
      <button
        onClick={onEnter}
        className="px-6 py-2 rounded bg-purple-600 hover:bg-purple-500"
      >
        Enter World
      </button>
    </div>
  );
}
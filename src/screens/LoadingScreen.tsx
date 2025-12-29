export default function LoadingScreen() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-black text-white">
      <h1 className="text-4xl font-bold mb-4">Cairo Conquest</h1>
      <p className="animate-pulse text-gray-400">
        Syncing on-chain world…
      </p>
    </div>
  );
}
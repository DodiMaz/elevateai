import ContentGenerator from "./components/ContentGenerator";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1 className="text-3xl font-bold">ElevateAI 🚀</h1>
      <ContentGenerator />
    </main>
  );
}

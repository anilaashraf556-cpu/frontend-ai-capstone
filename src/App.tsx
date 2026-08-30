import { useState } from "react";

type CarePlan = {
  summary: string;
  watering: string;
  lighting: string;
  soil: string;
  temperature: string;
  environment: string;
  tips: string[];
  problemAnalysis?: string;
};

function App() {
  const [plant, setPlant] = useState("");
  const [problem, setProblem] = useState("");
  const [result, setResult] = useState<CarePlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function generateCarePlan() {
    if (!plant.trim()) {
      setError("Please enter a plant name.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    try {
      const response = await fetch("http://localhost:3001/api/care-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          plant,
          problem,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setResult(data);
    } catch (err) {
      console.error(err);

      setError(
        "We couldn't generate your care plan. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-green-50 text-gray-900">
      {/* Header */}
      <header className="border-b bg-white">
        <nav
          className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5"
          aria-label="Main navigation"
        >
          <h1 className="text-2xl font-bold text-green-700">
            🌱 PlantCare AI
          </h1>

          <span className="hidden text-sm text-gray-600 sm:block">
            Smart care for healthier plants
          </span>
        </nav>
      </header>

      {/* Main */}
      <main className="mx-auto max-w-6xl px-6 py-10">
        {/* Hero */}
        <section className="mb-10 text-center">
          <p className="mb-2 font-semibold text-green-700">
            AI-Powered Plant Care
          </p>

          <h2 className="mb-4 text-4xl font-bold md:text-5xl">
            Help your plants thrive 🌿
          </h2>

          <p className="mx-auto max-w-2xl text-lg text-gray-600">
            Tell us what plant you have and what is happening. PlantCare AI
            will create a simple, personalized care guide for you.
          </p>
        </section>

        {/* Application */}
        <div className="grid gap-8 md:grid-cols-2">
          {/* Form */}
          <section className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-2xl font-bold">
              Tell Us About Your Plant
            </h2>

            <p className="mb-6 text-sm text-gray-600">
              You don't need to know technical plant-care information. Just
              tell us the plant name and describe any problem you notice.
            </p>

            <div className="space-y-5">
              {/* Plant */}
              <div>
                <label
                  htmlFor="plant"
                  className="mb-2 block font-medium"
                >
                  Plant name <span aria-hidden="true">*</span>
                </label>

                <input
                  id="plant"
                  type="text"
                  value={plant}
                  onChange={(e) => {
                    setPlant(e.target.value);
                    setError("");
                  }}
                  placeholder="e.g. Snake Plant"
                  required
                  className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                />
              </div>

              {/* Problem */}
              <div>
                <label
                  htmlFor="problem"
                  className="mb-2 block font-medium"
                >
                  What is happening?{" "}
                  <span className="font-normal text-gray-500">
                    (optional)
                  </span>
                </label>

                <textarea
                  id="problem"
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  placeholder="Example: The leaves are turning yellow and the plant looks droopy."
                  rows={6}
                  maxLength={500}
                  className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-200"
                />

                <p className="mt-1 text-right text-xs text-gray-500">
                  {problem.length}/500
                </p>
              </div>

              {/* Error */}
              {error && (
                <div
                  role="alert"
                  className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                type="button"
                onClick={generateCarePlan}
                disabled={loading}
                className="w-full rounded-lg bg-green-700 px-5 py-3 font-semibold text-white transition hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-200 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating your care plan..." : "Generate Care Plan 🌱"}
              </button>
            </div>
          </section>

          {/* Results */}
          <section
            className="rounded-2xl bg-white p-6 shadow-sm"
            aria-live="polite"
          >
            <h2 className="mb-6 text-2xl font-bold">
              Your Plant Care Plan
            </h2>

            {/* Empty state */}
            {!result && !loading && (
              <div className="flex min-h-[420px] items-center justify-center rounded-xl bg-green-50 p-6 text-center">
                <div>
                  <div className="mb-4 text-6xl" aria-hidden="true">
                    🌱
                  </div>

                  <p className="font-medium text-gray-700">
                    Your personalized care plan will appear here.
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Enter a plant name to get started.
                  </p>
                </div>
              </div>
            )}

            {/* Loading */}
            {loading && (
              <div className="flex min-h-[420px] items-center justify-center rounded-xl bg-green-50 p-6 text-center">
                <div>
                  <div className="mb-4 text-5xl" aria-hidden="true">
                    🌿
                  </div>

                  <p className="font-semibold text-green-700">
                    Creating your care plan...
                  </p>

                  <p className="mt-2 text-sm text-gray-500">
                    Our AI is preparing personalized guidance.
                  </p>
                </div>
              </div>
            )}

            {/* Result */}
            {result && !loading && (
              <div className="space-y-5">
                {/* Summary */}
                <div className="rounded-xl bg-green-50 p-5">
                  <h3 className="mb-2 font-bold">
                    🌱 Overview
                  </h3>

                  <p className="text-gray-700">
                    {result.summary}
                  </p>
                </div>

                {/* Environment */}
                <div>
                  <h3 className="font-bold">🏡 Environment</h3>

                  <p className="text-gray-700">
                    {result.environment}
                  </p>
                </div>

                {/* Lighting */}
                <div>
                  <h3 className="font-bold">☀️ Light</h3>

                  <p className="text-gray-700">
                    {result.lighting}
                  </p>
                </div>

                {/* Watering */}
                <div>
                  <h3 className="font-bold">💧 Watering</h3>

                  <p className="text-gray-700">
                    {result.watering}
                  </p>
                </div>

                {/* Soil */}
                <div>
                  <h3 className="font-bold">🪴 Soil</h3>

                  <p className="text-gray-700">
                    {result.soil}
                  </p>
                </div>

                {/* Temperature */}
                <div>
                  <h3 className="font-bold">🌡️ Temperature</h3>

                  <p className="text-gray-700">
                    {result.temperature}
                  </p>
                </div>

                {/* Problem */}
                {result.problemAnalysis && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-5">
                    <h3 className="mb-2 font-bold">
                      🔍 About Your Plant's Problem
                    </h3>

                    <p className="text-gray-700">
                      {result.problemAnalysis}
                    </p>
                  </div>
                )}

                {/* Tips */}
                <div>
                  <h3 className="mb-2 font-bold">
                    🌿 Care Tips
                  </h3>

                  <ul className="list-disc space-y-2 pl-5 text-gray-700">
                    {result.tips.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="border-t pt-4">
                  <p className="text-xs leading-relaxed text-gray-500">
                    AI-generated information is for general plant-care
                    guidance. It does not replace advice from a qualified
                    horticultural professional.
                  </p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t bg-white py-6 text-center text-sm text-gray-500">
        PlantCare AI • AI-enhanced frontend capstone
      </footer>
    </div>
  );
}

export default App;
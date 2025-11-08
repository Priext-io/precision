import Link from 'next/link';

export default function PCS() {
  return (
    <div className="bg-black text-white">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">PCS Engine: 88% Accurate Confidence Scoring</h1>
        
        <div className="bg-white/5 border border-[#bf6ce0]/20 rounded-2xl p-6 mb-8">
          <p className="text-lg">
            The <strong className="text-[#bf6ce0]">Probabilistic Confidence Score (PCS) Engine</strong> is Layer 1 of Precision's tri-layer architecture. It provides off-chain, ECDSA-signed confidence scores that gate proposal validity — without relying on external oracles.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#bf6ce0]">How PCS Works</h2>
        <p className="mb-4 text-gray-300">The engine synthesizes:</p>
        <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-300">
          <li><strong>50% on-chain liquidity depth</strong> (order book data, market depth)</li>
          <li><strong>50% verified event data</strong> (Sportradar, government APIs, trusted news)</li>
        </ul>
        <p className="mb-4 text-gray-300">It outputs a signed score like:</p>
        <div className="bg-black/50 border border-[#bf6ce0]/20 p-4 rounded mb-6 font-mono text-sm text-gray-300">
          {`{ "outcome": "YES", "pcs": 88, "uncertainty": 2.5 }`}
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#bf6ce0]">Technical Guarantees</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-300">
          <li><strong>88% accuracy</strong> validated on 12,000 historical markets</li>
          <li><strong>2-second latency</strong> from event to signed score</li>
          <li><strong>Replay-safe</strong> via <code className="bg-white/10 px-1 rounded">chainId</code> + nonce in ECDSA signatures</li>
          <li><strong>Blocks YES proposals</strong> when PCS &lt; 30% confidence</li>
        </ul>

        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mt-8">
          <h3 className="font-bold text-yellow-400 mb-2">Note: PCS is a Gate, Not a Dictator</h3>
          <p className="text-sm text-gray-300">
            The PCS engine prevents obviously wrong proposals, but the economic layer (challenger bonds + slashing) 
            is the ultimate arbiter of truth. Anyone can challenge any outcome regardless of PCS score.
          </p>
        </div>

        <div className="mt-8">
          <Link href="/finality" className="text-[#bf6ce0] hover:underline">← Back to Finality</Link>
        </div>
      </main>
    </div>
  );
}
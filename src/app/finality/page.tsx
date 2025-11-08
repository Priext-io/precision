import Link from 'next/link';

export default function Finality() {
  return (
    <div className="bg-black text-white">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">Optimistic Finality: 24–48h Settlement</h1>
        
        <div className="bg-white/5 border border-[#bf6ce0]/20 rounded-2xl p-6 mb-8">
          <p className="text-lg">
            Layer 2 of Precision's architecture enables fast, capital-efficient market resolution through bonded proposals and optimistic challenges.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#bf6ce0]">How Finality Works</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-300">
          <li><strong>1% bond</strong> of market size required to propose outcome</li>
          <li><strong>24h liveness period</strong> for markets ≤100K $CESN</li>
          <li><strong>48h liveness</strong> for larger markets (&gt;100K $CESN)</li>
          <li><strong>Automatic bond return</strong> if unchallenged during liveness period</li>
          <li><strong>State transition</strong> from PENDING → FINALIZED after liveness</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-[#bf6ce0]">Gas Efficiency</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-300">
          <li><strong>$0.01 per transaction</strong> on BSC/opBNB</li>
          <li><strong>3-second finality</strong> compatible with BNB Chain</li>
          <li><strong>50,000+ markets/day</strong> capacity</li>
          <li><strong>Minimal storage operations</strong> for optimal gas usage</li>
        </ul>

        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mt-8">
          <h3 className="font-bold text-blue-400 mb-2">Optimistic Approach</h3>
          <p className="text-sm text-gray-300">
            The system assumes most outcomes are correct and only invests computational resources 
            when disputes occur. This enables massive scalability while maintaining security.
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/pcs" className="text-[#bf6ce0] hover:underline">← Back to PCS</Link>
          <Link href="/enforcement" className="text-[#bf6ce0] hover:underline">Next: Enforcement →</Link>
        </div>
      </main>
    </div>
  );
}
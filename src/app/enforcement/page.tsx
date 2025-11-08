import Link from 'next/link';

export default function Enforcement() {
  return (
    <div className="bg-black text-white">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">Economic Enforcement: 100% Slashing</h1>
        
        <div className="bg-white/5 border border-[#bf6ce0]/20 rounded-2xl p-6 mb-8">
          <p className="text-lg">
            Layer 3 ensures system integrity through capital-backed truth enforcement and anti-manipulation mechanisms.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#bf6ce0]">Challenge Mechanics</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-300">
          <li><strong>2x bond requirement</strong> to dispute outcomes (double the proposer's bond)</li>
          <li><strong>100% of loser's bond</strong> slashed to winner</li>
          <li><strong>+50% penalty</strong> if PCS &lt; 30% (mathematically verified for overflow safety)</li>
          <li><strong>Challenger-only execution</strong> prevents third-party attacks</li>
          <li><strong>Atomic state transition</strong> from PENDING → DISPUTED</li>
        </ul>

        <h2 className="text-2xl font-bold mb-4 text-[#bf6ce0]">Security Guarantees</h2>
        <ul className="list-disc pl-5 mb-6 space-y-2 text-gray-300">
          <li><strong>No committee overrides</strong> or multisig fallbacks</li>
          <li><strong>Economic incentives</strong> naturally align with truth discovery</li>
          <li><strong>Transparent, on-chain</strong> dispute resolution</li>
          <li><strong>Reentrancy protection</strong> on all bond operations</li>
          <li><strong>Finalized flag</strong> prevents double-spending of bonds</li>
        </ul>

        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 mt-8">
          <h3 className="font-bold text-red-400 mb-2">Trustless by Design</h3>
          <p className="text-sm text-gray-300">
            The enforcement layer requires no human intervention, committees, or governance. 
            Truth emerges purely through economic game theory and cryptographic verification.
          </p>
        </div>

        <div className="mt-8 flex gap-4">
          <Link href="/finality" className="text-[#bf6ce0] hover:underline">← Back to Finality</Link>
          <Link href="/dev" className="text-[#bf6ce0] hover:underline">Next: Developer Docs →</Link>
        </div>
      </main>
    </div>
  );
}
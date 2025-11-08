import Link from 'next/link';

export default function Dev() {
  return (
    <div className="bg-black text-white">
      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-bold mb-8">Developer Integration</h1>
        
        <div className="bg-white/5 border border-[#bf6ce0]/20 rounded-2xl p-6 mb-8">
          <p className="text-lg">
            Integrate Precision finality oracle into your prediction market in under 30 minutes.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#bf6ce0]">Quick Start</h2>
        <div className="bg-black border border-[#bf6ce0]/20 p-4 rounded mb-6 overflow-x-auto">
          <code className="text-sm block whitespace-pre-wrap text-gray-300">
{`// 1. Propose an outcome (Proposer stakes 1% bond)
await FinalityEngine.proposeOutcome(
  keccak256("BTC>100K_1735689600"), // marketID
  FinalityEngine.Outcome.YES,        // outcome: YES, NO, or INVALID
  ethers.parseEther("100"),          // 1% of market size as bond
  ethers.parseEther("10000")         // market size
);

// 2. Challenge the outcome (Challenger stakes 2x bond)
await DisputeModule.disputeOutcome(
  keccak256("BTC>100K_1735689600"),  // marketID
  ethers.parseEther("200")           // 2x proposer bond
);

// 3. Execute slashing (Only challenger can execute)
await DisputeModule.executeSlashing(
  keccak256("BTC>100K_1735689600"),  // marketID
  true                               // proposerWasWrong (boolean)
);

// Economic Finality Guarantees:
// - Proposers bond 1% of market size for outcomes
// - 24-48h liveness window for unchallenged outcomes  
// - Challengers must post 2x proposer bond to dispute
// - 100% slashing to winner, +50% penalty if PCS < 30%
// - No committees, no overrides. Truth emerges from capital.`}
          </code>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#bf6ce0]">Contract Addresses</h2>
        <div className="bg-white/5 border border-[#bf6ce0]/20 rounded-lg p-4 mb-6">
          <ul className="space-y-2 font-mono text-sm text-gray-300">
            <li><strong>CESNToken:</strong>        [To be deployed post-audit]</li>
            <li><strong>BondEscrow:</strong>       [To be deployed post-audit]</li>
            <li><strong>PCSAlignmentGuard:</strong> [To be deployed post-audit]</li>
            <li><strong>FinalityEngine:</strong>   [To be deployed post-audit]</li>
            <li><strong>DisputeModule:</strong>    [To be deployed post-audit]</li>
          </ul>
          <p className="text-sm mt-3 text-gray-400">
            All contracts are immutable post-deployment, ensuring no governance overrides or admin functions.
          </p>
        </div>

        <h2 className="text-2xl font-bold mb-4 text-[#bf6ce0]">Gas Costs (BNB Chain)</h2>
        <div className="bg-white/5 border border-[#bf6ce0]/20 rounded-lg p-4 mb-6">
          <ul className="space-y-2 text-gray-300">
            <li><strong>Propose outcome:</strong> ~$0.01 (1% bond deposit + PCS validation)</li>
            <li><strong>Challenge outcome:</strong> ~$0.02 (2x bond deposit + state transition)</li>
            <li><strong>Finalize outcome:</strong> ~$0.005 (bond return + state finalization)</li>
            <li><strong>Execute slashing:</strong> ~$0.015 (bond transfer + penalty calculation)</li>
          </ul>
          <p className="text-sm mt-3 text-gray-400">
            Total cost for a disputed market: ~$0.045 per transaction<br/>
            Capacity: 50,000+ markets per day on BNB Chain
          </p>
        </div>

        <div className="bg-[#bf6ce0]/10 border border-[#bf6ce0]/20 rounded-lg p-6">
          <h3 className="font-bold text-[#bf6ce0] mb-3 text-lg">Ready for Integration</h3>
          <p className="mb-6 text-gray-300">
            All contracts are audit-ready and designed for seamless prediction market integration. 
            The protocol is fully <strong>trustless with no committees, no governance, and no admin overrides</strong>.
          </p>
          
          <div className="mb-6">
            <p className="text-sm text-gray-400 mb-3">Get in touch:</p>
            <div className="flex items-center gap-6">
              {/* Email */}
              <a 
                href="mailto:hello@cesnapp.com" 
                className="hover:opacity-80 transition-opacity" 
                title="Email"
              >
                <svg className="w-7 h-7 text-[#bf6ce0]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>
              
              {/* X/Twitter */}
              <a 
                href="https://x.com/CECNApp_" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 transition-opacity" 
                title="X"
              >
                <svg className="w-7 h-7 text-[#bf6ce0]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24h-6.514l-5.106-6.694-5.829 6.694H2.423l7.723-8.835L1.029 2.25h6.679l4.632 6.124 5.581-6.124zM16.884 19.75h1.833L7.084 4.126H5.117l11.767 15.624z"/>
                </svg>
              </a>
              
              {/* GitHub */}
              <a 
                href="https://github.com/Priext-io/precision" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:opacity-80 transition-opacity" 
                title="GitHub"
              >
                <svg className="w-7 h-7 text-[#bf6ce0]" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
            </div>
          </div>
          
          <p className="text-sm text-gray-400">
            For early access to testnet deployment and integration support, email <strong>hello@cesnapp.com</strong>
          </p>
        </div>

        <div className="mt-8">
          <Link href="/enforcement" className="text-[#bf6ce0] hover:underline">← Back to Enforcement</Link>
        </div>
      </main>
    </div>
  );
}
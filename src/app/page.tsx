import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="bg-black text-white">
      <main className="max-w-6xl mx-auto px-6 py-20">
        
        {/* Hero Section */}
        <div className="text-center mb-20">
          <div className="flex justify-center mb-12">
            <Image 
              src="/cecn.png" 
              alt="Precision" 
              width={280} 
              height={84}
              priority
              className="drop-shadow-lg"
            />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Universal Finality Oracle<br/>for Prediction Markets
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            <span className="text-[#bf6ce0] font-semibold">88% PCS accuracy</span> • <span className="text-[#bf6ce0] font-semibold">24–48h settlement</span> • <span className="text-[#bf6ce0] font-semibold">100% slashing</span>
          </p>
          
          <p className="text-lg text-gray-400 mb-12 max-w-3xl mx-auto">
            No committees. No oracles. Just economic finality.
          </p>
        </div>

        {/* Core Value Proposition */}
        <div className="bg-white/5 border border-[#bf6ce0]/20 rounded-2xl p-8 mb-20">
          <p className="text-lg leading-relaxed">
            Precision is a <strong className="text-[#bf6ce0]">trustless finality oracle</strong> that eliminates the 15% dispute tax in prediction markets. By backing outcomes with capital and enforcing truth through economic incentives, we enable fast, secure settlement without centralized arbiters.
          </p>
        </div>

        {/* Tri-Layer Architecture */}
        <div className="mb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">Tri-Layer Architecture</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {/* Layer 1: PCS Engine */}
            <div className="bg-white/5 border border-[#bf6ce0]/20 rounded-xl p-8 hover:border-[#bf6ce0]/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#bf6ce0] flex items-center justify-center font-bold text-sm text-black">1</div>
                <h3 className="text-xl font-bold text-[#bf6ce0]">PCS Engine</h3>
              </div>
              <p className="text-gray-300 mb-4">88% accurate confidence scoring using liquidity and event data.</p>
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li>✓ ECDSA-signed scores</li>
                <li>✓ Blocks low-confidence proposals</li>
                <li>✓ 2-second latency</li>
              </ul>
              <Link href="/pcs" className="inline-block text-[#bf6ce0] hover:underline text-sm font-medium">
                Learn more →
              </Link>
            </div>
            
            {/* Layer 2: Optimistic Finality */}
            <div className="bg-white/5 border border-[#bf6ce0]/20 rounded-xl p-8 hover:border-[#bf6ce0]/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#bf6ce0] flex items-center justify-center font-bold text-sm text-black">2</div>
                <h3 className="text-xl font-bold text-[#bf6ce0]">Optimistic Finality</h3>
              </div>
              <p className="text-gray-300 mb-4">Fast settlement with 1% proposer bonds and 24-48h liveness.</p>
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li>✓ 24-48h settlement</li>
                <li>✓ 1% proposer bonds</li>
                <li>✓ Automatic bond returns</li>
              </ul>
              <Link href="/finality" className="inline-block text-[#bf6ce0] hover:underline text-sm font-medium">
                Learn more →
              </Link>
            </div>
            
            {/* Layer 3: Economic Enforcement */}
            <div className="bg-white/5 border border-[#bf6ce0]/20 rounded-xl p-8 hover:border-[#bf6ce0]/50 transition-all">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#bf6ce0] flex items-center justify-center font-bold text-sm text-black">3</div>
                <h3 className="text-xl font-bold text-[#bf6ce0]">Economic Enforcement</h3>
              </div>
              <p className="text-gray-300 mb-4">100% slashing ensures truth is the most profitable outcome.</p>
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li>✓ 2x challenger bonds</li>
                <li>✓ 100% slashing</li>
                <li>✓ +50% PCS penalties</li>
              </ul>
              <Link href="/enforcement" className="inline-block text-[#bf6ce0] hover:underline text-sm font-medium">
                Learn more →
              </Link>
            </div>
          </div>
        </div>

        {/* Key Features */}
        <div className="grid md:grid-cols-3 gap-6 mb-20">
          <div className="bg-white/5 border border-[#bf6ce0]/20 rounded-lg p-6 text-center hover:border-[#bf6ce0]/30 transition-all">
            <h3 className="font-bold text-[#bf6ce0] mb-2">BNB-Native</h3>
            <p className="text-sm text-gray-400">Optimized for $0.01 gas and 3-second finality</p>
          </div>
          <div className="bg-white/5 border border-[#bf6ce0]/20 rounded-lg p-6 text-center hover:border-[#bf6ce0]/30 transition-all">
            <h3 className="font-bold text-[#bf6ce0] mb-2">Chain-Agnostic</h3>
            <p className="text-sm text-gray-400">Designed for any EVM-compatible blockchain</p>
          </div>
          <div className="bg-white/5 border border-[#bf6ce0]/20 rounded-lg p-6 text-center hover:border-[#bf6ce0]/30 transition-all">
            <h3 className="font-bold text-[#bf6ce0] mb-2">Open Core</h3>
            <p className="text-sm text-gray-400">Contracts open-sourced after audit</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#bf6ce0]/10 border border-[#bf6ce0]/20 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to integrate?</h3>
          <p className="text-gray-300 mb-6">Deploy Precision finality in under 30 minutes.</p>
          <Link 
            href="/dev" 
            className="inline-block px-8 py-3 bg-[#bf6ce0] text-black font-bold rounded-lg hover:bg-[#bf6ce0]/90 transition-colors"
          >
            View Developer Docs
          </Link>
        </div>

      </main>
    </div>
  );
}
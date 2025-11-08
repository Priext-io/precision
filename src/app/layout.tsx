import Image from 'next/image';
import Link from 'next/link';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Precision ($CESN) - Prediction Market Finality Oracle',
  description: 'Universal finality oracle for prediction markets: 88% PCS truth, 24–48h settlement, 100% slashing.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <div className="min-h-screen flex flex-col">
          {/* Header */}
          <header className="border-b border-white/10 bg-black sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center">
                <Image 
                  src="/cecn.png" 
                  alt="Precision" 
                  width={140} 
                  height={42}
                  priority
                />
              </Link>
              
              {/* Navigation */}
              <nav className="hidden md:flex space-x-8">
                <Link href="/" className="text-sm hover:text-[#bf6ce0] transition-colors">Home</Link>
                <Link href="/pcs" className="text-sm hover:text-[#bf6ce0] transition-colors">PCS</Link>
                <Link href="/finality" className="text-sm hover:text-[#bf6ce0] transition-colors">Finality</Link>
                <Link href="/enforcement" className="text-sm hover:text-[#bf6ce0] transition-colors">Enforcement</Link>
                <Link href="/dev" className="text-sm hover:text-[#bf6ce0] transition-colors">Dev</Link>
              </nav>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1">
            {children}
          </main>

          {/* Footer */}
          <footer className="border-t border-white/10 bg-black">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex items-center justify-between">
                {/* Left: Branding */}
                <div className="flex items-center gap-3">
                  <Image 
                    src="/cecn.png" 
                    alt="Precision" 
                    width={100} 
                    height={30}
                  />
                  <span className="text-xs text-gray-500">© 2025 Precision</span>
                </div>

                {/* Right: Contact Icons */}
                <div className="flex items-center gap-6">
                  {/* Email */}
                  <a 
                    href="mailto:hello@cesnapp.com" 
                    className="hover:opacity-80 transition-opacity" 
                    title="Email"
                  >
                    <svg className="w-6 h-6 text-[#bf6ce0]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                    </svg>
                  </a>
                  
                  {/* X/Twitter */}
                  <a 
                    href="https://x.com/CESNApp_" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="hover:opacity-80 transition-opacity" 
                    title="X"
                  >
                    <svg className="w-6 h-6 text-[#bf6ce0]" fill="currentColor" viewBox="0 0 24 24">
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
                    <svg className="w-6 h-6 text-[#bf6ce0]" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
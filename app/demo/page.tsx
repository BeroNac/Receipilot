import { Demo } from '@/components/Demo';

export const metadata = {
  title: 'Live Demo - Receipilot',
  description: 'Experience Receipilot in action. Try our interactive demo to see how receipt verification and NFT minting works.',
};

export default function DemoPage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-20 left-1/4 h-[500px] w-[500px] rounded-full orb-purple blur-[120px] opacity-30" />
        <div className="absolute bottom-20 right-1/4 h-[400px] w-[400px] rounded-full orb-blue blur-[100px] opacity-20" />
        <div className="absolute inset-0 grid-bg" />
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Minimal Header */}
        <div className="mb-8 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-500/30 bg-violet-500/10 px-4 py-2 text-sm text-violet-400">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-violet-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-violet-500"></span>
            </span>
            Interactive Demo
          </div>
          <h1 className="text-4xl font-bold md:text-5xl">
            Experience <span className="gradient-text">Receipilot</span>
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Watch the complete flow from email verification to NFT minting
          </p>
        </div>

        {/* Demo Component */}
        <Demo />
      </div>
    </div>
  );
}

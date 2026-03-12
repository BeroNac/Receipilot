import { Demo } from '@/components/Demo';

export const metadata = {
  title: 'Demo - Receipilot',
  description: 'Try Receipilot with a simulated demo experience',
};

export default function DemoPage() {
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-12 text-center">
        <h1 className="mb-4 text-5xl font-bold">
          Try the <span className="gradient-text">Demo</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Experience the full Receipilot flow with a simulated wallet and receipt.
          No real wallet connection required.
        </p>
      </div>
      <Demo />
    </div>
  );
}

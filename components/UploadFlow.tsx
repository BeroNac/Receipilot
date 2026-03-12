'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, Mail, FileText, AlertCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ProofAnimation } from './ProofAnimation';
import { useAccount } from 'wagmi';
import { useToast } from './ui/use-toast';

export function UploadFlow() {
  const [activeTab, setActiveTab] = useState('upload');
  const [isGeneratingProof, setIsGeneratingProof] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [emailText, setEmailText] = useState('');
  const { address, isConnected } = useAccount();
  const { toast } = useToast();

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (!selectedFile.name.endsWith('.eml')) {
        toast({
          title: 'Invalid file type',
          description: 'Please upload a .eml file',
          variant: 'destructive',
        });
        return;
      }
      setFile(selectedFile);
      toast({
        title: 'File uploaded',
        description: `${selectedFile.name} ready to process`,
      });
    }
  };

  const handleGenerateProof = async () => {
    if (!isConnected) {
      toast({
        title: 'Wallet not connected',
        description: 'Please connect your wallet first',
        variant: 'destructive',
      });
      return;
    }

    if (activeTab === 'upload' && !file) {
      toast({
        title: 'No file selected',
        description: 'Please upload a .eml file',
        variant: 'destructive',
      });
      return;
    }

    if (activeTab === 'paste' && !emailText.trim()) {
      toast({
        title: 'No text provided',
        description: 'Please paste your receipt email',
        variant: 'destructive',
      });
      return;
    }

    setIsGeneratingProof(true);
  };

  const handleProofComplete = () => {
    setIsGeneratingProof(false);
    setFile(null);
    setEmailText('');
    toast({
      title: 'NFT Minted Successfully!',
      description: 'Check your wallet or visit My Receipts to view it',
    });
  };

  return (
    <>
      <div id="upload" className="mx-auto max-w-4xl">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="upload">
              <Upload className="mr-2 h-4 w-4" />
              Upload .eml
            </TabsTrigger>
            <TabsTrigger value="paste">
              <FileText className="mr-2 h-4 w-4" />
              Paste Text
            </TabsTrigger>
            <TabsTrigger value="forward">
              <Mail className="mr-2 h-4 w-4" />
              Forward Email
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upload" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-2xl p-8"
            >
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-semibold">Upload Receipt Email</h3>
                <p className="text-sm text-muted-foreground">
                  Export your receipt email as a .eml file and upload it here for full DKIM
                  verification
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-center rounded-xl border-2 border-dashed border-border p-12 transition-all hover:border-blue-500">
                  <Label
                    htmlFor="file-upload"
                    className="flex cursor-pointer flex-col items-center"
                  >
                    <Upload className="mb-4 h-12 w-12 text-muted-foreground" />
                    <span className="mb-2 text-lg font-semibold">
                      {file ? file.name : 'Click to upload or drag and drop'}
                    </span>
                    <span className="text-sm text-muted-foreground">.eml files only</span>
                    <Input
                      id="file-upload"
                      type="file"
                      accept=".eml"
                      className="hidden"
                      onChange={handleFileUpload}
                    />
                  </Label>
                </div>

                <Button
                  size="lg"
                  variant="gradient"
                  className="w-full"
                  onClick={handleGenerateProof}
                  disabled={!file || !isConnected}
                >
                  Generate Proof & Mint NFT
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="paste" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-2xl p-8"
            >
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-semibold">Paste Email Content</h3>
                <div className="flex items-start gap-2 rounded-lg bg-yellow-500/10 p-4 text-sm">
                  <AlertCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-yellow-500" />
                  <p className="text-yellow-500">
                    For maximum security we recommend .eml or forward method (full DKIM
                    verification). Paste is convenient but less secure.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <Label htmlFor="email-text">Email Content</Label>
                  <textarea
                    id="email-text"
                    className="mt-2 min-h-[300px] w-full rounded-lg border border-input bg-transparent p-4 text-sm"
                    placeholder="Paste your receipt email here..."
                    value={emailText}
                    onChange={(e) => setEmailText(e.target.value)}
                  />
                </div>

                <Button
                  size="lg"
                  variant="gradient"
                  className="w-full"
                  onClick={handleGenerateProof}
                  disabled={!emailText.trim() || !isConnected}
                >
                  Generate Proof & Mint NFT
                </Button>
              </div>
            </motion.div>
          </TabsContent>

          <TabsContent value="forward" className="mt-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-effect rounded-2xl p-8"
            >
              <div className="mb-6">
                <h3 className="mb-2 text-2xl font-semibold">Forward to Our Address</h3>
                <p className="text-sm text-muted-foreground">
                  The most secure and convenient method — just forward your receipt email
                </p>
              </div>

              <div className="space-y-8">
                <div className="rounded-xl bg-blue-50 p-6 text-center dark:bg-blue-900/20">
                  <p className="mb-2 text-sm text-muted-foreground">Forward your email to</p>
                  <div className="flex items-center justify-center gap-2">
                    <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      prove@receipilot.xyz
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">How it works:</h4>
                  <ol className="list-inside list-decimal space-y-3 text-sm text-muted-foreground">
                    <li>Forward your receipt email to prove@receipilot.xyz</li>
                    <li>
                      Our secure serverless function parses the email and generates a ZK
                      proof
                    </li>
                    <li>
                      The proof is verified and your NFT is minted automatically to your
                      connected wallet
                    </li>
                    <li>
                      <strong className="text-blue-600 dark:text-blue-400">
                        The email content is permanently deleted within 5 seconds
                      </strong>
                    </li>
                    <li>You receive a confirmation email and can view your NFT</li>
                  </ol>
                </div>

                <div className="rounded-lg border border-violet-200 bg-violet-50 p-4 dark:border-violet-800 dark:bg-violet-900/20">
                  <h4 className="mb-2 flex items-center gap-2 font-semibold text-violet-700 dark:text-violet-300">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Privacy Guarantee
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    We never see or store your email content. Even if you forward a full
                    email with your name, phone, or address, the system deletes it
                    immediately after proof generation. Only the cryptographic hash goes
                    on-chain.
                  </p>
                </div>

                <p className="text-center text-sm text-muted-foreground">
                  Make sure your wallet ({address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'not connected'})
                  is connected before forwarding
                </p>
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <ProofAnimation
        isOpen={isGeneratingProof}
        onComplete={handleProofComplete}
        emailSource={activeTab}
      />
    </>
  );
}

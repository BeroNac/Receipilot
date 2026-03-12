import { Address, parseAbi } from 'viem';
import { useReadContract, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';

// Contract ABIs
export const RECEIPILOT_NFT_ABI = parseAbi([
  'function mint(address to, string memory tokenURI, bytes32 proofHash) public returns (uint256)',
  'function balanceOf(address owner) public view returns (uint256)',
  'function tokenOfOwnerByIndex(address owner, uint256 index) public view returns (uint256)',
  'function tokenURI(uint256 tokenId) public view returns (string)',
  'function getProofHash(uint256 tokenId) public view returns (bytes32)',
  'function getUserMintCount(address user, uint256 weekStart) public view returns (uint256)',
  'function isPremiumUser(address user) public view returns (bool)',
]);

const getContractAddress = (chainId: number): Address => {
  if (chainId === 8453) { // Base mainnet
    return (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_BASE as Address) || '0x';
  } else if (chainId === 84532) { // Base Sepolia
    return (process.env.NEXT_PUBLIC_CONTRACT_ADDRESS_SEPOLIA as Address) || '0x';
  }
  throw new Error('Unsupported chain');
};

export function useReceipilotContract(chainId: number) {
  const contractAddress = getContractAddress(chainId);

  return {
    address: contractAddress,
    abi: RECEIPILOT_NFT_ABI,
  };
}

export function useMintReceipt(chainId: number) {
  const contract = useReceipilotContract(chainId);
  
  const { writeContract, data, error, isPending } = useWriteContract();

  const { isLoading: isWaiting, isSuccess } = useWaitForTransactionReceipt({
    hash: data,
  });

  const mint = (to: Address, tokenURI: string, proofHash: `0x${string}`) => {
    writeContract({
      ...contract,
      functionName: 'mint',
      args: [to, tokenURI, proofHash],
    });
  };

  return {
    mint,
    data,
    error,
    isLoading: isPending || isWaiting,
    isSuccess,
  };
}

export function useUserReceipts(address: Address, chainId: number) {
  const contract = useReceipilotContract(chainId);

  const { data: balance } = useReadContract({
    ...contract,
    functionName: 'balanceOf',
    args: [address],
  });

  return {
    balance: balance ? Number(balance) : 0,
  };
}

export function useUserMintCount(address: Address, chainId: number) {
  const contract = useReceipilotContract(chainId);
  
  // Get the start of the current week (Sunday at midnight UTC)
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setUTCDate(now.getUTCDate() - now.getUTCDay());
  weekStart.setUTCHours(0, 0, 0, 0);
  const weekStartTimestamp = Math.floor(weekStart.getTime() / 1000);

  const { data: mintCount } = useReadContract({
    ...contract,
    functionName: 'getUserMintCount',
    args: [address, BigInt(weekStartTimestamp)],
  });

  return {
    mintCount: mintCount ? Number(mintCount) : 0,
    weekStart: weekStartTimestamp,
  };
}

export function useIsPremiumUser(address: Address, chainId: number) {
  const contract = useReceipilotContract(chainId);

  const { data: isPremium } = useReadContract({
    ...contract,
    functionName: 'isPremiumUser',
    args: [address],
  });

  return {
    isPremium: isPremium || false,
  };
}

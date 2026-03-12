import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Database features will be limited.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface ProofRecord {
  id: string;
  wallet_address: string;
  proof_hash: string;
  order_id: string;
  store_name: string;
  product_name: string;
  purchase_date: string;
  category: 'physical' | 'digital' | 'virtual';
  ipfs_url: string;
  token_id: string;
  created_at: string;
}

export async function saveProofRecord(record: Omit<ProofRecord, 'id' | 'created_at'>) {
  const { data, error } = await supabase.from('receipts').insert([record]).select();

  if (error) {
    console.error('Failed to save proof record:', error);
    throw error;
  }

  return data[0];
}

export async function getReceiptsByWallet(walletAddress: string): Promise<ProofRecord[]> {
  const { data, error } = await supabase
    .from('receipts')
    .select('*')
    .eq('wallet_address', walletAddress.toLowerCase())
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to fetch receipts:', error);
    return [];
  }

  return data || [];
}

export async function searchReceipts(
  walletAddress: string,
  query: string
): Promise<ProofRecord[]> {
  const { data, error } = await supabase
    .from('receipts')
    .select('*')
    .eq('wallet_address', walletAddress.toLowerCase())
    .or(
      `order_id.ilike.%${query}%,store_name.ilike.%${query}%,product_name.ilike.%${query}%`
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Failed to search receipts:', error);
    return [];
  }

  return data || [];
}

export async function checkMintLimit(
  walletAddress: string,
  weekStart: Date
): Promise<number> {
  const { data, error } = await supabase
    .from('receipts')
    .select('id')
    .eq('wallet_address', walletAddress.toLowerCase())
    .gte('created_at', weekStart.toISOString());

  if (error) {
    console.error('Failed to check mint limit:', error);
    return 0;
  }

  return data?.length || 0;
}

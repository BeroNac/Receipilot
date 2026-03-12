import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'mbgeq55v';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-11';

export const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
});

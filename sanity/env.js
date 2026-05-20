const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? 'ybn5breb'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production'

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
}

const apiVersion = '2025-05-01'

export { apiVersion, dataset, projectId }

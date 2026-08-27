import path from 'path'
import { fileURLToPath } from 'url'

import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import { buildConfig } from 'payload'
import sharp from 'sharp'

import { Media } from '@/collections/Media'
import { Pages } from '@/collections/Pages'
import { Users } from '@/collections/Users'
import { Footer } from '@/globals/Footer'
import { Header } from '@/globals/Header'
import { SiteSettings } from '@/globals/SiteSettings'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

/**
 * Reads an environment variable, trimming whitespace and any surrounding
 * quotes. Neon hands out its storage credentials pre-quoted
 * (`AWS_ENDPOINT_URL_S3="https://…"`); dotenv strips those locally, but hosts
 * that store values verbatim keep them, which silently corrupts every URL and
 * signature built from them.
 */
const env = (key: string): string | undefined => {
  const raw = process.env[key]?.trim()
  if (!raw) return undefined
  return raw.replace(/^(['"])(.*)\1$/s, '$2')
}

/**
 * Neon object storage is S3-compatible and path-style addressed. Uploads fall
 * back to the local `public/media` folder when no bucket is configured, so the
 * project runs with nothing but DATABASE_URL set.
 */
const s3Bucket = env('S3_BUCKET')
const s3Endpoint = env('AWS_ENDPOINT_URL_S3')

const storagePlugins =
  s3Bucket && s3Endpoint
    ? [
        s3Storage({
          collections: {
            media: {
              /**
               * Serve files straight from Neon's public bucket instead of
               * proxying every request through /api/media/file. On Vercel that
               * proxy would be a serverless invocation per image, uncached.
               */
              disablePayloadAccessControl: true,
              generateFileURL: ({ filename, prefix }) =>
                [s3Endpoint, s3Bucket, prefix, encodeURIComponent(filename)]
                  .filter(Boolean)
                  .join('/'),
            },
          },
          bucket: s3Bucket,
          // Vercel caps serverless request bodies at 4.5MB; upload from the
          // browser straight to the bucket so large images still work.
          clientUploads: true,
          config: {
            endpoint: s3Endpoint,
            region: env('AWS_REGION') || 'us-east-2',
            forcePathStyle: true,
            credentials: {
              accessKeyId: env('AWS_ACCESS_KEY_ID') || '',
              secretAccessKey: env('AWS_SECRET_ACCESS_KEY') || '',
            },
          },
        }),
      ]
    : []

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: { baseDir: path.resolve(dirname) },
    // The public site is black-on-red; the admin follows it.
    theme: 'dark',
    meta: {
      titleSuffix: ' · Drive7',
      icons: [{ rel: 'icon', type: 'image/png', url: '/drive7-icon.png' }],
    },
    components: {
      graphics: {
        Logo: '@/components/admin/AdminLogo#AdminLogo',
        Icon: '@/components/admin/AdminLogo#AdminIcon',
      },
      beforeNavLinks: ['@/components/admin/NavBrand#NavBrand'],
      afterNavLinks: ['@/components/admin/NavFooter#NavFooter'],
    },
  },
  collections: [Pages, Media, Users],
  globals: [Header, Footer, SiteSettings],
  editor: lexicalEditor(),
  db: postgresAdapter({
    pool: { connectionString: env('DATABASE_URL') || '' },
  }),
  secret: env('PAYLOAD_SECRET') || '',
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  sharp,
  plugins: storagePlugins,
  cors: '*',
  upload: { limits: { fileSize: 20_000_000 } },
})

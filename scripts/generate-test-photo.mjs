/**
 * Crops the top square of the input image (to capture the face)
 * and outputs a base64 data URL for embedding in test data.
 *
 * Usage: node scripts/generate-test-photo.mjs <path-to-image>
 * Output: src/assets/testPhoto.js
 */
import sharp from 'sharp'
import { writeFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

const inputPath = process.argv[2]
if (!inputPath) {
  console.error('Usage: node scripts/generate-test-photo.mjs <path-to-image>')
  process.exit(1)
}

const image = sharp(resolve(inputPath))
const metadata = await image.metadata()

// Crop top square (width x width from top) to capture face
const size = Math.min(metadata.width, metadata.height)
const cropSize = Math.min(size, metadata.width)

const buffer = await image
  .extract({
    left: Math.round((metadata.width - cropSize) / 2),
    top: 0,
    width: cropSize,
    height: cropSize
  })
  .resize(300, 300)
  .jpeg({ quality: 85 })
  .toBuffer()

const base64 = `data:image/jpeg;base64,${buffer.toString('base64')}`

const outputPath = resolve(__dirname, '..', 'src', 'assets', 'testPhoto.js')
writeFileSync(outputPath, `// Auto-generated test photo — do not edit manually\nexport default '${base64}'\n`)

console.log(`Done! Photo saved to src/assets/testPhoto.js (${Math.round(base64.length / 1024)} KB)`)

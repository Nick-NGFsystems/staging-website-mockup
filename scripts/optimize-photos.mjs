// One-off photo optimizer for Perrine Interiors staging shots.
// Mirrors the NGF portal's server-side pipeline: auto-rotate (EXIF),
// resize so neither dimension exceeds 1920px, convert to WebP q85.
//
// Reads raw AIV*.jpg from ./photo-originals (and repo root / public/images
// as a fallback), writes sequential staged-NN.webp into public/images/staged,
// and moves any raw originals out of the served public tree into
// ./photo-originals so they stop bloating the deploy.
//
// Run:  node scripts/optimize-photos.mjs
import sharp from 'sharp'
import { readdir, mkdir, rename, stat } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve('.')
const PUBLIC_IMAGES = path.join(ROOT, 'public', 'images')
const OUT_DIR = path.join(PUBLIC_IMAGES, 'staged')
const ORIGINALS_DIR = path.join(ROOT, 'photo-originals')
const MAX_DIM = 1920
const QUALITY = 85

const isRaw = (f) => /^AIV.*\.jpe?g$/i.test(f)

async function listRaw(dir) {
  if (!existsSync(dir)) return []
  const files = await readdir(dir)
  return files.filter(isRaw).map((f) => path.join(dir, f))
}

async function main() {
  await mkdir(OUT_DIR, { recursive: true })
  await mkdir(ORIGINALS_DIR, { recursive: true })

  // Collect raw files from all the places they currently sit.
  const sources = [
    ...(await listRaw(ORIGINALS_DIR)),
    ...(await listRaw(ROOT)),
    ...(await listRaw(PUBLIC_IMAGES)),
  ]
  // De-dupe by basename, preferring photo-originals copies.
  const byName = new Map()
  for (const p of sources) {
    const name = path.basename(p)
    if (!byName.has(name)) byName.set(name, p)
  }
  const ordered = [...byName.entries()].sort(([a], [b]) => a.localeCompare(b))

  if (ordered.length === 0) {
    console.log('No AIV*.jpg files found in photo-originals/, repo root, or public/images.')
    return
  }

  console.log(`Optimizing ${ordered.length} photos -> ${path.relative(ROOT, OUT_DIR)}\n`)
  let idx = 0
  let rawBytes = 0
  let webpBytes = 0

  for (const [name, src] of ordered) {
    idx += 1
    const num = String(idx).padStart(2, '0')
    const outName = `staged-${num}.webp`
    const outPath = path.join(OUT_DIR, outName)

    const meta = await sharp(src).metadata()
    const info = await sharp(src)
      .rotate() // honour EXIF orientation, then strip metadata
      .resize({ width: MAX_DIM, height: MAX_DIM, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: QUALITY })
      .toFile(outPath)

    const srcSize = (await stat(src)).size
    rawBytes += srcSize
    webpBytes += info.size

    console.log(
      `  ${name.padEnd(16)} ${meta.width}x${meta.height}  ` +
      `${(srcSize / 1e6).toFixed(1)}MB -> ${outName} ` +
      `${info.width}x${info.height} ${(info.size / 1024).toFixed(0)}KB`,
    )

    // Move the raw original out of any served location into photo-originals.
    const inServedTree = src.startsWith(PUBLIC_IMAGES) || path.dirname(src) === ROOT
    if (inServedTree) {
      const dest = path.join(ORIGINALS_DIR, name)
      if (src !== dest && !existsSync(dest)) await rename(src, dest)
      else if (src !== dest) await rename(src, path.join(ORIGINALS_DIR, `dup-${name}`))
    }
  }

  console.log(
    `\nDone. ${idx} photos: ${(rawBytes / 1e6).toFixed(0)}MB raw -> ` +
    `${(webpBytes / 1e6).toFixed(1)}MB webp ` +
    `(${(100 - (webpBytes / rawBytes) * 100).toFixed(1)}% smaller).`,
  )
  console.log(`Raw originals preserved in ${path.relative(ROOT, ORIGINALS_DIR)}/ (not served).`)
}

main().catch((e) => { console.error(e); process.exit(1) })

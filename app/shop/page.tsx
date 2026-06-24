import { getNgfContent, getItems } from '@/lib/ngf'
import Link from 'next/link'

export const metadata = {
  title: 'Shop With Us',
  description: 'Brand-new furniture and home accessories for sale from Perrine Interiors staging inventory.',
}

const DEFAULT_ITEMS = [
  { image: '/images/staged/staged-24.webp', name: 'Product name', price: 'Price', category: 'Living' },
  { image: '/images/staged/staged-20.webp', name: 'Product name', price: 'Price', category: 'Decor' },
  { image: '/images/staged/staged-19.webp', name: 'Product name', price: 'Price', category: 'Decor' },
  { image: '/images/staged/staged-16.webp', name: 'Product name', price: 'Price', category: 'Living' },
]

export default async function ShopPage() {
  const content = await getNgfContent()
  const items = getItems(content, 'shop.items')
  const products = (items.length > 0 ? items : DEFAULT_ITEMS) as Record<string, string>[]

  return (
    <>
      <section className="bg-bg-alt">
        <div className="mx-auto max-w-[1200px] px-5 pt-24 pb-14 md:pt-32 md:pb-16 text-center">
          <p className="eyebrow mb-5">Shop With Us</p>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-tight" data-ngf-field="shop.heroHeadline" data-ngf-label="Headline" data-ngf-type="text" data-ngf-section="Page Hero">
            {content['shop.heroHeadline'] || 'Furniture & Accessories for Sale'}
          </h1>
          <p className="text-muted max-w-[600px] mx-auto mt-5 text-[1.05rem]" data-ngf-field="shop.heroBody" data-ngf-label="Body" data-ngf-type="textarea" data-ngf-section="Page Hero">
            {content['shop.heroBody'] || 'Brand-new pieces from our staging inventory — available for immediate purchase. Inquire for dimensions, availability, and delivery.'}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3"
            data-ngf-group="shop.items"
            data-ngf-item-label="Product"
            data-ngf-min-items="0"
            data-ngf-max-items="60"
            data-ngf-item-fields='[{"key":"image","label":"Photo","type":"image","aspect":"4:5"},{"key":"name","label":"Name","type":"text"},{"key":"price","label":"Price","type":"text"},{"key":"category","label":"Category","type":"text"}]'
          >
            {products.map((p, i) => (
              <article key={i} id={(p.category || '').toLowerCase()} className="bg-white border border-line elevate scroll-mt-24">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={p.image || DEFAULT_ITEMS[i % DEFAULT_ITEMS.length].image}
                    alt={p.image_alt || p.name || `Product ${i + 1}`}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                    data-ngf-field={`shop.items.${i}.image`}
                    data-ngf-label="Photo"
                    data-ngf-type="image"
                    data-ngf-section="Shop"
                    data-ngf-aspect="4:5"
                  />
                </div>
                <div className="p-5 flex items-center justify-between gap-3">
                  <h3 className="font-serif text-lg" data-ngf-field={`shop.items.${i}.name`} data-ngf-label="Name" data-ngf-type="text" data-ngf-section="Shop">
                    {p.name || 'Product name'}
                  </h3>
                  <span className="text-[0.95rem] font-semibold" data-ngf-field={`shop.items.${i}.price`} data-ngf-label="Price" data-ngf-type="text" data-ngf-section="Shop">
                    {p.price || 'Price'}
                  </span>
                </div>
                <div className="px-5 pb-5">
                  <Link href="/contact" className="btn btn-outline w-full !min-h-[42px] !text-[0.72rem]">Inquire</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

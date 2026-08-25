import { getNgfContent, getItems } from '@/lib/ngf'
import { PageHero } from '@/components/PageHero'
import { Lightbox, ZoomImage } from '@/components/Lightbox'

export const metadata = {
  title: 'Shop',
  description: 'Browse brand-new furniture and home accessories available for purchase from Perrine Interiors.',
}

export default async function ShopPage() {
  const content = await getNgfContent()

  const items = getItems(content, 'shop.items')
  const defaultItems = items.length > 0
    ? items
    : [
        {
          image: '/images/staged/staged-24.webp',
          name: 'Product name',
          description: 'Add a product description here.',
          price: 'Price',
        },
        {
          image: '/images/staged/staged-20.webp',
          name: 'Product name',
          description: 'Add a product description here.',
          price: 'Price',
        },
        {
          image: '/images/staged/staged-19.webp',
          name: 'Product name',
          description: 'Add a product description here.',
          price: 'Price',
        },
      ]

  return (
    <main id="main-content">
      <PageHero
        prefix="shop"
        content={content}
        defaultImage="/images/staged/staged-17.webp"
        defaultEyebrow={'Shop'}
        defaultHeadline={'Furniture & Accessories For Sale'}
      />

      {/* ── Intro ── */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-[1120px] px-4">
          <p
            className="text-[1.05rem] text-[var(--muted)] max-w-[680px] mx-auto text-center leading-relaxed"
            data-ngf-field="shop.introCopy"
            data-ngf-label="Intro Copy"
            data-ngf-type="textarea"
            data-ngf-section="Shop Intro"
          >
            {content['shop.introCopy'] || 'These are brand-new pieces from our staging inventory — furniture and accessories that have never been used in a listing. Everything is available for immediate purchase. Inquire for dimensions, availability, and delivery options.'}
          </p>
        </div>
      </section>

      {/* ── Shop Grid ── */}
      <section className="pb-16 md:pb-24">
        <div className="mx-auto max-w-[1120px] px-4">
          <Lightbox>
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ngf-group="shop.items"
            data-ngf-item-fields='[{"key":"image","label":"Product Image","type":"image"},{"key":"name","label":"Item Name","type":"text"},{"key":"description","label":"Description","type":"textarea"},{"key":"price","label":"Price","type":"text"}]'
          >
            {defaultItems.map((item, i) => (
              <div
                key={i}
                className="bg-white border border-[var(--line)] rounded-[14px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                <ZoomImage
                  src={item.image || '/images/staged/staged-24.webp'}
                  alt={content[`shop.items.${i}.image_alt`] || item.name || `Product ${i + 1}`}
                  className="w-full aspect-[4/3] object-cover"
                  ngfField={`shop.items.${i}.image`}
                  ngfLabel="Product Image"
                  ngfSection="Shop"
                  ngfAspect="4:3"
                />
                <div className="p-5">
                  <h3
                    className="font-serif text-lg mb-1.5"
                    data-ngf-field={`shop.items.${i}.name`}
                    data-ngf-label="Item Name"
                    data-ngf-type="text"
                    data-ngf-section="Shop"
                  >
                    {item.name || `Item ${i + 1}`}
                  </h3>
                  <p
                    className="text-[var(--muted)] text-sm leading-relaxed mb-3"
                    data-ngf-field={`shop.items.${i}.description`}
                    data-ngf-label="Description"
                    data-ngf-type="textarea"
                    data-ngf-section="Shop"
                  >
                    {item.description || 'Description coming soon.'}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[var(--brand)] font-bold text-lg"
                      data-ngf-field={`shop.items.${i}.price`}
                      data-ngf-label="Price"
                      data-ngf-type="text"
                      data-ngf-section="Shop"
                    >
                      {item.price || 'Price on request'}
                    </span>
                    <a
                      href="/contact"
                      className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-[var(--brand)] text-white text-sm font-semibold hover:bg-[var(--brand-dark)] transition-colors min-h-[44px]"
                    >
                      Inquire
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          </Lightbox>
        </div>
      </section>
    </main>
  )
}

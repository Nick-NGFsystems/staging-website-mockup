import { getNgfContent, getItems } from '@/lib/ngf'

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
      {/* ── Hero ── */}
      <section
        className="relative min-h-[42vh] bg-cover bg-center flex items-center text-white"
        style={{ backgroundImage: `url('${content['shop.heroImage'] || '/images/staged/staged-17.webp'}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.2)]" />
        <div className="relative z-10 mx-auto w-full max-w-[1120px] px-4 max-w-[760px]">
          <p
            className="inline-block text-[0.82rem] tracking-[0.08em] uppercase text-[#ffffff] mb-3"
            data-ngf-field="shop.heroEyebrow"
            data-ngf-label="Eyebrow"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            {content['shop.heroEyebrow'] || 'Shop'}
          </p>
          <h1
            className="font-serif text-[clamp(2rem,4vw,3.5rem)]"
            data-ngf-field="shop.heroHeadline"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            {content['shop.heroHeadline'] || 'Furniture & Accessories For Sale'}
          </h1>
        </div>
      </section>

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
                <img
                  src={item.image || '/images/staged/staged-24.webp'}
                  alt={item.name || `Product ${i + 1}`}
                  className="w-full aspect-[4/3] object-cover"
                  data-ngf-field={`shop.items.${i}.image`}
                  data-ngf-label="Product Image"
                  data-ngf-type="image"
                  data-ngf-section="Shop"
                  data-ngf-aspect="4:3"
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
        </div>
      </section>
    </main>
  )
}

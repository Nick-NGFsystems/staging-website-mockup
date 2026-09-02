import { PARTNER_ITEM_FIELDS, type Partner } from '@/lib/team'

/**
 * Trusted partners — vendors and collaborators, shown smaller than the team
 * cards: logo, contact name, company, then phone and website.
 *
 * Every field renders even when empty so the client can fill it from the
 * portal; the blank ones are hidden on the live site by the same
 * `.detail-row:has(dd:empty)` treatment used on project pages.
 */
export function TrustedPartners({ partners }: { partners: Partner[] }) {
  return (
    <div
      className="grid gap-x-6 gap-y-10 grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      data-ngf-group="partners.items"
      data-ngf-item-label="Partner"
      data-ngf-min-items="0"
      data-ngf-max-items="24"
      data-ngf-item-fields={PARTNER_ITEM_FIELDS}
    >
      {partners.map(p => (
        <article key={p.index} className="text-center">
          <div className="mx-auto w-full max-w-[140px] aspect-square overflow-hidden bg-[#f4f4f4]">
            <img
              src={p.logo}
              alt={p.company || p.name || 'Partner'}
              data-ngf-field={`partners.items.${p.index}.logo`}
              data-ngf-label="Logo / Photo"
              data-ngf-type="image"
              data-ngf-section="Trusted Partners"
              data-ngf-aspect="1:1"
              className="w-full h-full object-cover"
            />
          </div>

          <h3
            className="font-serif text-[1.05rem] mt-4"
            data-ngf-field={`partners.items.${p.index}.company`}
            data-ngf-label="Company"
            data-ngf-type="text"
            data-ngf-section="Trusted Partners"
          >
            {p.company}
          </h3>

          <p
            className="mt-1 text-[0.72rem] uppercase tracking-[0.14em] text-[var(--muted)] min-h-[1em]"
            data-ngf-field={`partners.items.${p.index}.name`}
            data-ngf-label="Contact Name"
            data-ngf-type="text"
            data-ngf-section="Trusted Partners"
          >
            {p.name}
          </p>

          <p className="detail-row mt-3">
            <span
              className="block text-[0.85rem]"
              data-ngf-field={`partners.items.${p.index}.phone`}
              data-ngf-label="Phone Number"
              data-ngf-type="text"
              data-ngf-section="Trusted Partners"
            >
              {p.phone}
            </span>
          </p>

          {p.website ? (
            <a
              href={p.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-1 text-[0.85rem] border-b border-[var(--ink)] pb-0.5 hover:opacity-60 transition-opacity"
              data-ngf-field={`partners.items.${p.index}.website`}
              data-ngf-label="Website"
              data-ngf-type="text"
              data-ngf-section="Trusted Partners"
            >
              Visit Website
            </a>
          ) : (
            <span
              className="sr-only"
              data-ngf-field={`partners.items.${p.index}.website`}
              data-ngf-label="Website"
              data-ngf-type="text"
              data-ngf-section="Trusted Partners"
            />
          )}
        </article>
      ))}
    </div>
  )
}

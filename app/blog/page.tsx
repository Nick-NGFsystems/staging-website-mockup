import { getNgfContent, getItems } from '@/lib/ngf'
import Link from 'next/link'

export const metadata = {
  title: 'Blog',
  description: 'Home staging tips and home remedy ideas from Perrine Interiors.',
}

const DEFAULT_POSTS = [
  { image: '/images/staged/staged-06.webp', title: 'Blog post title', summary: 'Add a short summary of this post here.', link: '#' },
  { image: '/images/staged/staged-13.webp', title: 'Blog post title', summary: 'Add a short summary of this post here.', link: '#' },
  { image: '/images/staged/staged-19.webp', title: 'Blog post title', summary: 'Add a short summary of this post here.', link: '#' },
]

export default async function BlogPage() {
  const content = await getNgfContent()
  const items = getItems(content, 'blog.posts')
  const posts = (items.length > 0 ? items : DEFAULT_POSTS) as Record<string, string>[]

  return (
    <>
      <section className="bg-bg-alt">
        <div className="mx-auto max-w-[1200px] px-5 pt-24 pb-14 md:pt-32 md:pb-16 text-center">
          <p className="eyebrow mb-5">The Journal</p>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] leading-tight" data-ngf-field="blog.heroHeadline" data-ngf-label="Headline" data-ngf-type="text" data-ngf-section="Page Hero">
            {content['blog.heroHeadline'] || 'Staging tips & home remedies'}
          </h1>
        </div>
      </section>

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1200px] px-5">
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
            data-ngf-group="blog.posts"
            data-ngf-item-label="Post"
            data-ngf-min-items="0"
            data-ngf-max-items="60"
            data-ngf-item-fields='[{"key":"image","label":"Cover","type":"image","aspect":"3:2"},{"key":"title","label":"Title","type":"text"},{"key":"summary","label":"Summary","type":"textarea"},{"key":"link","label":"Link","type":"text"}]'
          >
            {posts.map((p, i) => (
              <article key={i} className="bg-white border border-line elevate">
                <div className="aspect-[3/2] overflow-hidden">
                  <img
                    src={p.image || DEFAULT_POSTS[i % DEFAULT_POSTS.length].image}
                    alt={p.image_alt || p.title || `Post ${i + 1}`}
                    className="w-full h-full object-cover"
                    data-ngf-field={`blog.posts.${i}.image`}
                    data-ngf-label="Cover"
                    data-ngf-type="image"
                    data-ngf-section="Blog"
                    data-ngf-aspect="3:2"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-serif text-lg mb-2" data-ngf-field={`blog.posts.${i}.title`} data-ngf-label="Title" data-ngf-type="text" data-ngf-section="Blog">
                    {p.title || 'Blog post title'}
                  </h2>
                  <p className="text-muted text-sm leading-relaxed mb-4" data-ngf-field={`blog.posts.${i}.summary`} data-ngf-label="Summary" data-ngf-type="textarea" data-ngf-section="Blog">
                    {p.summary || ''}
                  </p>
                  <Link href={p.link || '#'} className="text-[0.74rem] font-semibold uppercase tracking-[0.12em] hover:text-accent">Read More →</Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

import { getNgfContent, getItems } from '@/lib/ngf'

export const metadata = {
  title: 'Blog',
  description: 'Home edit tips, staging insights, and real estate advice from the Perrine Interiors team.',
}

export default async function BlogPage() {
  const content = await getNgfContent()

  const posts = getItems(content, 'blog.posts')
  const defaultPosts = posts.length > 0
    ? posts
    : [
        {
          image: '/placeholder-blog-1.jpg',
          title: 'Blog post title',
          summary: 'Add a short summary of this post here.',
          link: '#',
        },
        {
          image: '/placeholder-blog-2.jpg',
          title: 'Blog post title',
          summary: 'Add a short summary of this post here.',
          link: '#',
        },
        {
          image: '/placeholder-blog-3.jpg',
          title: 'Blog post title',
          summary: 'Add a short summary of this post here.',
          link: '#',
        },
      ]

  return (
    <main id="main-content">
      {/* ── Hero ── */}
      <section
        className="relative min-h-[42vh] bg-cover bg-center flex items-center text-white"
        style={{ backgroundImage: `url('${content['blog.heroImage'] || '/placeholder-hero.jpg'}')` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-[rgba(12,28,25,0.8)] to-[rgba(12,28,25,0.25)]" />
        <div className="relative z-10 mx-auto w-full max-w-[1120px] px-4 max-w-[760px]">
          <p
            className="inline-block text-[0.82rem] tracking-[0.08em] uppercase text-[#f5d9a6] mb-3"
            data-ngf-field="blog.heroEyebrow"
            data-ngf-label="Eyebrow"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            {content['blog.heroEyebrow'] || 'Blog'}
          </p>
          <h1
            className="font-serif text-[clamp(2rem,4vw,3.5rem)]"
            data-ngf-field="blog.heroHeadline"
            data-ngf-label="Headline"
            data-ngf-type="text"
            data-ngf-section="Page Hero"
          >
            {content['blog.heroHeadline'] || 'Home Edit Tips & Insights'}
          </h1>
        </div>
      </section>

      {/* ── Blog Grid ── */}
      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1120px] px-4">
          <div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            data-ngf-group="blog.posts"
            data-ngf-item-fields='[{"key":"image","label":"Cover Image","type":"image"},{"key":"title","label":"Title","type":"text"},{"key":"summary","label":"Summary","type":"textarea"},{"key":"link","label":"Post Link","type":"text"}]'
          >
            {defaultPosts.map((post, i) => (
              <div
                key={i}
                className="bg-white border border-[var(--line)] rounded-[14px] overflow-hidden shadow-[0_12px_28px_rgba(0,0,0,0.08)]"
              >
                <img
                  src={post.image || '/placeholder-blog.jpg'}
                  alt={post.title || `Blog Post ${i + 1}`}
                  className="w-full aspect-[16/9] object-cover"
                  data-ngf-field={`blog.posts.${i}.image`}
                  data-ngf-label="Cover Image"
                  data-ngf-type="image"
                  data-ngf-section="Blog"
                />
                <div className="p-5">
                  <h2
                    className="font-serif text-lg mb-2 leading-snug"
                    data-ngf-field={`blog.posts.${i}.title`}
                    data-ngf-label="Title"
                    data-ngf-type="text"
                    data-ngf-section="Blog"
                  >
                    {post.title || `Blog Post ${i + 1}`}
                  </h2>
                  <p
                    className="text-[var(--muted)] text-sm leading-relaxed mb-4"
                    data-ngf-field={`blog.posts.${i}.summary`}
                    data-ngf-label="Summary"
                    data-ngf-type="textarea"
                    data-ngf-section="Blog"
                  >
                    {post.summary || 'Coming soon.'}
                  </p>
                  <a
                    href={post.link || '#'}
                    className="inline-flex items-center text-[var(--brand)] text-sm font-semibold hover:underline min-h-[44px]"
                    data-ngf-field={`blog.posts.${i}.link`}
                    data-ngf-label="Post Link"
                    data-ngf-type="text"
                    data-ngf-section="Blog"
                  >
                    Read Article →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}

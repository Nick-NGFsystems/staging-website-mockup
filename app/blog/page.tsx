import { getNgfContent, getItems } from '@/lib/ngf'
import { PageHero } from '@/components/PageHero'

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
          image: '/images/staged/staged-14.webp',
          title: 'Blog post title',
          summary: 'Add a short summary of this post here.',
          link: '#',
        },
        {
          image: '/images/staged/staged-15.webp',
          title: 'Blog post title',
          summary: 'Add a short summary of this post here.',
          link: '#',
        },
        {
          image: '/images/staged/staged-17.webp',
          title: 'Blog post title',
          summary: 'Add a short summary of this post here.',
          link: '#',
        },
      ]

  return (
    <main id="main-content">
      <PageHero
        prefix="blog"
        content={content}
        defaultImage="/images/staged/staged-02.webp"
        defaultEyebrow={'Blog'}
        defaultHeadline={'Home Edit Tips & Insights'}
      />

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
                className="bg-white border border-[var(--line)] rounded-[14px] overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.04)]"
              >
                <img
                  src={post.image || '/images/staged/staged-23.webp'}
                  alt={content[`blog.posts.${i}.image_alt`] || post.title || `Blog Post ${i + 1}`}
                  className="w-full aspect-[16/9] object-cover"
                  data-ngf-field={`blog.posts.${i}.image`}
                  data-ngf-label="Cover Image"
                  data-ngf-type="image"
                  data-ngf-section="Blog"
                  data-ngf-aspect="3:2"
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
                    Read Article
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

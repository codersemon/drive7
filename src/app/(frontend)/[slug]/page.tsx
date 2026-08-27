import { pageMetadata, renderPage } from '@/components/layout/RenderPage'
import { getAllPageSlugs } from '@/lib/payload'

type Args = { params: Promise<{ slug: string }> }

export const generateStaticParams = async () => {
  const slugs = await getAllPageSlugs()
  return slugs.filter((slug) => slug !== 'home').map((slug) => ({ slug }))
}

export const generateMetadata = async ({ params }: Args) => {
  const { slug } = await params
  return pageMetadata(slug)
}

const DynamicPage = async ({ params }: Args) => {
  const { slug } = await params
  return renderPage(slug)
}

export default DynamicPage

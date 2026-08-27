import { renderPage, pageMetadata } from '@/components/layout/RenderPage'

export const generateMetadata = () => pageMetadata('home')

const HomePage = () => renderPage('home')

export default HomePage

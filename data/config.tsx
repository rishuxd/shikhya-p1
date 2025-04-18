import { Link } from '@saas-ui/react'
import { NextSeoProps } from 'next-seo'
import { FaGithub, FaTwitter } from 'react-icons/fa'

import { Logo } from './logo'

const siteConfig = {
  logo: Logo,
  seo: {
    title: 'Saas AI',
    description: 'The React component library for startups',
  } as NextSeoProps,
  termsUrl: '#',
  privacyUrl: '#',
  header: {
    links: [
      {
        id: 'features',
        label: 'Features',
      },
      {
        id: 'workflow',
        label: 'Workflow',
      },
      {
        id: 'demo',
        label: 'Demo',
        variant: 'primary',
      },
    ],
  },
  footer: {
    copyright: (
      <>
        Built by{' '}
        <Link href="https://www.linkedin.com/in/jyotiswaroop-srivastava/">
          Shiksha Upanita
        </Link>
      </>
    ),
    links: [
      {
        href: 'mailto:srivastavjyotiswaroop@gmail.com',
        label: 'Contact',
      },
      {
        href: 'https://x.com/xd_rishu',
        label: <FaTwitter size="14" />,
      },
      {
        href: 'https://github.com/rishuxd',
        label: <FaGithub size="14" />,
      },
    ],
  },
}

export default siteConfig

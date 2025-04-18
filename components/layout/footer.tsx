import {
  Box,
  BoxProps,
  Container,
  Flex,
  HStack,
  SimpleGrid,
  Stack,
  Tag,
  Text,
  Wrap,
} from '@chakra-ui/react'
import { transparentize } from '@chakra-ui/theme-tools'
import { Link, LinkProps } from '@saas-ui/react'

import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from '#components/highlights'
import siteConfig from '#data/config'
import { theme } from '#theme'

export interface FooterProps extends BoxProps {
  columns?: number
}

export const Footer: React.FC<FooterProps> = (props) => {
  const { columns = 2, ...rest } = props
  return (
    <Box
      bg="white"
      _light={{
        bgGradient(theme) {
          return `linear(to-b, ${theme.colors.white} 0%, ${theme.colors.gray[300]} 80%)`
        },
      }}
      _dark={{ bg: 'gray.900' }}
      {...rest}
    >
      <HighlightsSection />
      <Container maxW="container.2xl" px="8" py="8">
        <SimpleGrid columns={columns}>
          <Stack spacing="8">
            <Copyright>{siteConfig.footer.copyright}</Copyright>
          </Stack>
          <HStack justify="flex-end" spacing="4" alignSelf="flex-end">
            {siteConfig.footer?.links?.map(({ href, label }) => (
              <FooterLink key={href} href={href}>
                {label}
              </FooterLink>
            ))}
          </HStack>
        </SimpleGrid>
      </Container>
    </Box>
  )
}

export interface CopyrightProps {
  title?: React.ReactNode
  children: React.ReactNode
}

export const Copyright: React.FC<CopyrightProps> = ({
  title,
  children,
}: CopyrightProps) => {
  let content
  if (title && !children) {
    content = `&copy; ${new Date().getFullYear()} - ${title}`
  }
  return (
    <Text color="gray.700" fontSize="md" _dark={{ color: 'whiteAlpha.700' }}>
      {content || children}
    </Text>
  )
}

export const FooterLink: React.FC<LinkProps> = (props) => {
  const { children, ...rest } = props
  return (
    <Link
      _dark={{
        color: 'whiteAlpha.700',
      }}
      color="gray.700"
      fontSize="md"
      textDecoration="none"
      _hover={{
        color: 'gray.900',
        transition: 'color .2s ease-in',
      }}
      {...rest}
    >
      {children}
    </Link>
  )
}

const HighlightsSection = () => {
  return (
    <Highlights zIndex={9} p={8}>
      <HighlightsTestimonialItem
        border={0}
        name="Shiksha Upanita"
        description="Founder"
        avatar="/static/images/avatar.jpg"
        gradient={['pink.200', 'purple.500']}
      >
        “A creative coder passionate about making ideas come to life. I worked
        on the front-end design and system integration for this project.”
      </HighlightsTestimonialItem>
      <HighlightsTestimonialItem
        border={0}
        name="Deepika Singh"
        description="Founder"
        avatar="/static/images/avatar.jpg"
        gradient={['pink.200', 'purple.500']}
      >
        “A tech enthusiast who loves turning ideas into real-world solutions. I
        built and trained the detection model for this project.”
      </HighlightsTestimonialItem>

      <HighlightsItem p="0" border={0}>
        <Box
          p="8"
          bgGradient={`linear(to-br, ${transparentize(
            'pink.200',
            0.8,
          )(theme)}, ${transparentize('purple.500', 0.8)(theme)})`}
        >
          <Wrap>
            {[
              'authentication',
              'navigation',
              'crud',
              'settings',
              'multi-tenancy',
              'layouts',
              'billing',
              'a11y testing',
              'server-side rendering',
              'documentation',
              'onboarding',
              'storybooks',
              'testing',
              'design system',
            ].map((value) => (
              <Tag
                key={value}
                variant="subtle"
                colorScheme="purple"
                rounded="full"
                px="3"
                _dark={{
                  bg: 'whiteAlpha.300',
                }}
              >
                {value}
              </Tag>
            ))}
          </Wrap>
        </Box>
      </HighlightsItem>
    </Highlights>
  )
}

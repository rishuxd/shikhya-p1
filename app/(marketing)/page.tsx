'use client'

import {
  Box,
  Container,
  HStack,
  Heading,
  Icon,
  Tag,
  Text,
  Wrap,
  theme,
} from '@chakra-ui/react'
import { transparentize } from '@chakra-ui/theme-tools'
import { Br, Link } from '@saas-ui/react'
import type { Metadata, NextPage } from 'next'
import Image from 'next/image'
import {
  FiActivity,
  FiArrowRight,
  FiBarChart2,
  FiBox,
  FiCode,
  FiEye,
  FiFlag,
  FiHash,
  FiLock,
  FiSearch,
  FiTerminal,
  FiToggleLeft,
  FiTrendingUp,
  FiUserPlus,
} from 'react-icons/fi'

import * as React from 'react'

import { ButtonLink } from '#components/button-link/button-link'
import Upload from '#components/custom/upload'
import { Features } from '#components/features'
import { BackgroundGradient } from '#components/gradients/background-gradient'
import { Hero } from '#components/hero'
import {
  Highlights,
  HighlightsItem,
  HighlightsTestimonialItem,
} from '#components/highlights'
import { ChakraLogo, NextjsLogo } from '#components/logos'
import { FallInPlace } from '#components/motion/fall-in-place'
import { Section } from '#components/section'
import { Em } from '#components/typography'

const Home: NextPage = () => {
  return (
    <Box>
      <HeroSection />

      <HighlightsSection />

      <ScrollingCardsSection />

      <FeaturesSection />

      <PricingSection />
    </Box>
  )
}

const HeroSection: React.FC = () => {
  return (
    <Box position="relative" overflow="hidden">
      <BackgroundGradient height="100%" zIndex="-1" />
      <Hero
        id="home"
        px="0"
        mt={20}
        w="100%"
        title={
          <FallInPlace delay={0.2}>
            Label beautifully, faster & efficiently
          </FallInPlace>
        }
        description={
          <FallInPlace delay={0.4}>
            Imagine a system that can intelligently scan video frames, instantly{' '}
            <Em>identifying and labeling object with precision</Em>, that&apos;s
            us.
          </FallInPlace>
        }
      >
        <FallInPlace delay={0.8}>
          <HStack pt="4" pb="12" spacing="8" flex="1" justifyContent="center">
            <NextjsLogo height="28px" /> <ChakraLogo height="20px" />
          </HStack>

          <Box textAlign={'center'}>
            <ButtonLink
              colorScheme="primary"
              size="md"
              href="/signup"
              rightIcon={
                <Icon
                  as={FiArrowRight}
                  sx={{
                    transitionProperty: 'common',
                    transitionDuration: 'normal',
                    '.chakra-button:hover &': {
                      transform: 'translate(5px)',
                    },
                  }}
                />
              }
            >
              View Demo
            </ButtonLink>
          </Box>
        </FallInPlace>
      </Hero>

      <Box
        height="300px"
        position="relative"
        width="80vw"
        maxW="800px"
        margin="0 auto"
        marginBottom="20"
        display="flex"
      >
        <FallInPlace delay={1} width="100%">
          <Box
            overflow="hidden"
            height="100%"
            width="100%" // Add width 100%
            borderRadius="3xl"
            borderWidth="1px"
            display="flex" // Add display flex
          >
            <video
              src="/static/videos/demo.mp4"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
              autoPlay
              muted
              loop
              playsInline
            />
          </Box>
        </FallInPlace>
      </Box>

      <Features
        id="benefits"
        columns={[1, 2, 4]}
        iconSize={4}
        innerWidth="container.xl"
        pt="20"
        features={[
          {
            title: 'Detection',
            icon: FiEye,
            description:
              'Real-time object detection powered by AI models like YOLO and ViT, identifying people, vehicles, and more.',
            iconPosition: 'left',
            delay: 0.6,
          },
          {
            title: 'Tracking',
            icon: FiActivity,
            description:
              'Seamlessly track multiple objects across frames with DeepSORT or ByteTrack integration for robust tracking.',
            iconPosition: 'left',
            delay: 0.8,
          },
          {
            title: 'Counting',
            icon: FiHash,
            description:
              'Automated object counting with entry-exit logic, heatmaps, and timeline-based stats for actionable insights.',
            iconPosition: 'left',
            delay: 1,
          },
          {
            title: 'Analytics',
            icon: FiBarChart2,
            description:
              'Advanced analytics dashboard to visualize trends, hotspots, and performance metrics using collected data.',
            iconPosition: 'left',
            delay: 1.1,
          },
        ]}
        reveal={FallInPlace}
      />
    </Box>
  )
}

const HighlightsSection = () => {
  return (
    <Highlights py="10">
      <HighlightsTestimonialItem
        name="Shiksha Upanita"
        description="Founder"
        avatar="/static/images/avatar.jpg"
        gradient={['pink.200', 'purple.500']}
      >
        “A creative coder passionate about making ideas come to life. I worked
        on the front-end design and system integration for this project.”
      </HighlightsTestimonialItem>
      <HighlightsTestimonialItem
        name="Deepika Singh"
        description="Founder"
        avatar="/static/images/avatar.jpg"
        gradient={['pink.200', 'purple.500']}
      >
        “A tech enthusiast who loves turning ideas into real-world solutions. I
        built and trained the detection model for this project.”
      </HighlightsTestimonialItem>

      <HighlightsItem p="0">
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
              'theming',
              'upselling',
              'unit testing',
              'feature flags',
              'responsiveness',
            ].map((value) => (
              <Tag
                key={value}
                variant="subtle"
                colorScheme="purple"
                rounded="full"
                px="3"
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

const ScrollingCardsSection = () => {
  const cards1 = [
    {
      image:
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5/6014a86f90820a0a00294a0a_banking_counterfeit.webp',
      title: 'Banking',
    },
    {
      image:
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5/621d0e6d09c583009d2a0805_aerospace-defence_locate.webp',
      title: 'Aerospace Defense',
    },
    {
      image:
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5/62193badc0fb0c21f13849bd_gov_security.webp',
      title: 'Security',
    },
    {
      image:
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5/621941d82071179b3ea316e9_gov_training.webp',
      title: 'Government',
    },
    {
      image:
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5/62195375e572c8f559fbed94_automotive_visual.webp',
      title: 'Automotive',
    },
    {
      image:
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5/60392b8e66f4e79e79c05cbf_ecommerce_01.webp',
      title: 'Retail',
    },
  ]
  const cards2 = [
    {
      image:
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5/5f792ff0cc9e36516de2dbeb_ag_plantid.webp',
      title: 'Agriculture',
    },
    {
      image:
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5/60494c3303fc9481ca8e1375_utilities_02.webp',
      title: 'Utilities',
    },
    {
      image:
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5/601ef8cf39161b731ae80935_manufacturing_01.webp',
      title: 'Telecommunications',
    },
    {
      image:
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5/601ef8cf8ea93152314013ba_manufacturing_02.webp',
      title: 'Oil and Gas',
    },
    {
      image:
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5/5f8c488839466a6895ca07f6_healthcare_ppe.webp',
      title: 'Healthcare',
    },
    {
      image:
        'https://cdn.prod.website-files.com/5f6bc60e665f54545a1e52a5/601ef8cf9e66851919ce0b54_manufacturing_problem.webp',
      title: 'Manufacturing',
    },
  ]

  // Duplicate cards for infinite scroll effect
  const duplicatedCards1 = [...cards1, ...cards1]
  const duplicatedCards2 = [...cards2, ...cards2]

  return (
    <Box py="28">
      <Container maxW="full">
        <Box
          overflow="hidden" // Change from overflowX to overflow
          position="relative"
        >
          {/* First row with animation from right to left */}
          <Box
            css={{
              '@keyframes scrollLeft': {
                '0%': { transform: 'translateX(0)' },
                '100%': { transform: 'translateX(-50%)' },
              },
              animation: 'scrollLeft 30s linear infinite',
            }}
            w="max-content"
            paddingBottom={8}
          >
            <HStack spacing={6}>
              {duplicatedCards1.map((card, index) => (
                <Box
                  key={index}
                  flex="0 0 auto"
                  w={['250px', '300px', '400px']}
                  h="200px"
                  borderRadius="lg"
                  overflow="hidden"
                  position="relative"
                  boxShadow="md"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <Box
                    position="absolute"
                    bottom="0"
                    bg="rgba(0, 0, 0, 0.4)"
                    color="white"
                    p={4}
                    w="100%"
                  >
                    <Text>{card.title}</Text>
                  </Box>
                </Box>
              ))}
            </HStack>
          </Box>

          {/* Second row with animation from left to right */}
          <Box
            css={{
              '@keyframes scrollRight': {
                '0%': { transform: 'translateX(-50%)' },
                '100%': { transform: 'translateX(0)' },
              },
              animation: 'scrollRight 30s linear infinite',
            }}
            w="max-content"
          >
            <HStack spacing={6}>
              {duplicatedCards2.map((card, index) => (
                <Box
                  key={index}
                  flex="0 0 auto"
                  w={['250px', '300px', '400px']}
                  h="200px"
                  borderRadius="lg"
                  overflow="hidden"
                  position="relative"
                  boxShadow="md"
                >
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <Box
                    position="absolute"
                    bottom="0"
                    bg="rgba(0, 0, 0, 0.4)"
                    color="white"
                    p={4}
                    w="100%"
                  >
                    <Text>{card.title}</Text>
                  </Box>
                </Box>
              ))}
            </HStack>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}

const FeaturesSection = () => {
  return (
    <Features
      pt="8"
      pb="36"
      id="features"
      title={
        <Heading
          lineHeight="short"
          fontSize={['2xl', null, '4xl']}
          textAlign="left"
          as="p"
        >
          Not your standard
          <Br /> dashboard template.
        </Heading>
      }
      description={
        <>
          Saas UI Pro includes everything you need to build modern frontends.
          <Br />
          Use it as a template for your next product or foundation for your
          design system.
        </>
      }
      align="left"
      columns={[1, 2, 3]}
      iconSize={4}
      features={[
        {
          title: '#components.',
          icon: FiBox,
          description:
            'All premium components are available on a private NPM registery, no more copy pasting and always up-to-date.',
          variant: 'inline',
        },
        {
          title: 'Starterkits.',
          icon: FiLock,
          description:
            'Example apps in Next.JS, Electron. Including authentication, billing, example pages, everything you need to get started FAST.',
          variant: 'inline',
        },
        {
          title: 'Documentation.',
          icon: FiSearch,
          description:
            'Extensively documented, including storybooks, best practices, use-cases and examples.',
          variant: 'inline',
        },
        {
          title: 'Onboarding.',
          icon: FiUserPlus,
          description:
            'Add user onboarding flows, like tours, hints and inline documentation without breaking a sweat.',
          variant: 'inline',
        },
        {
          title: 'Feature flags.',
          icon: FiFlag,
          description:
            "Implement feature toggles for your billing plans with easy to use hooks. Connect Flagsmith, or other remote config services once you're ready.",
          variant: 'inline',
        },
        {
          title: 'Upselling.',
          icon: FiTrendingUp,
          description:
            '#components and hooks for upgrade flows designed to make upgrading inside your app frictionless.',
          variant: 'inline',
        },
        {
          title: 'Themes.',
          icon: FiToggleLeft,
          description:
            'Includes multiple themes with darkmode support, always have the perfect starting point for your next project.',
          variant: 'inline',
        },
        {
          title: 'Generators.',
          icon: FiTerminal,
          description:
            'Extend your design system while maintaininig code quality and consistency with built-in generators.',
          variant: 'inline',
        },
        {
          title: 'Monorepo.',
          icon: FiCode,
          description: (
            <>
              All code is available as packages in a high-performance{' '}
              <Link href="https://turborepo.com">Turborepo</Link>, you have full
              control to modify and adjust it to your workflow.
            </>
          ),
          variant: 'inline',
        },
      ]}
    />
  )
}

const PricingSection = () => {
  return (
    <Section id="pricing" pos="relative">
      <BackgroundGradient height="100%" />
      <Box zIndex="2" pos="relative">
        <Text fontSize={'4xl'} fontWeight="bold" textAlign={'center'} mb="4">
          Upload Files
        </Text>
        <Text fontSize="lg" color="muted" textAlign={'center'} mb="8">
          Once the files are uploaded to the server, they are processed through
          trained <Em>YOLOv8</Em> for annotations and <Em>DeepSORT</Em> for
          real-time tracking throughout frames. Once processing is complete, the
          annotated data is securely stored in the database and displayed below
          for visualization and review.
        </Text>
        <Upload />
      </Box>
    </Section>
  )
}

export default Home

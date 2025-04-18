import {
  Box,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  useColorMode,
  useDisclosure,
} from '@chakra-ui/react'

import { useState } from 'react'

export function HeroVideoDialogDemo() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { colorMode } = useColorMode()

  const lightThumbnail =
    'https://startup-template-sage.vercel.app/hero-light.png'
  const darkThumbnail = 'https://startup-template-sage.vercel.app/hero-dark.png'
  const videoSrc =
    'https://www.youtube.com/embed/qh3NGpYRG3I?si=4rb-zSdDkVK9qxxb'

  return (
    <Box position="relative">
      {/* Thumbnail image that opens the modal */}
      <Image
        src={colorMode === 'dark' ? darkThumbnail : lightThumbnail}
        alt="Hero Video"
        cursor="pointer"
        onClick={onOpen}
        width="100%"
      />

      {/* Modal that will contain the video when opened */}
      <Modal isOpen={isOpen} onClose={onClose} size="xl" isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton zIndex="10" />
          <ModalBody p="0">
            <Box
              as="iframe"
              src={videoSrc}
              width="100%"
              height="500px"
              title="YouTube video"
              allowFullScreen
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

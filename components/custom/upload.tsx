'use client'

import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  Icon,
  Input,
  Progress,
  Stack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import axios, { AxiosProgressEvent, CancelTokenSource } from 'axios'
import { useDropzone } from 'react-dropzone'
import {
  FiActivity,
  FiFileText,
  FiFolder,
  FiImage,
  FiUploadCloud,
  FiVideo,
  FiX,
} from 'react-icons/fi'

import { useCallback, useState } from 'react'

interface FileUploadProgress {
  progress: number
  File: File
  source: CancelTokenSource | null
}

interface StatusMessage {
  type: 'success' | 'error'
  message: string
}

enum FileTypes {
  Image = 'image',
  Pdf = 'pdf',
  Audio = 'audio',
  Video = 'video',
  Other = 'other',
}

const ImageColor = {
  bgColor: 'purple.600',
  fillColor: 'purple.600',
}

const PdfColor = {
  bgColor: 'blue.400',
  fillColor: 'blue.400',
}

const AudioColor = {
  bgColor: 'yellow.400',
  fillColor: 'yellow.400',
}

const VideoColor = {
  bgColor: 'green.400',
  fillColor: 'green.400',
}

const OtherColor = {
  bgColor: 'gray.400',
  fillColor: 'gray.400',
}

export default function Upload() {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileToUpload, setFileToUpload] = useState<FileUploadProgress | null>(
    null,
  )
  const [statusMessage, setStatusMessage] = useState<StatusMessage | null>(null)

  const bgColor = useColorModeValue('gray.50', 'gray.700')
  const hoverBgColor = useColorModeValue('gray.100', 'gray.600')
  const borderColor = useColorModeValue('gray.300', 'gray.600')
  const mutedTextColor = useColorModeValue('gray.600', 'gray.400')
  const mutedTextColorLight = useColorModeValue('gray.500', 'gray.500')

  const getFileIconAndColor = (file: File) => {
    if (file.type.includes(FileTypes.Image)) {
      return {
        icon: <Icon as={FiImage} boxSize={10} color={ImageColor.fillColor} />,
        color: ImageColor.bgColor,
      }
    }

    if (file.type.includes(FileTypes.Pdf)) {
      return {
        icon: <Icon as={FiFileText} boxSize={10} color={PdfColor.fillColor} />,
        color: PdfColor.bgColor,
      }
    }

    if (file.type.includes(FileTypes.Audio)) {
      return {
        icon: (
          <Icon as={FiActivity} boxSize={10} color={AudioColor.fillColor} />
        ),
        color: AudioColor.bgColor,
      }
    }

    if (file.type.includes(FileTypes.Video)) {
      return {
        icon: <Icon as={FiVideo} boxSize={10} color={VideoColor.fillColor} />,
        color: VideoColor.bgColor,
      }
    }

    return {
      icon: <Icon as={FiFolder} boxSize={10} color={OtherColor.fillColor} />,
      color: OtherColor.bgColor,
    }
  }

  const onUploadProgress = (
    progressEvent: AxiosProgressEvent,
    file: File,
    cancelSource: CancelTokenSource,
  ) => {
    const progress = Math.round(
      (progressEvent.loaded / (progressEvent.total ?? 0)) * 100,
    )

    if (progress === 100) {
      setUploadedFile(file)
      setFileToUpload(null)
      setStatusMessage({
        type: 'success',
        message: `Successfully uploaded ${file.name}`,
      })
      return
    }

    setFileToUpload({
      progress,
      File: file,
      source: cancelSource,
    })
  }

  const uploadFileToServer = async (
    formData: FormData,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
    cancelSource: CancelTokenSource,
  ) => {
    return axios.post('https://your-custom-server-url.com/upload', formData, {
      onUploadProgress,
      cancelToken: cancelSource.token,
      headers: {
        'Content-Type': 'multipart/form-data',
        // Add any authentication headers if needed
        // 'Authorization': 'Bearer your-auth-token'
      },
    })
  }

  const removeFile = () => {
    setFileToUpload(null)
    setUploadedFile(null)
    setStatusMessage(null)
  }

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) return

      // Clear any previous status messages
      setStatusMessage(null)

      const file = acceptedFiles[0]

      if (fileToUpload?.source) {
        fileToUpload.source.cancel('Upload cancelled due to new file!')
      }

      setFileToUpload({
        progress: 0,
        File: file,
        source: null,
      })

      const formData = new FormData()
      formData.append('file', file)

      const cancelSource = axios.CancelToken.source()

      setFileToUpload((prev) =>
        prev
          ? {
              ...prev,
              source: cancelSource,
            }
          : null,
      )

      try {
        await uploadFileToServer(
          formData,
          (progressEvent) =>
            onUploadProgress(progressEvent, file, cancelSource),
          cancelSource,
        )
        console.log('File uploaded successfully.')
      } catch (error) {
        if (axios.isCancel(error)) {
          console.log('Upload cancelled!')
          setStatusMessage({
            type: 'error',
            message: 'Upload cancelled!',
          })
        } else {
          console.error('Error uploading file: ', error)
          setStatusMessage({
            type: 'error',
            message: `Error uploading file: ${error instanceof Error ? error.message : 'Unknown error'}`,
          })
          setFileToUpload(null)
        }
      }
    },
    [fileToUpload],
  )

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    maxFiles: 1, // Only allow one file to be selected/dropped
    multiple: false, // Disable multiple file selection in the file browser
  })

  return (
    <Box>
      <Box>
        <Box
          {...getRootProps()}
          as="label"
          display="flex"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
          w="full"
          py={16}
          borderWidth="2px"
          borderColor={borderColor}
          borderStyle="dashed"
          borderRadius="3xl"
          cursor="pointer"
          bg={bgColor}
          _hover={{ bg: hoverBgColor }}
        >
          <Center textAlign="center">
            <Stack spacing={2} align="center">
              <Center
                borderWidth="1px"
                p={2}
                borderRadius="md"
                maxW="min-content"
                mx="auto"
              >
                <Icon as={FiUploadCloud} boxSize={5} />
              </Center>

              <Text mt={2} fontSize="sm" color={mutedTextColor}>
                <Text as="span" fontWeight="semibold">
                  Drag a file
                </Text>
              </Text>
              <Text fontSize="xs" color={mutedTextColorLight}>
                Click to upload a file &#40;file should be under 10 MB&#41;
              </Text>
            </Stack>
          </Center>
        </Box>

        <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          display="none"
          size="sm"
        />
      </Box>

      {fileToUpload && (
        <Box>
          <Box maxH="40" overflowY="auto" pr={0}>
            <Text
              fontWeight="medium"
              my={2}
              mt={6}
              color={mutedTextColor}
              fontSize="sm"
            >
              Uploading file
            </Text>
            <Stack spacing={2}>
              {(() => {
                const { icon, color } = getFileIconAndColor(fileToUpload.File)
                return (
                  <Flex
                    key={fileToUpload.File.lastModified}
                    justifyContent="space-between"
                    gap={2}
                    borderRadius="lg"
                    overflow="hidden"
                    borderWidth="1px"
                    borderColor="gray.100"
                    _hover={{ paddingRight: 0 }}
                    paddingRight={2}
                    role="group"
                  >
                    <Flex alignItems="center" flex={1} p={2}>
                      <Box color="white">{icon}</Box>

                      <Box w="full" ml={2}>
                        <Flex justifyContent="space-between" fontSize="sm">
                          <Text color={mutedTextColor}>
                            {fileToUpload.File.name.slice(0, 25)}
                          </Text>
                          <Text fontSize="xs">{fileToUpload.progress}%</Text>
                        </Flex>
                        <Progress
                          value={fileToUpload.progress}
                          colorScheme={color.split('.')[0]}
                          size="sm"
                          mt={1}
                        />
                      </Box>
                    </Flex>
                    <Button
                      onClick={() => {
                        if (fileToUpload.source)
                          fileToUpload.source.cancel('Upload cancelled')
                        removeFile()
                      }}
                      bg="red.500"
                      color="white"
                      transition="all"
                      alignItems="center"
                      justifyContent="center"
                      cursor="pointer"
                      px={2}
                      display="none"
                      _groupHover={{ display: 'flex' }}
                      variant="unstyled"
                      minW="auto"
                      h="auto"
                    >
                      <Icon as={FiX} boxSize={5} />
                    </Button>
                  </Flex>
                )
              })()}
            </Stack>
          </Box>
        </Box>
      )}

      {uploadedFile && (
        <Box>
          <Text
            fontWeight="medium"
            my={2}
            mt={6}
            color={mutedTextColor}
            fontSize="sm"
          >
            Uploaded File
          </Text>
          <Stack spacing={2} pr={3}>
            {(() => {
              const { icon } = getFileIconAndColor(uploadedFile)
              return (
                <Flex
                  key={uploadedFile.lastModified}
                  justifyContent="space-between"
                  gap={2}
                  borderRadius="lg"
                  overflow="hidden"
                  borderWidth="1px"
                  borderColor="gray.100"
                  _hover={{ paddingRight: 0, borderColor: 'gray.300' }}
                  paddingRight={2}
                  transition="all"
                  role="group"
                >
                  <Flex alignItems="center" flex={1} p={2}>
                    <Box color="white">{icon}</Box>
                    <Box w="full" ml={2}>
                      <Flex justifyContent="space-between" fontSize="sm">
                        <Text color={mutedTextColor}>
                          {uploadedFile.name.slice(0, 25)}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                  <Button
                    onClick={() => removeFile()}
                    bg="red.500"
                    color="white"
                    transition="all"
                    alignItems="center"
                    justifyContent="center"
                    px={2}
                    display="none"
                    _groupHover={{ display: 'flex' }}
                    variant="unstyled"
                    minW="auto"
                    h="auto"
                  >
                    <Icon as={FiX} boxSize={5} />
                  </Button>
                </Flex>
              )
            })()}
          </Stack>
        </Box>
      )}

      {statusMessage && (
        <Alert
          status={statusMessage.type}
          variant="subtle"
          mt={4}
          borderRadius="xl"
        >
          <AlertIcon />
          <Box flex="1">
            <AlertDescription display="block" color="gray.600" fontSize="md">
              {statusMessage.message}
            </AlertDescription>
          </Box>
          <CloseButton
            alignSelf="flex-start"
            position="relative"
            onClick={() => setStatusMessage(null)}
          />
        </Alert>
      )}
    </Box>
  )
}

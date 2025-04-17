'use client'

import {
  Box,
  Button,
  Center,
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
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [filesToUpload, setFilesToUpload] = useState<FileUploadProgress[]>([])

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

  // feel free to move all these functions to separate utils
  // here is just for simplicity
  const onUploadProgress = (
    progressEvent: AxiosProgressEvent,
    file: File,
    cancelSource: CancelTokenSource,
  ) => {
    const progress = Math.round(
      (progressEvent.loaded / (progressEvent.total ?? 0)) * 100,
    )

    if (progress === 100) {
      setUploadedFiles((prevUploadedFiles) => {
        return [...prevUploadedFiles, file]
      })

      setFilesToUpload((prevUploadProgress) => {
        return prevUploadProgress.filter((item) => item.File !== file)
      })

      return
    }

    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.map((item) => {
        if (item.File.name === file.name) {
          return {
            ...item,
            progress,
            source: cancelSource,
          }
        } else {
          return item
        }
      })
    })
  }

  const uploadImageToCloudinary = async (
    formData: FormData,
    onUploadProgress: (progressEvent: AxiosProgressEvent) => void,
    cancelSource: CancelTokenSource,
  ) => {
    return axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      formData,
      {
        onUploadProgress,
        cancelToken: cancelSource.token,
      },
    )
  }

  const removeFile = (file: File) => {
    setFilesToUpload((prevUploadProgress) => {
      return prevUploadProgress.filter((item) => item.File !== file)
    })

    setUploadedFiles((prevUploadedFiles) => {
      return prevUploadedFiles.filter((item) => item !== file)
    })
  }

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    setFilesToUpload((prevUploadProgress) => {
      return [
        ...prevUploadProgress,
        ...acceptedFiles.map((file) => {
          return {
            progress: 0,
            File: file,
            source: null,
          }
        }),
      ]
    })

    // cloudinary upload

    // const fileUploadBatch = acceptedFiles.map((file) => {
    //   const formData = new FormData();
    //   formData.append("file", file);
    //   formData.append(
    //     "upload_preset",
    //     process.env.NEXT_PUBLIC_UPLOAD_PRESET as string
    //   );

    //   const cancelSource = axios.CancelToken.source();
    //   return uploadImageToCloudinary(
    //     formData,
    //     (progressEvent) => onUploadProgress(progressEvent, file, cancelSource),
    //     cancelSource
    //   );
    // });

    // try {
    //   await Promise.all(fileUploadBatch);
    //   alert("All files uploaded successfully");
    // } catch (error) {
    //   console.error("Error uploading files: ", error);
    // }
  }, [])

  const { getRootProps, getInputProps } = useDropzone({ onDrop })

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
                  Drag files
                </Text>
              </Text>
              <Text fontSize="xs" color={mutedTextColorLight}>
                Click to upload files &#40;files should be under 10 MB&#41;
              </Text>
            </Stack>
          </Center>
        </Box>

        {/* <Input
          {...getInputProps()}
          id="dropzone-file"
          accept="image/png, image/jpeg"
          type="file"
          display="none"
        /> */}
      </Box>

      {filesToUpload.length > 0 && (
        <Box>
          <Box maxH="40" overflowY="auto" pr={3}>
            <Text
              fontWeight="medium"
              my={2}
              mt={6}
              color={mutedTextColor}
              fontSize="sm"
            >
              Files to upload
            </Text>
            <Stack spacing={2}>
              {filesToUpload.map((fileUploadProgress) => {
                const { icon, color } = getFileIconAndColor(
                  fileUploadProgress.File,
                )
                return (
                  <Flex
                    key={fileUploadProgress.File.lastModified}
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
                            {fileUploadProgress.File.name.slice(0, 25)}
                          </Text>
                          <Text fontSize="xs">
                            {fileUploadProgress.progress}%
                          </Text>
                        </Flex>
                        <Progress
                          value={fileUploadProgress.progress}
                          colorScheme={color.split('.')[0]}
                          size="sm"
                          mt={1}
                        />
                      </Box>
                    </Flex>
                    <Button
                      onClick={() => {
                        if (fileUploadProgress.source)
                          fileUploadProgress.source.cancel('Upload cancelled')
                        removeFile(fileUploadProgress.File)
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
              })}
            </Stack>
          </Box>
        </Box>
      )}

      {uploadedFiles.length > 0 && (
        <Box>
          <Text
            fontWeight="medium"
            my={2}
            mt={6}
            color={mutedTextColor}
            fontSize="sm"
          >
            Uploaded Files
          </Text>
          <Stack spacing={2} pr={3}>
            {uploadedFiles.map((file) => {
              const { icon } = getFileIconAndColor(file)
              return (
                <Flex
                  key={file.lastModified}
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
                          {file.name.slice(0, 25)}
                        </Text>
                      </Flex>
                    </Box>
                  </Flex>
                  <Button
                    onClick={() => removeFile(file)}
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
            })}
          </Stack>
        </Box>
      )}
    </Box>
  )
}

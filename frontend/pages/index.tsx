import { Box, Button, Flex, Heading, Text } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
export interface Props {
  auth: User
}

export interface User {
  username: string;
  isLogedIn: boolean;
  logedAt: Date;
}

const Home: NextPage<Props> = ({ auth }) => {

  const router = useRouter();

  useEffect(() => {
    if (auth?.username || auth?.isLogedIn) router.push('/home');
  })

  return (
    <Flex flexDir={"column"} alignItems="center">
      {/* Navigation Bar */}
      <Flex
        justifyContent={"right"}
        alignItems="center"
        height={"4rem"}
        width="100%"
        p="1rem"
        boxShadow={"lg"}>
        <Heading mr="auto" fontSize={"2xl"} pl={{ base: 0, md: "1rem" }}>
          Todo App
        </Heading>
        <Button variant={"outline"} size={"lg"}>
          <Link href="/login" passHref>
            Login
          </Link>
        </Button>
        <Button ml="1rem" size={"lg"} colorScheme="green">
          <Link href="/signup" passHref>
            Signup
          </Link>
        </Button>
      </Flex>
      {/* Header */}
      <Flex width={"90%"} minH="600px" alignItems={"center"} mt="20rem">
        <Flex flexDir={"column"} justifyContent="left" width={"100%"}>
          <Flex maxW="40rem" flexDir={"column"}>
            <Heading fontSize={"6xl"}>
              <Heading display={"inline"} fontSize="7xl" color="main.red" >Todo</Heading>, the most powerful schedule managing app
            </Heading>
            <Text fontFamily={"Roboto"} mt="2rem" fontSize={"1.3rem"} maxW="600px">
              With <Text display={"inline"} color="main.cyan" fontWeight={600}>Todo</Text> you can manage your work in a more efficient way, this app allow you schedule your meetings and asignment and provide you thousand of useful tools!
            </Text>
            <Flex minW={"300px"} w="300px" justifyContent="space-around" alignItems={"center"} height="6rem">
              <Button size="lg" colorScheme={"red"}>Create account</Button>
              <Button variant={"outline"} size="lg" ml="1rem">Learn more</Button>
            </Flex>
          </Flex>
          <Flex maxW="40rem" flexDir={"column"} ml="auto" mt="10rem">
            <Heading fontSize={"6xl"}>
              <Heading display={"inline"} fontSize="7xl" color="main.yellow" >Personal informations</Heading> is our top 1 priority!
            </Heading>
            <Text fontFamily={"Roboto"} mt="2rem" fontSize={"1.3rem"} maxW="600px">
              <Text display={"inline"} color="main.cyan" fontWeight={600}>Todo</Text> encrypt all of your data, including your task, meetings and schedulements. So we cannot see your data and we will never look at your data, <Text display={"inline"} color="main.red" fontWeight={600}> personal information is our top one priority.</Text>
            </Text>
            <Flex minW={"300px"} w="300px" alignItems={"center"} height="6rem">
              <Button variant={"outline"} size="lg">Learn more</Button>
            </Flex>
          </Flex>
          <Flex width={"100%"} justifyContent={"center"} alignItems={"center"} mt="10rem">
            <Flex maxWidth={"1200px"} flexDir="column" justifyContent={"center"} textAlign={"center"}>
              <Heading fontSize={"2rem"} color="main.gray" mb="1rem">
                Future is coming soon...
              </Heading>
              <Heading color="main.green" fontSize={"6xl"}>
                Todo is the future
              </Heading>
              <Flex width={"100%"} justifyContent="center" mt="2rem">
                <Text fontSize={"2xl"} maxWidth="1000px">
                  With <Text display={"inline"} color="main.green" fontSize={"3xl"} fontWeight={600}>Todo</Text> people will experience the power of these day web development. How powerful web actually is and it is the future of the future-technoly.
                </Text>
              </Flex>
              <Flex width={"100%"} justifyContent="center" mt="1rem">
                <Text fontSize="1.2rem" maxWidth={"800px"} textAlign="center">
                  We web-developer are making the website much better everyday, we try our best for our future. So our next generation will have the best thing from us and they will use it and improve our life standart.
                </Text>
              </Flex>
              <Box mt="1rem">
                <Link href="/future" passHref>
                  <Text color={"blue.400"} fontSize={"1.2rem"} _hover={{
                    textDecor: "underline"
                  }}>
                    For more information
                  </Text>
                </Link>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  )
}

export default Home
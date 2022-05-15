import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input } from "@chakra-ui/react";
import { NextPage } from "next";
import cookieCutter from "cookie-cutter";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import GET_USER from "../graphql/login.graphql";

export interface IsError {
  isError: boolean;
  message: string | null;
}

const Login: NextPage<{ access_token: string }> = ({ access_token }) => {

  const router = useRouter();

  const { data: QueryData, loading: QueryLoading, error: QueryError } = useQuery(gql`
    query {
      cookieLogin {
        username
        _id
      }
    }
  `)

  if (!QueryLoading) {
    if (QueryData) router.push('/home');
  }

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isError, setIsError] = useState<IsError>({
    isError: false,
    message: null
  })

  function handleInputChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleInputChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  const [getUser, { data, loading, error }] = useMutation(GET_USER);

  useEffect(() => {
    if (loading) console.log("loading...", loading);
    if (error) {
      setIsError({
        isError: true,
        message: error.message,
      })
    }
    if (!loading && data) {
      const cookie = cookieCutter.get('access_token');
      if(!cookie) {
        cookieCutter.set('access_token', data.login.data.access_token, { expires: Date.now() + 1000 * 60 * 60 * 48 })
      }
      router.push('/home');
    }
  }, [loading, error, data, router])


  return (
    <Flex justifyContent={"center"} alignItems="center" width={"100%"} height={"100%"}>
      <form onSubmit={(e) => {
        e.preventDefault();
        getUser({
          variables: {
            input: {
              username,
              password
            }
          }
        })
        setUsername('');
        setPassword('');
      }}>
        <Flex alignItems={"center"}>
          <Box width={"18rem"}>
            <Heading ml="1rem">
              Login to your Todo
            </Heading>
            <Flex width={"12rem"} justifyContent="space-around" m="1rem">
              <Link href="/signup" passHref>
                <Button colorScheme={"blue"}>
                  Sign Up
                </Button>
              </Link>
              <Button
                colorScheme={"green"}
                type="submit">
                Log In
              </Button>
            </Flex>
          </Box>
          <FormControl isInvalid={isError.isError}>
            <Box>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input id="username" type="text" value={username} onChange={handleInputChangeUsername} placeholder="Your username" />
              <FormHelperText>Enter your username, not your username</FormHelperText>
            </Box>
            <Box mt="1rem">
              <FormLabel htmlFor="username">Password</FormLabel>
              <Input id="password" type="password" value={password} onChange={handleInputChangePassword} placeholder="Your password" />
              <FormHelperText>Enter your password, not your bank PIN ;)</FormHelperText>
            </Box>
            {
              isError.isError === false ? (
                <FormHelperText>
                  Please login with your username and password ;)
                </FormHelperText>
              ) :
                (
                  <FormErrorMessage>
                    {isError.message}
                  </FormErrorMessage>
                )
            }
          </FormControl>
        </Flex>
      </form>
    </Flex>
  )
}

export default Login
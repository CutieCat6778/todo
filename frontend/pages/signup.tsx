import { gql, useMutation, useQuery } from "@apollo/client";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input, Text } from "@chakra-ui/react";
import cookieCutter from "cookie-cutter";
import { NextPage } from "next";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import getConfig from "next/config";
import { useRouter } from "next/router";

const { publicRuntimeConfig } = getConfig();
export interface IsError {
  isError: boolean;
  message: string | null;
}

const SIGNUP_USER = gql`
  mutation signup(
    $input: SignupUserInput!
  ) {
    signup(signupUserInput: $input) {
      username
      _id
    }
  }
`

const Signup = () => {

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
  const [email, setEmail] = useState<string>('');
  const [isError, setIsError] = useState<IsError>({
    isError: false,
    message: null
  })

  const [signUp, { data, loading, error }] = useMutation(SIGNUP_USER);

  function handleInputChangeUsername(e: React.ChangeEvent<HTMLInputElement>) {
    setUsername(e.target.value);
  }

  function handleInputChangePassword(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  function handleInputChangeEmail(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  useEffect(() => {
    if (loading) console.log("loading...", loading);
    if (error) {
      console.log(error);
      setIsError({
        isError: true,
        message: error.message,
      })
    }
    if (!loading && data) {
      router.push('/login');
    }
  }, [loading, error, data, router])


  return (
    <Flex justifyContent={"center"} alignItems="center" width={"100%"} height={"100%"}>
      <form onSubmit={(e) => {
        e.preventDefault();
        if (password.length < 6) return setIsError({
          isError: true,
          message: "Password is too, it need to be longer then 6 character!",
        })

        const regex = new RegExp(/^[A-Za-z]+$/);
        if (!regex.test(username)) return setIsError({
          isError: true,
          message: "Username shouldn't contain special characters!",
        })

        const regexEmail = new RegExp(/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/)
        if (!regexEmail.test(email)) return setIsError({
          isError: true,
          message: "Invalid email format!",
        })
        if (!isError.isError) {
          signUp({
            variables: {
              input: {
                username,
                password,
                email
              }
            }
          })
          setUsername('');
          setPassword('');
          setEmail('');
        }
      }}>
        <Flex alignItems={"center"}>
          <Box width={"18rem"}>
            <Heading ml="1rem">
              Create a account with Todo
            </Heading>
            <Flex width={"12rem"} justifyContent="space-around" m="1rem">
              <Link href="/login" passHref>
                <Button colorScheme={"blue"}>
                  Log In
                </Button>
              </Link>
              <Button colorScheme={"green"} type="submit">
                Sign Up
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
              <FormLabel htmlFor="username">Email</FormLabel>
              <Input id="email" type="email" value={email} onChange={handleInputChangeEmail} placeholder="Your email" />
              <FormHelperText>Enter your email, not your gmail</FormHelperText>
            </Box>
            <Box mt="1rem">
              <FormLabel htmlFor="username">Password</FormLabel>
              <Input id="password" type="password" value={password} onChange={handleInputChangePassword} placeholder="Your password" />
              <FormHelperText>It needs to be longer then 6 character</FormHelperText>
            </Box>
            {
              isError.isError === false ? (
                <FormHelperText>
                  If there are some error show up, contact me: <Text textDecoration={"underline"} display="inline" fontWeight={600}><Link href="mailto:support@thinh.tech">support@thinh.tech</Link></Text>
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

export default Signup

export async function getStaticProps() {
  return {
    props: {
      auth: {
        username: null,
        password: null,
      }
    }
  }
}
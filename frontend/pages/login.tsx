import { gql } from "@apollo/client";
import { Box, Button, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, Input } from "@chakra-ui/react";
import request from "graphql-request";
import { NextPage } from "next";
import Link from "next/link";
import React, { useState } from "react";
import getConfig from "next/config";

const { publicRuntimeConfig } = getConfig();

export interface IsError {
  isError: boolean;
  message: string | null;
}

const GET_USER = gql`
  mutation login(
    $input: LoginUserInput!
  ) {
    login(loginUserInput: $input) {
      user {
        username
        _id
      } 
      access_token
    }
  }
`

const Login: NextPage<any> = ({ auth }) => {

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

  async function logIn() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    try {
      const { login } = await request(publicRuntimeConfig.backendUrl, GET_USER, {
        input: {
          username,
          password,
        }
      })
      if (login) {
        console.log(login);
        setIsError({
          isError: false,
          message: null,
        })
      }
    } catch (e) {
      if (!e) return;
      const error = JSON.parse(JSON.stringify(e));
      console.log(error);
      setIsError({
        isError: true,
        message: error.response.errors[0].message
      })
    }
  }

  return (
    <Flex justifyContent={"center"} alignItems="center" width={"100%"} height={"100%"}>
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
            <Button colorScheme={"green"} onClick={logIn}>
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
    </Flex>
  )
}

export default Login

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
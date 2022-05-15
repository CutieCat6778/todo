import type { AppProps } from 'next/app'
import { ChakraProvider, CSSReset } from '@chakra-ui/react'
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import Head from 'next/head';
import { theme } from '../utils/theme';
import "@fontsource/comfortaa";
import "@fontsource/space-mono";
import "@fontsource/roboto";

const link = createHttpLink({
  uri: process.env.NODE_ENV === "development" ? "http://localhost:6969/graphq" : "https://todo-backend-nsjs.herokuapp.com/",
  credentials: "include"
})

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Todo App - Best app to mangage your work!</title>
        <style>{`
          html, body, #__next {
            height: 100%;
          }
        `}
        </style>
      </Head>

      <ChakraProvider theme={theme}>
        <CSSReset/>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </ChakraProvider>

    </>
  )
}

export default MyApp

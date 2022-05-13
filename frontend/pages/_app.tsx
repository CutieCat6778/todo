import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Head from 'next/head';
import { theme } from '../utils/theme';
import "@fontsource/comfortaa";
import "@fontsource/space-mono";
import "@fontsource/roboto";

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
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  )
}


const client = new ApolloClient({
  uri: "http://localhost:6969/graphql/",
  cache: new InMemoryCache(),
});

export { client };

export default MyApp

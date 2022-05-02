import { Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
export interface Props {
  auth: User
}

export interface User {
  username: string;
  isLogedIn: boolean;
  logedAt: Date;
}

const Home: NextPage<Props> = ({ auth }) => {

  console.log(auth);

  return (
    <Heading>
      Hello world!
    </Heading>
  )
}

export default Home

export async function getStaticProps() {
  const auth = {
    username: null,
    isLogedIn: false,
    logedAt: null,
  }

  if(!auth.isLogedIn) {
    return {
      redirect: {
        permanent: false,
        destination: '/login'
      }
    }
  }

  return {
    props: { auth }
  }
}
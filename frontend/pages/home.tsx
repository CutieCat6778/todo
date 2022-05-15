import { gql, useQuery } from "@apollo/client";
import { Box, Heading } from "@chakra-ui/react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import Spinner from '../components/Spinner';

const Home: NextPage<{ access_token: string }> = ({ access_token }) => {
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
    if (QueryError) router.push('/login');
    if (!QueryData) router.push('/login');
    
  }

  return (
    <Box>
      {
        QueryLoading ? <Spinner /> : (<Heading>Hello, {QueryData.cookieLogin.username}! </Heading>)
      }
    </Box>
  )
}

export default Home;

import { Button, Flex, Heading } from "@chakra-ui/react";
import { GetServerSideProps, NextPage } from "next";
import { getSession, signIn, useSession } from "next-auth/react";
import { FaGoogle } from 'react-icons/fa'

const Login: NextPage = () => {
  const { data: session  } = useSession()

  const handleSignInWithGoogle = async () => {
    if(!session) {
      await signIn('google')
    }
  }

  return (
    <Flex w="100vw" h="100vh" align="center" justify="center">
      <Flex flexDir="column" maxW="90vw" borderWidth={1} borderColor="gray.800" borderRadius="5" p="2rem" w="500px">
          <Heading as="h2" fontSize="1.6rem" mb="2rem">Laboratório Maker</Heading>
            <Button leftIcon={<FaGoogle color="white" />} flex="1" w="100%" onClick={handleSignInWithGoogle}>Acessar com Google</Button>
      </Flex>
    </Flex>
  )
}

export default Login;

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })

  if(!!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
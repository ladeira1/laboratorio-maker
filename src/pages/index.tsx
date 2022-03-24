import { Button, Flex } from "@chakra-ui/react";
import { Sidebar } from "../components/Sidebar";
import { getSession, signOut } from 'next-auth/react'
import { GetServerSideProps } from "next";

export default function Dashboard() {
  return (
    <Flex direction="column" h="100vh">
      <Flex
        w="100vw"
      >
        <Sidebar />

      </Flex>
    </Flex>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req })

  if(!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  return {
    props: {}
  }
}
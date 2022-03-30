import { Button, Flex } from "@chakra-ui/react";
import { getSession, signOut } from 'next-auth/react'
import { GetServerSideProps } from "next";
import { Sidebar } from "../../components/Sidebar";

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
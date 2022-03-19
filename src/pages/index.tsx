import { Flex, Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import type { NextPage } from 'next'

const Home: NextPage = () => {
  return (
    <Flex align="center" justify="center" mx="4rem" my="4rem"  borderWidth={1} borderBottomWidth={0} borderColor="support" borderRadius="5">
      <Table >
        <Thead>
          <Tr>
            <Th color="white">To convert</Th>
            <Th color="white">into</Th>
            <Th color="white" isNumeric>multiply by</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>inches</Td>
            <Td>millimetres (mm)</Td>
            <Td isNumeric>25.4</Td>
          </Tr>
          <Tr >
            <Td>feet</Td>
            <Td>centimetres (cm)</Td>
            <Td isNumeric>30.48</Td>
          </Tr>
          <Tr>
            <Td>yards</Td>
            <Td>metres (m)</Td>
            <Td isNumeric>0.91444</Td>
          </Tr>
        </Tbody>
    </Table>
  </Flex>
  )
}

export default Home

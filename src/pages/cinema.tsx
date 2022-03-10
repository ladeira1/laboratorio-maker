import { Button, Flex, Text } from "@chakra-ui/react";
import { NextPage } from "next";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { useAppSelector } from "../hooks/useAppSelector";
import { login, logout } from "../redux/features/auth/authSlice";

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const { user, isLogged } = useAppSelector(state => state.auth)

  const handleLogin = () => {
    const mockedUser = {
      name: 'test',
      email:' test@email.com'
    }

    dispatch(login(mockedUser))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Flex w="100vw" h="100vh" bg="brand.900" >
      <Text color="brand.700">OLA</Text>
      {isLogged ? (
        <Button onClick={handleLogout}>
          <Text>deslogar</Text>
        </Button>
      ) : (
          <Button onClick={handleLogin}>
            <Text>logar</Text>
          </Button>
        )
      }

      {!!user && (
        <>
          <Text>{user.email}</Text>
          <Text>{user.name}</Text>
        </>
      )}
    </Flex>
  )
}

export default Home;
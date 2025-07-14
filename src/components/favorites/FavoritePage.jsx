import {
  Box,
  Heading,
  Stack,
  Text,
  Flex,
  Spinner,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { FaRegStar } from "react-icons/fa";
import { useViewFavorite } from "../../shared/hooks/favorite/userViewFavorit";
import { useEffect, useState } from "react";

export const FavoritePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLocal = JSON.parse(localStorage.getItem("user"));
    setUser(userLocal);
  }, []);

  const { favorites, isLoading } = useViewFavorite(user?.id);

  return (
    <Flex
      direction="column"
      align="center"
      justify="flex-start"
      minH="100vh"
      bg="gray.50"
      py={10}
      px={4}
    >
      <Heading size="lg" color="teal.700" mb={6}>
        Cuentas Favoritas
      </Heading>

      {isLoading ? (
        <Spinner size="xl" color="teal.500" />
      ) : (
        <Stack spacing={4} w={{ base: "100%", md: "600px" }}>
          {favorites.length === 0 && (
            <Box
              bg="white"
              p={6}
              rounded="lg"
              boxShadow="md"
              textAlign="center"
            >
              <Text color="gray.500">No tienes cuentas favoritas registradas.</Text>
            </Box>
          )}

          {favorites.map((fav) => (
            <Box
              key={fav._id}
              bg="white"
              p={5}
              borderRadius="lg"
              boxShadow="md"
              border="1px solid"
              borderColor="gray.200"
            >
              <Flex justify="space-between" align="center" mb={2}>
                <Flex align="center">
                  <Icon as={FaRegStar} color="teal.500" boxSize={5} mr={2} />
                  <Text fontWeight="bold" color="teal.700">
                    {fav.alias}
                  </Text>
                </Flex>
                {fav.isFavorite && (
                  <Badge colorScheme="green">Favorito</Badge>
                )}
              </Flex>

              <Text fontSize="sm" color="gray.600">
                <strong>No. de Cuenta:</strong> {fav.favoriteAccount?.noAccount}
              </Text>
              <Text fontSize="sm" color="gray.600">
                <strong>Tipo de Cuenta:</strong> {fav.favoriteAccount?.typeAccount}
              </Text>
              <Text fontSize="xs" color="gray.500">
                Registrado el {new Date(fav.createdAt).toLocaleDateString()}
              </Text>
            </Box>
          ))}
        </Stack>
      )}
    </Flex>
  )
}

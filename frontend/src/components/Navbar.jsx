import { FaMoon } from 'react-icons/fa';
import { FaSun } from 'react-icons/fa';
import { useColorMode } from '@chakra-ui/react';
import { Container, Flex, HStack, Text, Button } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";

const Navbar = () => {
    const { colorMode,toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4} >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row",
        }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, cyan.400, blue.500)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store 🛒</Link>
        </Text>

        <HStack>
          <Link to={"/create"}>
            <Button>
              <FaCartPlus fontSize={16} />
            </Button>
          </Link>

          <Button onClick={toggleColorMode}>
                { 
                    colorMode === "light" ? (
                        <span ><FaMoon/></span>
                    ) : (
                        <span ><FaSun/></span>
                    )
                }
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;

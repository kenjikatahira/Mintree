import {
    Box,
    Flex,
    LinkBox,
    LinkOverlay,
    List,
    ListItem,
    Text,
    Heading,
 } from "@chakra-ui/react"

import User from "./User"

const Feed = ({items=[]}) => {
    const renderList = ({
        id,
        properties : {
            Name,Url,Image
        }
    }) => {
        return (
            <ListItem
                key={id}
                borderWidth="1px"
                w="100%"
                fontWeight="bold"
            >
                <LinkBox p={3} textAlign="center">
                    <LinkOverlay href={Url.value}>
                        <Text fontSize="2xl">{Name.value}</Text>
                    </LinkOverlay>
                </LinkBox>
            </ListItem>
        )
    }

    return (
        <Box
            position="relative"
            minH="100vh"
        >
            <Flex
                className="header"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                pt={8}
            >
                <User/>
                <Heading p={5}>.Mentha.</Heading>
            </Flex>

            <Flex
                className="feed"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                pt={8}
            >
                <Box w="300px">
                    <List spacing={4}>
                        {items.map(renderList)}
                    </List>
                </Box>
            </Flex>
        </Box>
    )
}

export default Feed
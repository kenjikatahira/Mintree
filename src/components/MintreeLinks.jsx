import {
    Box,
    Flex,
    LinkBox,
    LinkOverlay,
    List,
    ListItem,
    Text,
 } from "@chakra-ui/react"

const MintreeLinks = ({items=[]}) => {
    const renderList = ({
        id,
        properties : {
            Name,Url
        }
    }) => {
        return (
            <ListItem
                key={id}
                borderColor="whiteAlpha.600"
                borderWidth="1px"
                borderRadius="2xl"
                w="100%"
                fontWeight="bold"
            >
                <LinkBox p={3} textAlign="center">
                    <LinkOverlay href={Url.value}>
                        <Text
                            fontSize="2xl"
                            color="brand.g2"
                            fontFamily="Amatic SC"
                            fontWeight="700"
                            color="whiteAlpha.800"
                        >
                            {Name.value}
                        </Text>
                    </LinkOverlay>
                </LinkBox>
            </ListItem>
        )
    }

    return (
        <Box position="relative" pb={8}>
            <Flex
                className="feed"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                pt={16}
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

export default MintreeLinks
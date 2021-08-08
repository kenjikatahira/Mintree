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
    const renderItems = ({
        id,
        properties : {
            Name,Url
        }
    }) => {
        return (
            <ListItem
                key={id}
                w="100%"
                color="#252422"
                _hover={{ color: 'rgba(0,0,0,.3)' }}
                fontFamily="Inter"
                fontWeight="300"
                fontSize="lg"
                border="1px solid rgba(0,0,0,.1)"
                borderBottom="1px solid rgba(0,0,0,.2)"
                boxShadow="sm"
            >
                <LinkBox textAlign="center">
                    <LinkOverlay href={Url.value}>
                        <Text p="1" className="link-item">
                            {Name.value}
                        </Text>
                    </LinkOverlay>
                </LinkBox>
            </ListItem>
        )
    }

    const renderList = () => {
        return (
            <List spacing={5}>
                {items.map(renderItems)}
            </List>
        )
    }

    return (
        <Box>
            <Flex
                className="feed"
                flexDir="column"
                alignItems="center"
                justifyContent="center"
                pt={5}
            >
                <Box w="300px">
                    {renderList()}
                </Box>
            </Flex>
        </Box>
    )
}

export default MintreeLinks
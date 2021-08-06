import {
    Heading,
    Center
} from "@chakra-ui/react"

const MintreeAvatar = (props) => {

    return (
        <>
            <Center
                borderColor="whiteAlpha.600"
                borderWidth="1px"
                p={5}
                h="120px"
                w="120px"
                borderRadius="100%"
            >
                <Heading
                    fontSize="xx-large"
                    fontFamily="Amatic SC"
                    fontWeight="700"
                    color="whiteAlpha.900"
                >
                    MENTHA
                </Heading>
            </Center>
        </>
    )
}

export default MintreeAvatar
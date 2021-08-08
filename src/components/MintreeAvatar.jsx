import { Avatar } from "@chakra-ui/react"

const MintreeAvatar = (props) => {
    return (
        <>
            <Avatar
                {...props}
                size="2xl"
                name="Kenji Katahira"
                src="https://github.com/kenjikatahira.png"
                boxShadow="md"
            />
        </>
    )
}

export default MintreeAvatar
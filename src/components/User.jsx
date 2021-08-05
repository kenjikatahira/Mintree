import { Avatar } from "@chakra-ui/react"
import photo from '../assets/images/mentha_profile.webp'

const User = (props) => {
    return (
        <>
            <Avatar
                {...props}
                size="2xl"
                name="Mentha"
                src={photo.src}
                bg="brand.p1"
                boxShadow="md"
            />
        </>
    )
}

export default User
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'
import MintreeLinks from '../components/MintreeLinks'
import MintreeAvatar from '../components/MintreeAvatar'

export default function Home({items}) {
    return (
        <Box>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Mintree</title>
                <meta name="description" content="My links for social media" />
                <meta name="author" content="kenjikatahira" />
                <meta name="copyright" content="kenjikatahira" />
                <meta name="robots" content="index, follow" />
            </Head>
            <Box>
                <Flex
                    className="header"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                    pt={8}
                    w="100%"
                >
                    <MintreeAvatar mb="4" />
                    <Heading
                        fontSize="32px"
                        fontWeight="300"
                        pb="3"
                    >
                        Kenji Katahira
                    </Heading>
                    <Text
                        color="#252422"
                        fontWeight="300"
                        pb={3}
                        borderBottom="1px solid rgba(0, 0, 0, 0.1)"
                    >
                        Front-end Developer
                    </Text>
                </Flex>

                <MintreeLinks items={items}></MintreeLinks>

            </Box>
        </Box>
    )
}

const redirect = () => {
    return {
        redirect: {
            destination: process.env.REDIRECT_URL,
            permanent: false,
        },
    }
}

export async function getServerSideProps(context) {
    try {
        const response = await fetch(process.env.MINTREE_NOTION_API)
        const { data : items, } = await response.json()

        if(!items.length) {
            !items.length && console.error('No items ; Items without required fields : [NAME,URL]; Or no items within the Date range')
            return redirect()
        }

        return {
            props: {
                items,
            },
        }

    } catch (err) {
        return redirect()
    }
}
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import Head from 'next/head'
import MintreeLinks from '../components/MintreeLinks'
import MintreeAvatar from '../components/MintreeAvatar'
import Notion from '../api/notion'

export default function Home(props) {
    const items = JSON.parse(props.items)
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

const defaultValue = () => {
    return JSON.stringify([
        {
            "id": "e39d3e9b-d4de-4775-a669-d3560f432ad3",
            "hide": false,
            "hasRange": false,
            "properties": {
                "Name": {
                    "id": "title",
                    "type": "title",
                    "value": "Github"
                },
                "Url": {
                    "id": "|MwP",
                    "type": "url",
                    "value": "https://github.com/kenjikatahira"
                }
            }
        }
    ])
}

export async function getStaticProps(context) {
    try {
        let data = await Notion()
        const items = JSON.stringify(data)

        if(!items) {
            return {
                props : {
                    items : defaultValue()
                }
            }
        }

        return {
            props: {
                items,
            },
            revalidate: 1,
        }

    } catch(e) {

        return {
            props : {
                items : defaultValue()
            }
        }

    }
}

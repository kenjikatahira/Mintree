import { Box, Flex } from '@chakra-ui/react'
import Head from 'next/head'
import MintreeLogo from '../components/MintreeLogo'
import MintreeLinks from '../components/MintreeLinks'

export default function Home({items}) {
    return (
        <Box>
            <Head>
                <meta charSet="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Mintree</title>
                <meta name="description" content="Atelie Mentha content links" />
                <meta name="author" content="kenjikatahira" />
                <meta name="copyright" content="kenjikatahira" />
                <meta name="robots" content="index, follow" />
            </Head>
            <Box minHeight="100vh" m="0" bg="brand.p1">

                <Flex
                    className="header"
                    flexDir="column"
                    alignItems="center"
                    justifyContent="center"
                    pt={8}
                    w="100%"
                >
                    <MintreeLogo />
                </Flex>
                <MintreeLinks items={items}></MintreeLinks>

            </Box>
        </Box>
    )
}

const redirect = () => {
    return {
        redirect: {
            destination: process.env.MAIN_SITE_URL,
            permanent: false,
        },
    }
}

export async function getServerSideProps(context) {
    try {
        const response = await fetch(process.env.MINTREE_NOTION_API)
        const {
            data : items,
        } = await response.json()

        if(!items.length) {
            !items.length && console.error('No items ; Items without required fields : [NAME,URL]; Or no items within the Date range')
            if(!process.env.MAIN_SITE_URL) {
                return redirect()
            }
        }

        return {
            props: {
                items,
            },
        }

    } catch (err) {
        if(process.env.MAIN_SITE_URL) {
            return redirect()
        }
    }
}
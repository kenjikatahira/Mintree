import Head from 'next/head'
import Feed from '../components/Feed'
export async function getServerSideProps(context) {
    try {

        const response = await fetch('http://localhost:3000/api/notion')
        const {
            data : items
        } = await response.json()

        return {
            props: {
                items
            },
        }

    } catch(err) {
        // return {
        //     redirect: {
        //         destination: 'https://www.ateliementha.com/',
        //         permanent: false,
        //     },
        // }
        return {
            props: { items : [] },
        }
    }
}

export default function Home({items}) {
    return (
        <div>
            <Head>
                <meta charset="utf-8"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <title>Mintree</title>
                <meta name="description" content="Links for your bio profile" />
                <meta name="author" content="kenjikatahira" />
                <meta name="copyright" content="kkatahira" />
                <meta name="robots" content="index, follow" />
            </Head>
            <Feed items={items}></Feed>
        </div>
    )
}

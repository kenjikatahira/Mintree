const { Client } = require('@notionhq/client')
const dotenv = require('dotenv')
dotenv.config()

const _init = (notion) => {
    const createDatabase = async ({
        parent,
        title,
        properties,
    }, cb) => {
        try {
            const response = await notion.databases.create({
                parent,
                title,
                properties,
            })

            msgWithDatabaseId(response)
            cb(response)

        } catch(err) {
            console.error(err)
        }
    }

    const defineParent = () => {
        return {
            type: 'page_id',
            page_id: process.env.NOTION_PAGE_ID
        }
    }

    const defineTitle = () => {
        const DATABASE_NAME = 'Mintree'
        return [
            {
                type: 'text',
                text: {
                    content: DATABASE_NAME,
                    link: null
                }
            }
        ]
    }

    const defineProperties = () => {
        return {
            Name : {
                title : {}
            },
            Url : {
                type : 'url',
                url : {}
            },
            Created : {
                type : 'created_time',
                created_time : {}
            },
            Range : {
                type : 'date',
                date : {}
            },
            Hide : {
                type : 'checkbox',
                checkbox : {}
            },
            Order : {
                type : 'number',
                number : {}
            }
        }
    }

    const msgWithDatabaseId = ({id}) => {
        console.info(`Set the id to .env file \n -------`)
        console.info(`NOTION_DATABASE_ID : ${id} \n -------`)
    }

    const createItemPage = async (response) => {
        await notion.pages.create({
            parent: {
                database_id: response.id,
            },
            properties: {
                Name : {
                    title : [
                        {
                            text: {
                                content : 'Item 1'
                            }
                        }
                    ]
                },
                Url : {
                    url : 'https://github.com/kenjikatahira'
                },
                Order : {
                    number : 1
                }
            }
        })
    }

    createDatabase({
        parent : defineParent(),
        title : defineTitle(),
        properties : defineProperties()
    }, createItemPage)
}

if(!process.env.NOTION_TOKEN) {
    console.error('NOTION_TOKEN is not defined on .env')
    process.exit(1)
}

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

_init(notion)

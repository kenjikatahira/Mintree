import { Client } from '@notionhq/client'
import dotenv from 'dotenv'
import Cors from 'cors'

const cors = Cors({
    methods: ['GET', 'HEAD'],
})

dotenv.config()

const runMiddleware = function(req, res, fn) {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof Error) {
            return reject(result)
            }
            return resolve(result)
        })
    })
}

const filterExpired = ({ expired_time }) => !expired_time || new Date(expired_time).valueOf() > new Date().valueOf()

const getDatabase = async (notion) => {
    const { results } = await notion.databases.query({
        database_id : process.env.NOTION_DATABASE_ID,
        filter: {
            or: [
                {
                    property: 'Hide',
                    checkbox: {
                        does_not_equal: true,
                    },
                },
            ],
        },
        sorts: [
            {
                property: 'Order',
                direction: 'ascending',
            },
        ],
    })

    const getProperties = ({
        id,
        created_time,
        last_edited_time,
        properties : { Name = {}, Url = {}, Expire = {}, Image = {}, Hide = {} }
    }) => {
        return {
            id,
            created_time,
            last_edited_time,
            hide : Hide.checkbox,
            expired_time : (Expire.date || {}).start,
            properties : {
                Name : {
                    id : Name.id,
                    type : Name.type,
                    value : Name.title[0].text.content
                },
                Url : {
                    id : Url.id,
                    type : Url.type,
                    value : Url.url
                },
                Image : {
                    id : Image.id,
                    type : Image.type,
                    value : Image.files
                }
            }
        }
    }

    return results.map(getProperties)
                    .filter(filterExpired)
}

export default async function handler(req, res) {
    await runMiddleware(req, res, cors)

    const notion = new Client({
        auth: process.env.NOTION_TOKEN,
    })

    const data = await getDatabase(notion)

    try {
        res.status(200).json({ data })
    } catch(err) {
        res.status(400).json({ err })
    }
}

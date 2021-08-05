import { Client } from '@notionhq/client'
import dotenv from 'dotenv'
import Cors from 'cors'

const cors = Cors({
    methods: ['GET', 'HEAD'],
})

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

dotenv.config()

const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})

const Notion = async () => {
    const { results } = await notion.databases
        .query({ database_id : process.env.NOTION_DATABASE_ID })

    const getProperties = ({
        id,
        created_time,
        last_edited_time,
        properties : {
            Name,
            Url,
            Created,
            Expire,
            Image,
        }
    }) => {
        return {
            id,
            created_time,
            last_edited_time,
            properties : {
                Name : {
                    id : (Name || {}).id,
                    type : (Name || {}).type,
                    value : (Name || {}).title[0].text.content
                },
                Url : {
                    id : (Url || {}).id,
                    type : (Url || {}).type,
                    value : (Url || {}).url
                },
                Image : {
                    id : (Image || {}).id,
                    type : (Image || {}).type,
                    value : (Image || {}).files
                },
                Expire : {
                    id : (Expire || {}).id,
                    type : (Expire || {}).type,
                    value : ((Expire || {}).date || {}).start
                },
                Created : {
                    id : (Created || {}).id,
                    type : (Created || {}).type,
                    value : (Created || {}).created_time
                }
            }
        }
    }

    return results.map(getProperties)
}

export default async function handler(req, res) {
    await runMiddleware(req, res, cors)

    const data = await Notion()
    try {
        res.status(200).json({ data })
    } catch(err) {
        res.status(400).json({ err })
    }
}

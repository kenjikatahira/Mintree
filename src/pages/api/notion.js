import {
    Client
} from '@notionhq/client'
import moment from 'moment'

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
})

const filterRange = ({ start_time, expire_time, hasRange }) => {
    const now = moment(new Date())
    // if no range is setted, show item
    if(!hasRange) {
        return true
    // if user only setted days
    } else if((start_time && expire_time) && (expire_time.format('HHmmss') === '000000' && start_time.format('HHmm') === '000000')) {
        return ( now.isBetween(start_time, expire_time) || now.isSame(expire_time,'day'))
    // if user setted days and hours
    } else if(start_time && expire_time) {
        return ( now.isBetween(start_time, expire_time))
    // if user only setted start time
    } else if(start_time && !expire_time) {
        return now.isSameOrAfter(start_time)
    }
    return false
}

const filterEmptyItems = ({properties}) => properties.Name.value && properties.Url.value

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
        properties : { Name = {}, Url = {}, Range = {}, Hide = {} }
    }) => {
        return {
            id,
            created_time,
            last_edited_time,
            hide : Hide.checkbox,
            hasRange : !!((Range.date || {}).start || (Range.date || {}).end),
            start_time : (Range.date || {}).start ? moment((Range.date || {}).start) : undefined,
            expire_time : (Range.date || {}).end ? moment((Range.date || {}).end) : undefined,
            properties : {
                Name : {
                    id : Name.id,
                    type : Name.type,
                    value : ((Name.title[0] || {}).text || {}).content || ''
                },
                Url : {
                    id : Url.id,
                    type : Url.type,
                    value : Url.url
                }
            }
        }
    }

    return results.map(getProperties)
                    .filter(filterRange)
                    .filter(filterEmptyItems)
}

export default async function handler(req, res) {
    const database = await getDatabase(notion)

    try {
        res.status(200).json({ data : database })
    } catch(err) {
        res.status(400).json({ err })
    }
}

# Mintree

### Mintree is a tool made with [Nextjs](https://nextjs.org/), [Chakra-ui](https://chakra-ui.com/) and [Notion](https://www.notion.so/) api.
### It allows you to share multiple links ( like [Linktree](https://linktr.ee/) ) using Notion's tables.

## Configuration

- Create your integration on Notion api by acessing : https://www.notion.so/my-integrations
- Add a new page on your Notion
- Share the page to integration app by clicking on the share button at the top right of window
- Get the page_id from the created page :

![alt text](https://i.ibb.co/C2kCR8X/url-id-example.png)

- Set the variable NOTION_PAGE_ID with the id at the .env file

then run :
```bash
yarn database
```

- Now you copy the database id retrieved from the command to the .env file

run :
```bash
yarn dev
```

### Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

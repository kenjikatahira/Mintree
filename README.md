# Mintree

### Mintree is a simple tool that allows You to create a bio page to share multiple links (like Linktree) using Notion Tables. Made with Nextjs, Chakra-ui and Notion api.

## Configuration
- First You will need a account on [Notion](https://www.notion.so/)
- Create your own integration on Notion api by acessing : https://www.notion.so/my-integrations
- Add a new page on your Notion
- Share the page to integration app by clicking on the share button at the top right of window
- Get the page_id from the created page :

![alt text](https://i.ibb.co/C2kCR8X/url-id-example.png)

- Create a .env file from the .env-example
- Set NOTION_PAGE_ID with the page id

then run :
```bash
yarn database
```

- Now you copy the database id retrieved from the command
- Set to NOTION_DATABASE_ID on .env file

run :
```bash
yarn dev
```

### Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

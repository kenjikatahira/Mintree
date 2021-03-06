# Mintree

### Mintree is a simple tool that allows You to create a bio page to share multiple scheduled links (like Linktree) using Notion Tables, Nextjs and Chakra-ui.

[Live Example](https://mintreeapp.vercel.app/)

## Configuration
- First You will need a account on [Notion](https://www.notion.so/)
- Create your own integration on Notion api by acessing : https://www.notion.so/my-integrations
- Add a new page on your Notion
- Share the page to integration app by clicking on the share button at the top right of window
- Get the page_id from the page's url : https://www.notion.so/{page_id}
- Create a .env file copying variables from the .env-example
- Set NOTION_PAGE_ID with the page id

then run :
```bash
yarn database
```

- Now you copy the database id retrieved from the command
- Set to NOTION_DATABASE_ID on .env file

run :
```bash
yarn install
```
then to run the server:
```bash
yarn dev
```

### Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

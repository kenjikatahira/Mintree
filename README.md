This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Configuration

Create a integration on notion api
https://www.notion.so/my-integrations

Create a page on your notion app (It can be any name)
Share the page to integration app by clicking on the share button at the top right of window

Get the id from the url path
[img]

and add to the environment variable NOTION_PAGE_ID

then run :
```bash
yarn database
```

Now you copy the database id to the .env

# Mintree

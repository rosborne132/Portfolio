# Portfolio

## Get started

```sh
# Install the Sanity command line interface
> npm i -g @sanity/cli

# Initiate your own project in the studio folder
./studio
> sanity init

# Add a CORS-origin rule to allow the frontend to request data
./studio
> sanity cors add http://localhost:3000 --no-credentials

# Run local sanity studio
./studio
> sanity start

# Deploy sanity studio
./studio
> sanity deploy

# Insert the projectId and dataset name from Sanity in client.js
./web
> nano client.js

# Install frontend dependencies
./web
> npm install

# Run Next.js in development mode
./web
> yarn run dev
```

## Deploy on vercel

```sh
~/this-blog/web
> npm i -g vercel
> vercel login
> vercel
```

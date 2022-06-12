# Portfolio

## Setup

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

# Install frontend dependencies
./web
> yarn
```

## Running the app locally

This project uses turborepo for local development and deployment.

To start up this project, run the command below.

```bash
npm run dev
# or
yarn dev
```

## Deploy on vercel

```sh
~/this-blog/web
> npm i -g vercel
> vercel login
> vercel
```

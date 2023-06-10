# Requirements

- Node.JS + NPM
- **Docker** or **Postgre server**

# Deploy

1. Download repo:
```bash
git clone <target>
```

2. Install packages:
```bash
npm install
```

3. Copy `.env.example` and rename it to `.env`. 
  
    Set your Telegram Bot API Token, admin & error chat IDs. Bot would send error messages to error chat, and notify some important things to admin chat. It's ok to use the same chat twice

    Set your **Postgre URL**, if you want to use your own server. Do nothing with it, if you are going to use **Docker** 
>You probably should change container `--publish` port and `.env` URL port, if you already have something on `5400`. But if so, suppose you know the deal already

4. Start **Docker-containers** (or start your own **Postgre server**):
```bash
npm run dev:up
```

5. Migrate your DB from `/source/prisma/schema.prisma`:
```bash
npm run dev:db:migrate
```

6. You are ready to run the app:
```bash
npm run dev
```

## Hints
By default, `npm run dev:up` would also start the **Adminer** container. It's accessable via `localhost:8080` (by default). **Adminer** is a simple web DB GUI - love it very much

Default creds are:
```
Engine: PostreSQL
Server: postgres
Username: dev
Password: localpass
Database: dev
```

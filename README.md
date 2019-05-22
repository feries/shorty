![Shorty Logo](./client/public/img/logo.svg)

Short is beautiful! Save the world by making it shorter!

# General
⚠️ This project is a work in progress

### Description
TODO

### Project Structure
- CLI (oclif based app)
- Client (create-react-app based app)
- Server (express server for app api)
- Proxy (express server for hint route)
- Sql (sql scripts used by server and proxy)

# Install
You can skip this block if you are going to use it in dockerized environment. Everything is setted up in `docker-compose.yml`, and all configurable parameters are defined into `.env` file.

### Pre-requisite for non-docker environment 
- MySQL >= 5.5.40
- Node.js >= 10.15.0
- Yarn >= 1.10.1 *(optional)*

### Mail Service
Configure the mail service, if you are using a Gmail account, you can follow up [this](https://nodemailer.com/usage/using-gmail/) or [this](https://security.google.com/settings/security/apppasswords)

### Setup
1. Create a database and create tables with `mysql -u username -p password database_name < ./sql/bootstrap/init.sql`
2. Copy the `.env` file with `cp env.dist .env` and edit with your own data.
3. Then you can start the app with `yarn dev` for development environment or `yarn prod` for production.
4. Now it's time to create the first user via CLI app with `./cli/bin/run bootstrap --add-user`, and follow up the instruction on the screen.
5. That's it. 🚀

# To Do
- [X] 🐳 Dockerize **[WIP]**
- [ ] 🚦️ Test with [Jest](https://github.com/facebook/jest) or [AVA](https://github.com/avajs/ava) for backend.
- [ ] 🚨 Enhance user handling with roles.
- [ ] 🌍 i18n
- [ ] 🚀 CI/CD Set up
- [ ] 🤖 Add Google Tag Manager for GA (Google Analytics)
- [ ] 🤯 Migrate to Typescript
- [ ] 🚨 Switch to an ORM like [TypeORM](http://typeorm.io)

# Credit

[Claudio Quaglia](https://github.com/claudioquaglia) (Developer Frontend/Backend)

[Gabriele Pellegrini](https://github.com/gabrielepellegrini) (Designer/Developer Frontend)


# Thanks
[@Feries](https://www.feries.it)

# License
The MIT License (MIT)

Copyright (c) 2019 Feries S.r.l.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

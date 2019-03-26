![Shorty Logo](./client/public/img/logo.svg)

Short is beautiful! Save the world by making it shorter!

# General
### Description

### Project Structure
- Client (create-react-app based app)
- Server (express server for app api)
- Proxy (express server for hint route)
- Sql (sql scripts used by server and proxy)

# Install
You can skip this block if you are going to use it in dockerized environment. Everithing is setted up in `docker-compose.yaml`, 
and all configurable parameters are defined into `.env` file.

### Pre-requisite for non-docker environment 
- MySQL >= 5.5.40
- Node.js >= 10.15.0
- Yarn >= 1.10.1 *(optional)*

### Setup
1. Copy the `.env` file with `cp env.dist .env`
2. Edit the `.env` with your data.
3. Execute bootstrap script with `yarn bootstrap`
4. 

# To Do
- [ ] 🐳 Dockerize. - [WIP]
  - [X] Dockerfiles
  - [X] docker-compose
- [ ] Migrate to [ky](https://github.com/sindresorhus/ky) - [WIP]
  - [X] Login
  - [X] Dashboard
  - [X] Detail
  - [X] Settings
- [ ] ⚠️ Test with [AVA](https://github.com/avajs/ava) for backend and [Jest](https://github.com/facebook/jest) for frontend. 
- [ ] 🚨 Enhance user handling and roles.
- [ ] 🌍 i18n
- [ ] 🚀 CI/CD Set up
- [ ] 🤖 Add Google Tag Manager
- [ ] Switch to an ORM like [TypeORM]()
- [ ] Activate account via `activation-token` to be sent via email after user registration.

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

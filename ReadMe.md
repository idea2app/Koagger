# Koagger

A [Koa][1] middleware provides [Swagger][2] API document & **Mock API** for [routing-controllers][3] framework.

[![NPM Dependency](https://img.shields.io/librariesio/github/idea2app/Koagger.svg)][4]
[![CI & CD](https://github.com/idea2app/Koagger/actions/workflows/main.yml/badge.svg)][5]

[![NPM](https://nodei.co/npm/koagger.png?downloads=true&downloadRank=true&stars=true)][6]

## Usage

```shell
npm install koagger
```

`index.ts`

```typescript
import Koa from 'koa';
import { useKoaServer } from 'routing-controllers';
import { createAPI } from 'koagger';

import controllers from './controller';

const { PORT = 8080 } = process.env,
    { swagger, mocker, router } = createAPI({ controllers, mock: true });

const HOST = `http://localhost:${PORT}`,
    app = new Koa().use(swagger()).use(mocker());

useKoaServer(app, router);

app.listen(PORT, () =>
    console.log(`
HTTP served at ${HOST}
Swagger API served at ${HOST}/docs/
Mock API served at ${HOST}/mock/
`)
);
```

## Development

```shell
git clone https://github.com/idea2app/Koagger.git ~/Desktop/Koagger

cd ~/Desktop/Koagger

pnpm i

pnpm dev  # or just press F5 key in VS Code
```

## Cases

- [NodeTS-LeanCloud][7] scaffold
- [REST-Node-ts][8] scaffold

[1]: https://koajs.com/
[2]: https://swagger.io/
[3]: https://github.com/typestack/routing-controllers
[4]: https://libraries.io/npm/koagger
[5]: https://github.com/idea2app/Koagger/actions/workflows/main.yml
[6]: https://nodei.co/npm/koagger/
[7]: https://github.com/idea2app/NodeTS-LeanCloud
[8]: https://github.com/idea2app/REST-Node-ts

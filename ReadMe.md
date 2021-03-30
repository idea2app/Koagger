# Koagger

A [Koa][1] middleware provides [Swagger][2] API document & **Mock API** for [routing-controllers][3] framework.

[![NPM Dependency](https://david-dm.org/TechQuery/Koagger.svg)][4]
[![CI & CD](https://github.com/TechQuery/Koagger/workflows/CI%20&%20CD/badge.svg)][5]
[![NPM](https://nodei.co/npm/koagger.png?downloads=true&downloadRank=true&stars=true)][6]

## Usage

```shell
npm install koagger \
    koa koa-mount \
    routing-controllers class-transformer class-validator
```

`index.ts`

```typescript
import Koa from 'koa';
import { useKoaServer } from 'routing-controllers';
import { createAPI } from 'koagger';

import controllers from './controller';

const port = process.env.PORT || 8080,
    { swagger, mocker, router } = createAPI({ controllers, mock: true });

const app = new Koa().use(swagger()).use(mocker());

useKoaServer(app, router);

app.listen(port, () => {
    const baseURL = `http://localhost:${port}`;

    console.log(`HTTP Server runs at ${baseURL}`);
    console.log(`RESTful API document serves at ${baseURL}/docs`);
    console.log(`Mock API serves at ${baseURL}/mock`);
});
```

## Cases

-   [NodeTS-LeanCloud][7] scaffold

[1]: https://koajs.com/
[2]: https://swagger.io/
[3]: https://github.com/typestack/routing-controllers
[4]: https://david-dm.org/TechQuery/Koagger
[5]: https://github.com/TechQuery/Koagger/actions
[6]: https://nodei.co/npm/koagger/
[7]: https://github.com/idea2app/NodeTS-LeanCloud

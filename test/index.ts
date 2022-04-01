import 'reflect-metadata';
import { IsInt, Min, IsDateString } from 'class-validator';
import Koa from 'koa';
import { JsonController, Get, useKoaServer } from 'routing-controllers';
import { ResponseSchema } from 'routing-controllers-openapi';

import { createAPI } from '../source';

class Base {
    @IsInt()
    @Min(1)
    id: number;

    @IsDateString()
    createdAt: string;

    @IsDateString()
    updatedAt: string;
}

@JsonController('/')
class BaseController {
    @Get()
    @ResponseSchema(Base)
    getEntry() {
        const createdAt = new Date().toJSON();

        return { id: 1, createdAt, updatedAt: createdAt };
    }
}

const { swagger, mocker, router } = createAPI({
        mock: true,
        controllers: [BaseController]
    }),
    { PORT = 8080 } = process.env;

const HOST = `http://localhost:${PORT}`,
    app = new Koa().use(swagger()).use(mocker());

useKoaServer(app, router);

app.listen(8080, () =>
    console.log(`
HTTP served at ${HOST}
Swagger API served at ${HOST}/docs/
Mock API served at ${HOST}/mock/
`)
);

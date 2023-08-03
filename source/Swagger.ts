import { getMetadataArgsStorage } from 'routing-controllers';
import { routingControllersToSpec } from 'routing-controllers-openapi';
// @ts-ignore
import { defaultMetadataStorage } from 'class-transformer/cjs/storage';
import { validationMetadatasToSchemas } from 'class-validator-jsonschema';
import { koaSwagger, KoaSwaggerUiOptions } from 'koa2-swagger-ui';
import type {} from 'openapi3-ts';

export interface SwaggerOptions {
    controllers: (new (...data: any[]) => any)[];
}

export function createSwagger({ controllers }: SwaggerOptions) {
    const router = { controllers },
        schemas = validationMetadatasToSchemas({
            classTransformerMetadataStorage: defaultMetadataStorage,
            refPointerPrefix: '#/components/schemas/'
        });
    const spec = routingControllersToSpec(getMetadataArgsStorage(), router, {
        components: { schemas }
    });
    const swagger = ({
        swaggerOptions,
        ...opitons
    }: Partial<KoaSwaggerUiOptions> = {}) =>
        koaSwagger({ swaggerOptions: { spec, ...swaggerOptions }, ...opitons });

    return { router, schemas, spec, swagger };
}

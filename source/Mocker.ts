import Koa, { Context } from 'koa';
import mount from 'koa-mount';
import OpenAPIBackend, { Document } from 'openapi-backend';

export interface MockerOptions {
    spec: Document;
}

export function createMocker({ spec }: MockerOptions) {
    const mocker = new OpenAPIBackend({
        definition: spec as Document,
        handlers: {
            notImplemented(
                { api, operation: { operationId } },
                context: Context
            ) {
                const { status, mock } = api.mockResponseForOperation(
                    operationId
                );
                context.status = status;
                context.body = mock;
            }
        }
    });
    mocker.init();

    const app = new Koa().use(context =>
        mocker.handleRequest(context.request, context)
    );
    return () => mount('/mock', app);
}

import { Document } from 'openapi-backend';

import { createSwagger, SwaggerOptions } from './Swagger';
import { createMocker } from './Mocker';

export * from './Swagger';
export * from './Mocker';

export interface APIOptions extends SwaggerOptions {
    mock?: boolean;
}

export function createAPI({ controllers, mock }: APIOptions) {
    const { spec, ...swagger } = createSwagger({ controllers });

    return {
        spec,
        ...swagger,
        mocker: mock && createMocker({ spec: spec as Document })
    };
}

import { SetMetadata } from '@nestjs/common';

export const RESPONSE_INCLUDE = 'responseInclude';

export const ResponseInclude = (...fields: string[]) => SetMetadata(RESPONSE_INCLUDE, fields);

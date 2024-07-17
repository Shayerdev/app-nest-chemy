import {Injectable, NestInterceptor, ExecutionContext, CallHandler} from '@nestjs/common';
import {Observable} from 'rxjs';
import {Reflector} from '@nestjs/core';
import {map} from 'rxjs/operators';

@Injectable()
export class ResponseIncludeInterceptor implements NestInterceptor {
    /**
     *
     * @param reflector
     */
    constructor(private reflector: Reflector) {
    }

    /**
     *
     * @param context
     * @param next
     */
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const includeFields = this.reflector.get<string[]>('responseInclude', context.getHandler()) || [];

        return next.handle().pipe(
            map(data => {
                return this.filterFields(data, includeFields);
            }),
        );
    }

    /**
     *
     * @param data
     * @param fields
     * @private
     */
    private filterFields(data: any, fields: string[]) {
        if (!Array.isArray(data)) {
            return this.filterObject(data, fields);
        }
        return data.map(item => this.filterObject(item, fields));
    }

    /**
     *
     * @param object
     * @param fields
     * @private
     */
    private filterObject(object: any, fields: string[]) {
        return fields.reduce((filteredObj, field) => {
            if (object.hasOwnProperty(field) && object[field] !== null) {
                filteredObj[field] = object[field];
            }
            return filteredObj;
        }, {});
    }
}

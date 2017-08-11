/// <reference types="supertest" />
import { SuperTest, Test } from 'supertest';
import Service from '../../../serviceFactory/Service';
export interface Result {
    readonly service: Service;
    readonly supertest: SuperTest<Test>;
}
declare const _default: () => Result;
export default _default;

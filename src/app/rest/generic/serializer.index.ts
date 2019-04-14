import { IUniqueStringIndex } from './uniquestring.index';

export interface ISerializer<T extends IUniqueStringIndex> {
  fromJson(json: any): T;
  toJson(resource: T): string;
}

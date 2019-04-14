import { ISerializer } from './serializer.index';
import { IUniqueStringIndex } from './uniquestring.index';

export class UniqueStringSerializer<T extends IUniqueStringIndex> implements ISerializer<T> {
  fromJson(json: any): T {
    try {
        if (typeof json === 'string') {
            return <T>JSON.parse(json);
        } else {
            return <T>json;
        }
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }
  toJson(resource: T): string {
    try {
      return JSON.stringify(resource);
    } catch (ex) {
      console.log(ex);
      return null;
    }
  }
}

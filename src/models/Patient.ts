import { ObjectId } from 'bson';
import { ObjectSchema } from 'realm';

class Patient {
  id: ObjectId;

  constructor({ id = new ObjectId() }) {
    this.id = id;
  }

  static schema: ObjectSchema = {
    name: 'Patient',
    primaryKey: 'id',
    properties: {
      id: 'objectId',
    },
  };
}

export { Patient };

import halson from "halson";

export class ModelBase {
  getResource(data: any) {
    return halson(data);
  }
}

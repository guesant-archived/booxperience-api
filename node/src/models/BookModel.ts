import { URIGenerator } from "@/routing/URIGenerator";
import { ModelBase } from "./ModelBase";

export class BookModel extends ModelBase {
  id: number;
  name: string;
  author: string;
  language: string;
  rating: number;
  constructor(data: any) {
    super();
    this.id = data._id;
    this.name = data.name;
    this.author = data.author;
    this.language = data.language;
    this.rating = data.rating;
  }
  async getResource(uriGenerator: URIGenerator) {
    const { id, name, author, language, rating } = this;
    const resource = super.getResource({ id, name, author, language, rating });
    await this.addLinks(resource, uriGenerator);
    return resource;
  }
  async addLinks(resource: any, uriGenerator: URIGenerator) {
    const removeURI: any = uriGenerator.getURI(
      "BooksListController_removeBook",
      {
        id: this.id,
      },
    );
    if (removeURI) {
      resource.addLink(removeURI.id, removeURI);
    }
    const rateURI: any = uriGenerator.getURI("BooksListController_rateBook", {
      id: this.id,
    });
    if (rateURI) {
      resource.addLink(rateURI.id, rateURI);
    }
  }
}

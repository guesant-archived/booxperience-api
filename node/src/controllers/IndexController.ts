import { ControllerBase } from "@/controllers/ControllerBase";
import halson from "halson";

export type IndexControllerActions = "index";

export class IndexController extends ControllerBase {
  async index() {
    const indexURI = this.uriGenerator.getURI(
      "IndexController_index",
      {},
      "_self",
    );
    const getBooksURI = this.uriGenerator.getURI(
      "BooksListController_getBooks",
    );
    const getBookURI = this.uriGenerator.getURI("BooksListController_getBook");
    const rateBookURI = this.uriGenerator.getURI(
      "BooksListController_rateBook",
    );
    const removeBookURI = this.uriGenerator.getURI(
      "BooksListController_removeBook",
    );
    const resource = halson({ api: "api v1" });
    try {
      const links = await Promise.all([
        indexURI,
        getBooksURI,
        getBookURI,
        rateBookURI,
        removeBookURI,
      ]);
      links.forEach((link: any) => {
        link && resource.addLink(link.id, link);
      });
      super.ok(resource);
    } catch (err) {
      super.error(err);
    }
  }
}

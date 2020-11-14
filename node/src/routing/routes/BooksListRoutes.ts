import {
  BooksListController,
  BooksListControllerActions,
} from "@/controllers/BooksListController";
import { RoutesBase } from "./RoutesBase";

export class BooksListRoutes extends RoutesBase<
  any,
  BooksListControllerActions
> {
  constructor() {
    super(BooksListController);
  }
  getRoutes() {
    this.addRoute("/books", "get", "getBooks");
    this.addRoute("/books/:id", "get", "getBook");
    this.addRoute("/books/:id", "delete", "removeBook");
    this.addRoute("/books/:id/rate", "put", "rateBook");
    return this.routes;
  }
}

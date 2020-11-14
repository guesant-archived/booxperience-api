import { BookModel } from "@/models/BookModel";
import { ControllerBase } from "./ControllerBase";

export type BooksListControllerActions =
  | "getBooks"
  | "getBook"
  | "rateBook"
  | "removeBook";

export class BooksListController extends ControllerBase {
  async getBooks() {
    try {
      if (!this.repository.book) return;
      const books: any[] = this.repository.book.getAll();
      const resources = await Promise.all(
        books.map(async (book) => {
          const model = new BookModel(book);
          const resource = await model.getResource(this.uriGenerator);
          return resource;
        }),
      );
      this.ok(resources);
    } catch (err) {
      this.error(err);
    }
  }
  async getBook() {
    const { id } = this.params;
    try {
      if (!this.repository.book) return;
      const book = this.repository.book.getById(id as any);
      const bookModel = new BookModel(book);
      const resource = await bookModel.getResource(this.uriGenerator);
      this.ok(resource);
    } catch (err) {
      this.error(err);
    }
  }
  async rateBook() {
    const { id } = this.params;
    const { rating } = this.body;
    try {
      if (!this.repository.book) return;
      this.repository.book.rateBook(id as any, rating);
      const book = this.repository.book.getById(id as any);
      const bookModel = new BookModel(book);
      const resource = await bookModel.getResource(this.uriGenerator);
      this.ok(resource);
    } catch (err) {
      this.error(err);
    }
  }
  async removeBook() {
    const { id } = this.params;
    try {
      if (!this.repository.book) return;
      this.repository.book.removeById(id as any);
      this.notContent();
    } catch (err) {
      this.error(err);
    }
  }
}

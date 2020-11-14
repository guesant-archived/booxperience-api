import { RepositoryBase } from "./RepositoryBase";

export class BookRepository extends RepositoryBase {
  booksCollection: { [key: string]: any }[];
  constructor(db: any) {
    super();
    this.booksCollection = db.books;
  }
  getAll() {
    return this.booksCollection;
  }
  getById(id: number) {
    return this.booksCollection.find((book) => book._id === +id);
  }
  removeById(id: number) {
    this.booksCollection = this.booksCollection.filter(
      (book) => book._id !== id,
    );
  }
  rateBook(id: number, rating: number) {
    const book: any = this.getById(id);
    book.rating = rating;
  }
}

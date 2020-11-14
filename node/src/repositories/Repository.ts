import { BookRepository } from "./BookRepository";
import { UserRepository } from "./UserRepository";

export class Repository {
  _db: any;
  book?: BookRepository;
  user?: UserRepository;
  constructor(db: any) {
    this._db = db;
  }
  registerRepositories() {
    this.book = new BookRepository(this._db);
    this.user = new UserRepository(this._db);
  }
}

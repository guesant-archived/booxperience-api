import { RepositoryBase } from "./RepositoryBase";

export class UserRepository extends RepositoryBase {
  usersCollection: any[];
  constructor(db: any) {
    super();
    this.usersCollection = db.users;
  }
  getById(id: number) {
    return this.usersCollection.find((user) => user._id === +id);
  }
  getByEmail(email: string) {
    return this.usersCollection.find((user) => user.email === email);
  }
}

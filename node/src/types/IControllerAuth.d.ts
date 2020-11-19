export type IControllerAuthNotAuthed = { isAuthed: false; user: null };

export type IControllerAuthAuthed = { isAuthed: true; user: IUserDoc };

export type IControllerAuth = IControllerAuthNotAuthed | IControllerAuthAuthed;

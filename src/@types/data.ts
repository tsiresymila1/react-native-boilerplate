export enum UserStateEnum {
  Offline = "OFFLINE",
  Online = "ONLINE",
  OnlineLast = "ONLINE"
}

export type UserState = {
  id: number;
  user: User;
  status: UserStateEnum;
  createdAt: Date;
  updatedAt: Date;
};

export type User = {
  id: number;

  username: string;

  password: string;

  state: UserState;

  image: string;

  chats: Chat[];

  createdAt: Date;

  updatedAt: Date;
};

export type Chat = {
  id: number;

  name?: string;
  room: string;

  messages: Message[];

  participants: User[];

  initiator: User;

  createdAt: Date;

  updatedAt: Date;
};

export type Message = {
  id: number;

  name?: string;

  uuid: string;

  content?: string;

  sender: User;

  chat: Chat;

  type: Number;

  readers: User[];

  createdAt: Date;

  updatedAt: Date;
};

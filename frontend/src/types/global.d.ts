import "reactn";

type UserState = {
  name: string;
  room_id: number;
};

declare module "reactn/default" {
  export interface State {
    user: UserState | null;
  }
}

import "reactn";
declare module "reactn/default" {
  export interface State {
    user: { name: string; room_id: number; id: number } | null;
    error: boolean;
  }
}

type UserFromSupabase = {
  avatar: string | null;
  id: number;
  name: string | null;
  username: string | null;
};
export type UserSupabaseAccount = UserFromSupabase | null;

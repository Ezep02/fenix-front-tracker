export interface User {
  id: number;
  name: string;
  surname:string;
  username:string
  password:string
  email: string;
  is_active:boolean
  created_at: Date
}
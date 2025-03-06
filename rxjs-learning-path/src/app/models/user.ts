export interface UserData {
  id: string;
  name: string;
  role: Role;
}

type Role = 'User' | 'Admin';

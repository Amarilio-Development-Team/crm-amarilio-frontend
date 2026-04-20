type UserRole = 'admin' | 'editor' | 'viewer';
type UserStatus = 'active' | 'inactive' | 'banned';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  roles: UserRole[];
  status: UserStatus;
  token: string;
}

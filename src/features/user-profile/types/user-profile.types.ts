export interface UserProfileData {
  id: string;
  name: string;
  paternalName: string;
  maternalName: string;
  email: string;
  phoneNumber?: string;
  avatarUrl?: string;
  state?: string;
}

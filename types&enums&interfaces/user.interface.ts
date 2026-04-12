import { UserRoles } from "./enums";

export interface UserData {
  id: string;
  name: string;
  image: string;
  role: UserRoles;
  createdAt: string;
  updatedAt: string;
  email: string;
  phone: string;
  isDeleted: boolean;
  deletedAt: string;
  needPasswordChange: boolean;
}

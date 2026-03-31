export type registerUserRequest = {
  email: string;
  password: string;
  name: string;
};
export interface ILoginResponse {
  accessToken: string;
  refreshToken: string;
  token: string;
  redirect: boolean;
  user: {
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    createdAt: string;
    updatedAt: string;
    role: string;
    profileStatus: string;
    isDeleted: boolean;
    needPasswordChange: boolean;
    deletedAt: string | null;
    id: string;
  };
}
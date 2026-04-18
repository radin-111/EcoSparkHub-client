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

export interface SessionResponse {
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: string | null;
    role: string;
    createdAt: string;
    needPasswordChange: boolean;
    profileStatus: string;
    isDeleted: boolean;
    deletedAt: string | null;
    updatedAt: string;
  };
}
export interface signupUserRequest {
  email: string;
  password: string;
  name: string;
}




export interface VerifyEmailResponse {

  accessToken: string;
  refreshToken: string;
  status: boolean;
  token: string;
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

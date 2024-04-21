export type UpdateProfileRequest = {
  id: string;
  username: string;
  firstName?: string;
  lastName?: string;
};

export type UpdatePasswordRequest = {
  id: string;
  oldPassword: string;
  newPassword: string;
};

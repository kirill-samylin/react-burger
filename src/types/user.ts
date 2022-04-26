export type TEmail = {
  email: string;
};

export type TPassword = {
  password: string;
};

export type TName = {
  name: string;
};

export type TCode = {
  code: string;
};

export type TLoginValues = TEmail & TPassword;

export type TRegistrationValues = TEmail & TPassword & TName;

export type TResetPasswordValues = TCode & TPassword;

export type TUser = TEmail & TName;

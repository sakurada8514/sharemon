export type RegistExpenseFormProps = {
  registExpense: () => Promise<void>;
  expense: string;
  date: Date;
  category: number;
  comment: string;
  repetition: boolean;
  fileInput: React.MutableRefObject<null>;
  receiptImgPreview: any;
  categoryList: any;
  errors: any;
  loading: boolean;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  handleChangeExpense: (e: any) => void;
  handleChangeCategory: (e: any) => void;
  handleChangeComment: (e: any) => void;
  handleToggleRepetition: () => void;
  handleChangeFile: (e) => void;
  handleClickFileInput: () => void;
  handleFileReset: () => void;
};

type AuthFormProps = {
  email: string;
  password: string;
  handleChangeEmail: (e: any) => void;
  handleChangePassword: (e: any) => void;
  loading: boolean;
  errors: any;
};

export type LoginFormProps = {
  login: (e: any) => Promise<void>;
  remember: boolean;
  handleChangeRemember: (e: any) => void;
  pushRegist: () => void;
  pushPasswordReset: () => void;
} & AuthFormProps;

export type RegistFormProps = {
  regist: (e: any) => Promise<void>;
  name: string;
  password_confirmation: string;
  isInvite: boolean;
  handleChangeName: (e: any) => void;
  handleChangePasswordConfirmation: (e: any) => void;
  pushLogin: (e) => void;
} & AuthFormProps;

export type ReregistPasswordFormProps = {
  password_confirmation: string;
  reregistPassword: (e: any) => Promise<void>;
  handleChangePasswordConfirmation: (e: any) => void;
  pushLogin: (e) => void;
} & Pick<
  AuthFormProps,
  "password" | "handleChangePassword" | "errors" | "loading"
>;

export type ResetPasswordFormProps = {
  resetPassword: (e: any) => Promise<void>;
  pushLogin: (e) => void;
} & Pick<AuthFormProps, "email" | "handleChangeEmail" | "errors" | "loading">;

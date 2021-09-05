export type RegistExpenseFormProps = {
  registExpense: () => Promise<void>;
  expense: string;
  date: Date;
  category: number;
  comment: string;
  repetition: boolean;
  fileInput: React.MutableRefObject<null>;
  receiptImgPreview: string;
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
};

export type LoginFormProps = {
  login: (e: any) => Promise<void>;
  remember: boolean;
  errors: any;
  handleChangeRemember: (e: any) => void;
  pushRegist: () => void;
  pushPasswordReset: () => void;
} & AuthFormProps;

export type RegistFormProps = {
  regist: (e: any) => Promise<void>;
  name: string;
  password_confirmation: string;
  errors: any;
  isInvite: boolean;
  handleChangeName: (e: any) => void;
  handleChangePasswordConfirmation: (e: any) => void;
  pushLogin: (e) => void;
} & AuthFormProps;

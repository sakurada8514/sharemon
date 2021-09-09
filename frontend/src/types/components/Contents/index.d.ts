export type RegistMoneyProps = {
  handleAlertOpen: (closedTime?: number) => void;
  setAlertSeverity: Dispatch<SetStateAction<string>>;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

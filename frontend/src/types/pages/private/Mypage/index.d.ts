export type MypageRoutersProps = {
  handleAlertOpen: (closedTime?: number) => void;
  setAlertSeverity: React.Dispatch<React.SetStateAction<string>>;
  setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
};

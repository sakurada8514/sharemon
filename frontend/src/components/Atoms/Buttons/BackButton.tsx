import React from "react";
import { useHistory } from "react-router";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const BackButton: React.FC<{}> = () => {
  const history = useHistory();
  const handleBackClick = () => history.goBack();
  return (
    <button className="flex items-center py-2" onClick={handleBackClick}>
      <NavigateBeforeIcon className="w-7 h-7" />
      <span className="text-lg">戻る</span>
    </button>
  );
};

export default BackButton;

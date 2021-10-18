import React from "react";
import EditIcon from "@mui/icons-material/Edit";
import { IconButton } from "@mui/material";
import { IconButtonProps } from "@mui/material";

const EditIconButton: React.FC<{
  handleEditButtonClick: () => void;
  size: IconButtonProps["size"];
}> = ({ handleEditButtonClick, size }) => {
  return (
    <IconButton
      aria-label="edit"
      size={size}
      color="primary"
      onClick={handleEditButtonClick}
    >
      <EditIcon fontSize="inherit" />
    </IconButton>
  );
};
export default EditIconButton;

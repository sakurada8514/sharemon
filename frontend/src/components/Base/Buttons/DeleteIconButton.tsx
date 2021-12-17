import React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton } from "@mui/material";
import { IconButtonProps } from "@mui/material";

const DeleteIconButton: React.FC<{
  handleDeleteButtonClick: () => void;
  size: IconButtonProps["size"];
}> = ({ handleDeleteButtonClick, size }) => {
  return (
    <IconButton
      aria-label="delete"
      size={size}
      onClick={handleDeleteButtonClick}
    >
      <DeleteIcon fontSize="inherit" className="text-red-500" />
    </IconButton>
  );
};
export default DeleteIconButton;

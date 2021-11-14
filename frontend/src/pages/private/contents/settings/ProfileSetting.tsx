import React, { useState, useEffect, useRef } from "react";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";

const ProfileSetting = () => {
  const [name, setName] = useState("");
  const [iconImg, setIconImg] = useState("");
  const [iconImgPreview, setIconImgPreview] = useState<any>("");

  const fileInput = useRef(null);

  const handleChangeName = (e: any) => {
    setName(e.target.value);
  };

  const handleClickFileInput = () => {
    fileInput.current.click();
  };
  const handleChangeFile = (e: any) => {
    const files = e.target.files;

    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target) {
          setIconImgPreview(e.target.result);
        }
      };
      reader.readAsDataURL(file);

      setIconImg(file);
    }
  };
  const handleFileReset = () => {
    fileInput.current.value = "";
    setIconImg("");
    setIconImgPreview("");
  };
  return (
    <div className="px-4 pt-2">
      <Typography variant="h5" gutterBottom>
        プロフィール
      </Typography>
      <TextField
        variant="outlined"
        margin="normal"
        required
        fullWidth
        name="name"
        label="名前"
        type="name"
        id="name"
        autoComplete="current-name"
        value={name}
        onChange={handleChangeName}
        // error={
        //   typeof errors.name !== "undefined" ||
        //   typeof errors.auth !== "undefined"
        // }
        // helperText={errors.name || errors.auth}
      />
      <div className="flex justify-between items-center mt-6">
        <p className="">アイコン</p>
        <img className="w-12 h-12 rounded-full" src={iconImgPreview} />
      </div>
      <input
        id="myInput"
        type="file"
        accept="image/*"
        ref={fileInput}
        style={{ display: "none" }}
        onChange={handleChangeFile}
      />
      <Button
        variant="outlined"
        color="primary"
        size={"large"}
        // startIcon={<ReceiptIcon />}
        className="py-1 px-12 text-lg mt-4 w-full"
        onClick={handleClickFileInput}
      >
        アイコン変更
      </Button>
    </div>
  );
};
export default ProfileSetting;

import React, { useState, useEffect, useRef, useGlobal } from "reactn";
import { TextField } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import { Button } from "@material-ui/core";
import LoadingButton from "components/Atoms/Buttons/LoadingButton";
import { AlertProps } from "@material-ui/lab";
import { Dispatch, SetStateAction } from "react";
import { OK, VALIDATION } from "utils/constant";

import { editProfile } from "api/User/index";

type ProfileSettingProps = {
  handleAlertOpen: (closedTime?: number) => void;
  setAlertSeverity: React.Dispatch<
    React.SetStateAction<AlertProps["severity"]>
  >;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

const ProfileSetting: React.FC<ProfileSettingProps> = ({
  handleAlertOpen,
  setAlertSeverity,
  setAlertMessage,
}) => {
  const [name, setName] = useState("");
  const [iconImg, setIconImg] = useState("");
  const [iconImgPreview, setIconImgPreview] = useState<any>("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState([]);
  const user = useGlobal("user")[0];

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
  async function editProfileSubmit() {
    setLoading(true);
    const response = await editProfile(user.id, name, iconImg);

    if (response.status === OK) {
      handleAlertOpen();
      setAlertMessage("正常に支出を作成しました");
    } else if (response.status === VALIDATION) {
      setErrors(response.data.errors);
    } else {
      handleAlertOpen(6000);
      setAlertSeverity("error");
      setAlertMessage(
        "何かしらのエラーが発生しました。時間をおいてから再度お試しください。"
      );
    }
    setLoading(false);
  }
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
        className="py-1 px-12 mt-4 mb-8 w-full"
        onClick={handleClickFileInput}
      >
        アイコン変更
      </Button>
      <LoadingButton
        handleButtonClick={editProfileSubmit}
        loading={loading}
        text={"プロフィール編集"}
        color={"secondary"}
        fullWidth={true}
      />
    </div>
  );
};
export default ProfileSetting;

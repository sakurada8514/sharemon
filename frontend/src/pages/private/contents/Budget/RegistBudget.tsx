import React, { useState } from "react";
import { useHistory } from "react-router";
import useSWR from "swr";

import BudgetForm from "components/Form/BudgetForm";
import BackButton from "components/Base/Buttons/BackButton";
import { OK, VALIDATION } from "utils/constant";

import { fetcherApi } from "api/fetcher";
import { registBudget as registBudgetApi } from "api/Budget";

import { Dispatch, SetStateAction } from "react";
import { AlertProps } from "@material-ui/lab";

type RegistBudgetProps = {
  handleAlertOpen: (closedTime?: number) => void;
  setAlertSeverity: React.Dispatch<
    React.SetStateAction<AlertProps["severity"]>
  >;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

const RegistBudget: React.FC<RegistBudgetProps> = ({
  handleAlertOpen,
  setAlertSeverity,
  setAlertMessage,
}) => {
  const history = useHistory();

  const [category, setCategory] = useState(1);
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);

  const { data: categoryList, error: categoryListError } = useSWR(
    ["/expensecategory", "categoryList"],
    fetcherApi,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const handleChangeBudget = (e: any) => setBudget(e.target.value);
  const handleChangeCategory = (e: any) => setCategory(e.target.value);

  const registBudget = async () => {
    setLoading(true);
    const response = await registBudgetApi(category, budget);

    if (response.status === OK) {
      handleAlertOpen();
      setAlertMessage("正常に予算を作成しました");
      history.goBack();
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
  };
  return (
    <div className="px-4 py2">
      <BackButton />
      <BudgetForm
        budget={budget}
        errors={errors}
        category={category}
        handleChangeCategory={handleChangeCategory}
        handleChangeBudget={handleChangeBudget}
        categoryList={categoryList}
        loading={loading}
        buttonText="予算作成"
        apiMethod={registBudget}
      />
    </div>
  );
};
export default RegistBudget;

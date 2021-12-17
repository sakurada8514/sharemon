import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useHistory, useParams } from "react-router";
import useSWR from "swr";
import { AlertProps } from "@material-ui/lab";

import BudgetForm from "components/Form/BudgetForm";
import BackButton from "components/Base/Buttons/BackButton";
import AjaxLoading from "components/Base/Loading/AjaxLoading";
import { OK, VALIDATION } from "utils/constant";

import { fetcherApi } from "api/fetcher";
import { editBudget as editBudgetApi } from "api/Budget";

type EditBudgetProps = {
  handleAlertOpen: (closedTime?: number) => void;
  setAlertSeverity: React.Dispatch<
    React.SetStateAction<AlertProps["severity"]>
  >;
  setAlertMessage: Dispatch<SetStateAction<string>>;
};

type EditBudgetRouteParams = {
  id: string;
};

const EditBudget: React.FC<EditBudgetProps> = ({
  handleAlertOpen,
  setAlertSeverity,
  setAlertMessage,
}) => {
  const history = useHistory();
  const { id } = useParams<EditBudgetRouteParams>();

  const [category, setCategory] = useState(1);
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ajaxLoading, setAjaxLoading] = useState(true);

  const { data: categoryList, error: categoryListError } = useSWR(
    ["/expensecategory", "categoryList"],
    fetcherApi,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );

  useEffect(() => {
    getBudgetDetail();
  }, []);

  const getBudgetDetail = async () => {
    const response = await fetcherApi("/budget/" + id);

    if (response.status === OK) {
      setCategory(response.data.detail.category_id);
      setBudget(response.data.detail.budget);
    } else {
      history.push("/error");
    }
    setAjaxLoading(false);
  };
  const handleChangeBudget = (e: any) => setBudget(e.target.value);
  const handleChangeCategory = (e: any) => setCategory(e.target.value);

  const editBudget = async () => {
    setLoading(true);
    const response = await editBudgetApi(id, category, budget);

    if (response.status === OK) {
      handleAlertOpen();
      setAlertMessage("正常に予算を編集しました");
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
        buttonText="予算編集"
        apiMethod={editBudget}
      />
      {ajaxLoading && <AjaxLoading />}
    </div>
  );
};
export default EditBudget;

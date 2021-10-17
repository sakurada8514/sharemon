import React, { useState } from "react";
import { useHistory } from "react-router";
import useSWR from "swr";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

import BudgetForm from "components/Form/BudgetForm";

import { fetcherApi } from "api/fetcher";
const RegistBudget = () => {
  const history = useHistory();
  const [category, setCategory] = useState(1);
  const [errors, setErrors] = useState([]);

  const { data: categoryList, error: categoryListError } = useSWR(
    ["/expensecategory", "categoryList"],
    fetcherApi,
    {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  );
  const handleBackClick = () => [history.goBack()];
  const handleChangeCategory = (e: any) => setCategory(e.target.value);
  return (
    <>
      <button className="flex items-center py-2" onClick={handleBackClick}>
        <NavigateBeforeIcon className="w-7 h-7" />
        <span className="text-lg">戻る</span>
      </button>
      <BudgetForm
        errors={errors}
        category={category}
        handleChangeCategory={handleChangeCategory}
        categoryList={categoryList}
      />
    </>
  );
};
export default RegistBudget;

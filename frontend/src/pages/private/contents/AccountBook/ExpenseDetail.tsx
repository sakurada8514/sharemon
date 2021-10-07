import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import { fetcherApi } from "api/fetcher";

type ExpenseDetailRouteParams = {
  id: string;
};

const ExpenseDetail = () => {
  const { id } = useParams<ExpenseDetailRouteParams>();

  const { data: detail, error } = useSWR(
    ["expense/" + id, "detail"],
    fetcherApi
  );
  return (
    <div>
      <p>{detail.name}</p>
    </div>
  );
};

export default ExpenseDetail;

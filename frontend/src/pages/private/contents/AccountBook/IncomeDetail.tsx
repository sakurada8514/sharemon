import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";

import { fetcherApi } from "api/fetcher";

type IncomeDetailRouteParams = {
  id: string;
};

const IncomeDetail = () => {
  const { id } = useParams<IncomeDetailRouteParams>();

  const { data: detail, error } = useSWR(
    ["income/" + id, "detail"],
    fetcherApi
  );
  return (
    <div>
      <p>{detail && detail.name}</p>
    </div>
  );
};

export default IncomeDetail;

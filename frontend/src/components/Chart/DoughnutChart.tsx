import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import MediaQuery from "react-responsive";

import { GRAPH_COLOR_LIST, DOUGHNUT_GRAPH_OPTIONS } from "utils/constant";

type ChartProps = {
  datas: number[];
  labels: string[];
  graphName: string;
  total: number;
};

const DoughnutChart: React.FC<ChartProps> = ({
  datas,
  labels,
  total,
  graphName,
}) => {
  const graphdata = {
    datasets: [
      {
        data: datas,
        backgroundColor: GRAPH_COLOR_LIST,
      },
    ],
    labels: labels,
  };

  return (
    <div>
      <div className="max-w-min mx-auto relative">
        <MediaQuery query="(min-width: 1024px)">
          <Doughnut
            data={graphdata}
            options={DOUGHNUT_GRAPH_OPTIONS}
            plugins={[ChartDataLabels]}
            width={400}
            height={400}
          />
        </MediaQuery>
        <MediaQuery query="(max-width: 1024px)">
          <Doughnut
            data={graphdata}
            options={DOUGHNUT_GRAPH_OPTIONS}
            plugins={[ChartDataLabels]}
            width={300}
            height={300}
          />
        </MediaQuery>
        <div className="absolute top-2/4 right-2/4 transform translate-x-1/2 -translate-y-2/4">
          <p className="text-xl font-bold text-center">{graphName}</p>
          <p className="text-center text-lg">{total}円</p>
        </div>
      </div>
    </div>
  );
};
export default DoughnutChart;

import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import MediaQuery from "react-responsive";

import { BAR_GRAPH_OPTIONS } from "utils/constant";

const BarChart = ({ datas, labels }) => {
  const graphdata = {
    datasets: [
      {
        data: datas,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(255, 159, 64, 0.2)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ], // グラフの枠線の色
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "rgb(201, 203, 207)",
        ],
        // グラフの枠線の太さ
        borderWidth: 1,
      },
    ],
    labels: labels,
  };

  return (
    <div>
      <div className="max-w-min mx-auto relative">
        <MediaQuery query="(max-width: 767px)">
          <Bar
            data={graphdata}
            options={BAR_GRAPH_OPTIONS}
            plugins={[ChartDataLabels]}
            width={320}
            height={200}
          />
        </MediaQuery>
        <MediaQuery query="(max-width: 1024px)">
          <MediaQuery query="(min-width: 767px)">
            <Bar
              data={graphdata}
              options={BAR_GRAPH_OPTIONS}
              plugins={[ChartDataLabels]}
              width={500}
              height={350}
            />
          </MediaQuery>
        </MediaQuery>
        <MediaQuery query="(min-width: 1024px)">
          <Bar
            data={graphdata}
            options={BAR_GRAPH_OPTIONS}
            plugins={[ChartDataLabels]}
            width={800}
            height={550}
          />
        </MediaQuery>
      </div>
    </div>
  );
};
export default BarChart;

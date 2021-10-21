import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

function ExpenseChart() {
  const graphdata = {
    datasets: [
      {
        data: [15, 25, 35, 25, 35, 25, 35],
        backgroundColor: ["#B9D8F7", "#FFE5EC", "#DEDFE0"],
      },
    ],
  };
  const labels = [
    "item1",
    "item2",
    "item3",
    "item1",
    "item2",
    "item3",
    "item1",
  ];
  const doughnutOptions = {
    tooltips: {
      enabled: false,
    },
    responsive: true,
    plugins: {
      datalabels: {
        color: "#111111",
        font: {
          size: 20,
        },
        formatter: (value, ctx) => {
          return labels[ctx.dataIndex] + value + "%";
        },
      },
    },
  };

  return (
    <div>
      <div>
        <Doughnut
          data={graphdata}
          options={doughnutOptions}
          plugins={[ChartDataLabels]}
        />
      </div>
    </div>
  );
}
export default ExpenseChart;

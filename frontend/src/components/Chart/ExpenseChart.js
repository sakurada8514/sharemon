import { Doughnut, Chart } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

function ExpenseChart() {
  Chart.register(ChartDataLabels);
  const graphdata = {
    datasets: [
      {
        data: [15, 25, 35],
        backgroundColor: ["#B9D8F7", "#FFE5EC", "#DEDFE0"],
      },
    ],
    labels: ["item1", "item2", "item3"],
  };

  const doughnutOptions = {
    legend: {
      display: false,
    },
    options: {
      responsive: false,
    },
    plugins: {
      datalabels: {
        color: "#000",
        font: {
          size: 20,
        },
        formatter: (value, ctx) => {
          return value + "%";
        },
      },
    },
  };

  return (
    <div>
      <div>
        <Doughnut data={graphdata} options={doughnutOptions} />
      </div>
    </div>
  );
}
export default ExpenseChart;

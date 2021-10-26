export const OK = 200;
export const UNAUTHORIZED = 401;
export const VALIDATION = 422;
export const FORBIDDEN = 403;

export const BACK_COLOR_GREEN = "#f0f5f1";
export const BACK_COLOR_WHITE = "#fdfdfd";
export const BACK_COLOR_GRAY = "#f2f2f2";
export const SUB_COLOR_GREEN = "#3EBA2B";
export const SUB_COLOR_BLUE = "#4B75B9";
export const TEXT_COLOR_BLACK = "#111111";

export const GRAPH_COLOR_LIST = [
  "#3ba1f6",
  "#10b99d",
  "#ffffa2",
  "#7cb1ff",
  "#5decb1",
  "#ffff6f",
  "#b5d7ff",
  "#95ffd1",
  "#f6cd3b",
  "#edf9ff",
  "#cbffee",
  "#bf9c00",
];

export const DOUGHNUT_GRAPH_OPTIONS = {
  tooltips: {
    enabled: false,
  },
  legend: {
    display: false,
  },
  responsive: false,
  maintainAspectRatio: false,
  plugins: {
    datalabels: {
      color: "#111111",
      font: {
        size: 16,
      },
      formatter: (value, ctx) => {
        return ctx.chart.data.labels[ctx.dataIndex] + "\n " + value + "%";
      },
    },
  },
};

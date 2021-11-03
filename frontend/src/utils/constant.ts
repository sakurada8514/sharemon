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
  responsive: true,
  maintainAspectRatio: true,
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
export const BAR_GRAPH_OPTIONS = {
  tooltips: {
    enabled: false,
  },
  legend: {
    display: false,
  },
  scales: {
    // 軸設定
    xAxes: [
      // Ｘ軸設定
      {
        display: true, // 表示の有無
        gridLines: {
          // 補助線
          display: false, // 補助線なし
        },
        ticks: {
          fontSize: 14, // フォントサイズ
        },
      },
    ],
    yAxes: [
      // Ｙ軸設定
      {
        display: false, // 表示の有無
        gridLines: {
          // 補助線
          display: false, // 補助線なし
        },
        ticks: {
          // 目盛り
          min: 0, // 最小値
        },
      },
    ],
  },
  layout: {
    // 全体のレイアウト
    padding: {
      // 余白
      left: 0,
      right: 0,
      top: 12,
      bottom: 0,
    },
  },
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    datalabels: {
      color: "#111111",
      anchor: "end",
      align: "top",
      font: {
        size: 12,
      },
      formatter: (value, ctx) => {
        return value + "円";
      },
    },
  },
};

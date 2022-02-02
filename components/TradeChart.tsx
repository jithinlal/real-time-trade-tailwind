import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  TooltipItem,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import random from "random";
import { bool, func } from "prop-types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const rand = (prevValue: number) => {
  const value = random.float(-2, 2);
  const newValue = prevValue + value;
  if (newValue <= 0) {
    return 0.1;
  }

  return +newValue.toFixed(2);
};

const TradeChart = ({
  handleBuy,
  handleSell,
  isBuy,
  trigger,
  setHighScore,
}: {
  handleBuy: (x: number) => void;
  handleSell: (x: number) => void;
  isBuy: boolean;
  trigger: boolean;
  setHighScore: () => void;
}) => {
  const [values, setValues] = React.useState([10]);
  const [labels, setLabels] = React.useState([1]);
  const [day, setDay] = React.useState(1);
  const [color, setColor] = React.useState("grey");
  const [newValue, setNewValue] = React.useState(10);
  const [tick, setTick] = React.useState(0);

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: values,
        backgroundColor: color,
        borderColor: color,
        tension: 0.1,
        pointBorderColor: color,
        pointBackgroundColor: color,
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "white",
        pointHoverBorderColor: color,
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        fill: true,
      },
    ],
  };

  React.useEffect(() => {
    let interval = setInterval(() => {
      const A = () => {
        setLabels((prevLabels) => [...prevLabels, day + 1]);
        setValues((prevData) => {
          const lastValue = prevData[prevData.length - 1];
          const updatedValue = rand(lastValue);
          if (updatedValue > lastValue) {
            setColor("rgb(129, 201, 149)");
          } else {
            setColor("rgb(242, 139, 130)");
          }
          setTick(() => {
            if (lastValue === 0) {
              return 0;
            }
            return +((updatedValue - lastValue) / lastValue).toFixed(2);
          });
          setNewValue(updatedValue);
          return [...prevData, updatedValue];
        });
      };
      const B = () => {
        setDay((pre) => pre + 1);
      };

      if (day < 30) {
        A();
        B();
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [day]);

  // you need to pass all the dependencies, and some of them comes from the parent
  // so that should be a dependency for sure, otherwise the parent state changes
  // and the same time child state changes and all that produce racing condition on render
  React.useEffect(() => {
    if (trigger && day < 30) {
      isBuy ? handleBuy(newValue) : handleSell(newValue);
    } else if (day === 30) {
      setHighScore();
    }
  }, [day, handleBuy, handleSell, isBuy, newValue, setHighScore, trigger]);

  return (
    <Line
      options={{
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: true,
            text: `$${newValue}    ${tick}%`,
            color,
            font: {
              family: "Lobster Two",
              size: 20,
            },
          },
          tooltip: {
            callbacks: {
              label(tooltipItem: TooltipItem<any>): string | string[] {
                return " $" + tooltipItem.raw;
              },
              title(tooltipItems: TooltipItem<any>[]): string | string[] {
                return "Day " + tooltipItems[0].label;
              },
            },
          },
        },
        scales: {
          x: {
            grid: {
              display: false,
            },
            ticks: {
              callback: (value) => {
                return `Day ${+value + 1}`;
              },
            },
          },
          y: {
            grid: {
              display: false,
            },
            ticks: {
              callback: (value) => {
                return "$ " + value;
              },
            },
          },
        },
      }}
      data={data}
    />
  );
};

TradeChart.propTypes = {
  handleBuy: func.isRequired,
  handleSell: func.isRequired,
  isBuy: bool,
  trigger: bool,
  setHighScore: func.isRequired,
};

export default TradeChart;

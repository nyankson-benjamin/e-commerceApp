import React, { useEffect } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { colorArray } from "../Constants/ColorArray";
import { Bar, Line } from "react-chartjs-2";
import useSales from "../Hooks/useSales";

function Chart() {
  const [sales] = useSales();

  const price = [];
  const price1 = [];
  const id = [];
  sales?.forEach((element) => {
    price1.push(element.price);
    id.push(element.item);
  });
  const nums = [5, 2, 7, 3];
  price.push(nums);

  ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  const data = {
    labels: id,
    datasets: [
      {
        label: "Sales numbers",
        data: price1,
        // borderColor: "black",
        backgroundColor: colorArray,
        borderWidth: 1,
      },
    ],
  };
  const options = {};

  return (
    <div>
      Chart
      <Bar data={data}></Bar>
    </div>
  );
}

export default Chart;

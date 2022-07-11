import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";
import { Radar } from "react-chartjs-2";

ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

const data = {
  labels: ["cvss3", "port_cve", "", "", ""],
  datasets: [
    {
      label: "cvss3",
      backgroundColor: "rgba(179,181,198,0.2)",
      borderColor: "rgba(179,181,198,1)",
      pointBackgroundColor: "rgba(179,181,198,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(179,181,198,1)",
      data: [65, 59, 90, 81, 56, 55, 40],
    },
    {
      label: "port_cve",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      pointBackgroundColor: "rgba(255,99,132,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(255,99,132,1)",
      data: [28, 48, 40, 19, 96, 27, 100],
    },
  ],
};

const RadarExample = () => {
  const [main_data, setMainData] = useState(data);

  useEffect(() => {
    axios.get("http://192.168.0.109:3000/api.json").then(({ data }) => {
      const arr = data.map((item) => {
        return {
          cvss3: item.cvss3,
          port_cve: item.port_cve,
        };
      });
      setMainData({
        labels: arr.map((item) => item.port_cve),
        datasets: [
          {
            label: "cvss3",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: arr.map((item) => item.cvss3),
          },
        ],
      });
    });
  }, []);
  return (
    <div>
      <Radar
        data={main_data}
        width={1000}
        height={600}
        options={{ maintainAspectRatio: false }}
      />
    </div>
  );
};

export default RadarExample;

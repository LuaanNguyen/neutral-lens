import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import "./BiasGraph.css";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type BiasData = {
  start: number;
  duration: number;
  response: Array<{
    labels: string[];
    token: string;
  }>;
}[];

type Props = {
  data: BiasData;
};

const BiasGraph: React.FC<Props> = ({ data }) => {
  const processData = (rawData: BiasData) => {
    const stereotypeData: number[] = [];
    const unfairData: number[] = [];
    const generalizationData: number[] = [];
    const labels: string[] = [];
    let totalStereotype = 0;
    let totalUnfair = 0;
    let totalGeneralization = 0;

    rawData.forEach((item) => {
      let stereotypeCount = 0;
      let unfairCount = 0;
      let generalizationCount = 0;

      item.response.forEach((token) => {
        if (
          token.labels.includes("B-STEREO") ||
          token.labels.includes("I-STEREO")
        ) {
          stereotypeCount++;
          totalStereotype++;
        }
        if (
          token.labels.includes("B-UNFAIR") ||
          token.labels.includes("I-UNFAIR")
        ) {
          unfairCount++;
          totalUnfair++;
        }
        if (token.labels.includes("B-GEN") || token.labels.includes("I-GEN")) {
          generalizationCount++;
          totalGeneralization++;
        }
      });

      stereotypeData.push(stereotypeCount);
      unfairData.push(unfairCount);
      generalizationData.push(generalizationCount);
      labels.push(item.start.toFixed(2));
    });

    return {
      stereotypeData,
      unfairData,
      generalizationData,
      labels,
      totalStereotype,
      totalUnfair,
      totalGeneralization,
    };
  };

  const {
    stereotypeData,
    unfairData,
    generalizationData,
    labels,
    totalStereotype,
    totalUnfair,
    totalGeneralization,
  } = processData(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Stereotype",
        data: stereotypeData,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Unfair",
        data: unfairData,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
      {
        label: "Generalization",
        data: generalizationData,
        borderColor: "rgb(75, 192, 192)",
        backgroundColor: "rgba(75, 192, 192, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Bias Categories Over Time",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Time (seconds)",
        },
      },
      y: {
        title: {
          display: true,
          text: "Number of Occurrences",
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <Line options={options} data={chartData} />
      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <h5>Bias Summary:</h5>
        <div className="bias-summary-container">
          <div className="individual-bias">
            <p className="number">{totalStereotype}</p>
            <p className="text" style={{ color: "rgb(255, 99, 132)" }}>
              Stereotypes
            </p>
          </div>
          <div className="individual-bias">
            <p className="number">{totalUnfair}</p>
            <p className="text" style={{ color: "rgb(53, 162, 235)" }}>
              Unfair
            </p>
          </div>
          <div className="individual-bias">
            <p className="number">{totalGeneralization}</p>
            <p className="text" style={{ color: "rgb(75, 192, 192)" }}>
              Generalization
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BiasGraph;

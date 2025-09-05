import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  indexAxis: "y" as const,
  elements: {
    bar: {
      borderWidth: 1,
      borderRadius: 1000,
    },
  },
  maintainAspectRatio: false,
  scales: {
    x: {},
    y: {},
  },

  plugins: {
    legend: {
      position: "right" as const,
    },
    title: {
      display: true,
      text: "Chart.js Horizontal Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      label: "Dataset 1",
      data: labels.map(() => faker.number.int({ min: 0, max: 1000 })),
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
  ],
};

export default function BarChart({ editorData }: { editorData: any }) {
  console.log("editorData in BarChart:", editorData);

  function getCharCount(editorData: string): { [key: string]: number } {
    const charCount: { [key: string]: number } = {};
    for (const char of editorData) {
      if (char === "\n" || char === " ") continue;
      charCount[char] = (charCount[char] || 0) + 1;
    }
    return charCount;
  }

  const charCount = getCharCount(editorData);
  const labelsFromData = Object.keys(charCount);

  const dataFromEditor = {
    labels: labelsFromData,
    datasets: [
      {
        label: "Character Frequency",
        data: labelsFromData.map((char) => charCount[char]),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return <Bar options={options} data={dataFromEditor} />;
}

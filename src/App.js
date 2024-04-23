import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';


ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 2,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'right',
    },
    title: {
      display: true,
      text: 'Chart.js Horizontal Bar Chart',
    },
    datalabels: { // Configure datalabels plugin
      display: true,
      anchor: 'end',
      align: 'top',
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Days',
      },
      ticks: {
        stepSize: 1, // Show ticks with step size of 1
        min:1, // Minimum value for the x-axis
        max: 31, // Maximum value for the x-axis
      },
    },
    y: {
      title: {
        display: true,
        text: 'Months',
      },
    },
    
  },
};

const labels = ['task1', 'task2', 'task3', 'taske4', 'task6', 'task7', 'task8', 'taks9'];

const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: [12,20, 23, 22, 32, 12, 15, 30],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
  ],
};

export function App() {
  return <Bar options={options} data={data} />;
}

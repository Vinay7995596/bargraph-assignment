import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
ChartJS.register(ChartDataLabels);

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
      text: 'Task End Date Chart',
    },
    datalabels: {
      color: '#333', // Color of the text
      anchor: 'center',
      align: 'center',
      font: {
        size: '14'
      },
      formatter: function(value, context) {
        const startDate = context.dataset.data[context.dataIndex].startDate;
        const endDate = context.dataset.data[context.dataIndex].endDate;
        return [
          `${startDate} - ${endDate}`
          
        ];
      }
    },
  },
  scales: {
    x: {
      title: {
        display: true,
        text: 'Days Until End Date',
      },
      ticks: {
        stepSize: 1, // Display ticks for every integer
        min: 0,      // Start from 0
        max: 31,     // End at 31
      },
    },
    y: {
      title: {
        display: true,
        text: 'Tasks',
      },
    },
  },
};

// Provided task data
const tasksData = [
  {"title":"Task-1","Description":"The docusign signing sequence is sending wrong","start_date":"01/01/2024", "end_date":"03/01/2024", "status":1, "statusText":"Not started"},
  {"title":"Task-2","Description":"Adding double charges","start_date":"03/01/2024","end_date":"06/01/2024", "status":2, "statusText":"In Progress"},
  {"title":"Task-3","Description":"In Global Customer transaction Tab agreement redirection","start_date":"06/01/2024","end_date":"10/01/2024", "status":3, "statusText":"Completed"},
  {"title":"Task-4","Description":"SSN Number encryption","start_date":"12/01/2024","end_date":"15/01/2024", "status":1, "statusText":"Not started"},
  {"title":"Task-5","Description":"Negative alert is showing","start_date":"15/01/2024","end_date":"18/01/2024", "status":3, "statusText":"Completed"},
  {"title":"Task-6","Description":"Forfit Invoice is not created","start_date":"19/01/2024","end_date":"21/01/2024", "status":2, "statusText":"In Progress"}
];

// Function to calculate the difference in days between start and end dates
const getDateDifference = () => {
  const dateDifferences = [];

  tasksData.forEach(task => {
    // Splitting the date strings into day, month, and year
    const startDateParts = task.start_date.split('/');
    const endDateParts = task.end_date.split('/');

    // Parsing the date parts into Date objects (year, month - 1, day)
    const startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
    const endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);

    // Calculating the difference in days
    const differenceInTime = endDate.getTime() - startDate.getTime();
    const differenceInDays = Math.abs(differenceInTime / (1000 * 3600 * 24));

    dateDifferences.push({ title: task.title, differenceInDays, startDate: task.start_date, endDate: task.end_date, statusText: task.statusText });
  });

  return dateDifferences;
};

const differences = getDateDifference();
console.log(differences);

// Function to determine background color based on status text
const getStatusColor = (statusText) => {
  switch (statusText) {
    case "Completed":
      return 'green'; // Green
    case "In Progress":
      return 'blue'; // Orange
    case "Not started":
      return 'orange'; // Red
    default:
      return 'red'; // Default
  }
};

const dataset = {
  label: 'Tasks',
  data: differences.map(diff => ({ x: diff.differenceInDays, y: diff.title, task: diff.title, startDate: diff.startDate, endDate: diff.endDate, statusText: diff.statusText })),
  backgroundColor: differences.map(diff => getStatusColor(diff.statusText)), // Assigning colors based on status text
  borderColor: 'rgb(54, 162, 235)',
  borderWidth: 1,
};

const data = {
  datasets: [dataset],
};

export function App() {
  return (
    <div>
      <Bar options={options} data={data} />
    </div>
  );
}

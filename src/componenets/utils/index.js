const jsonData = [
    {"title":"Task-1","Description":"The docusign signing sequence is sending wrong","start_date":"01/01/2024", "end_date":"03/01/2024", "status":"1", "statusText":"Not started"},
    {"title":"Task-2","Description":"Adding double charges","start_date":"02/01/2024","end_date":"6/01/2024", "status":"2", "statusText":"In Progress"},
    {"title":"Task-3","Description":"In Global Customer transaction Tab agreement redirection","start_date":"06/01/2024","end_date":"10/01/2024", "status":"3", "statusText":"Completed"},
    {"title":"Task-4","Description":"SSN Number encryption","start_date":"12/01/2024","end_date":"15/01/2024", "status":"1", "statusText":"Not started"},
    {"title":"Task-5","Description":"Negative alert is showing","start_date":"15/01/2024","end_date":"18/01/2024", "status":"3", "statusText":"Completed"},
    {"title":"Task-6","Description":"Forfit Invoice is not created","start_date":"19/01/2024","end_date":"21/01/2024", "status":"2", "statusText":"In Progress"},
    {"title":"Task-7","Description":"Nubs resident resale","start_date":"21/01/2024","end_date":"25/01/2024"},
    {"title":"Task-8","Description":"Screening Reports Restriction","start_date":"25/01/2024","end_date":"28/01/2024", "status":"1", "statusText":"Not started"},
    // Add more tasks here if needed
];

const statusColors = {
    "Not started": "red",
    "In Progress": "yellow",
    "Completed": "green"
    // Add more status-text to color mappings as needed
};

const taskNumbers = Array.from({ length: 31 }, (_, index) => "Task-" + (index + 1)); // Assuming a maximum of 31 tasks

const seriesData = jsonData.map((task, index) => {
    // Split the date strings and parse them as day, month, and year
    const startDateParts = task.start_date.split('/');
    const endDateParts = task.end_date.split('/');

    // Parse the date parts as integers (subtract 1 from month as JavaScript months are 0-indexed)
    const startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
    const endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]);

    // Calculate the difference in milliseconds
    const differenceInMs = endDate - startDate;

    // Convert milliseconds to days and subtract 20
    const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

    return differenceInDays;
});

const januaryFirst2024 = new Date(2024, 0, 1); // January is month 0 in JavaScript
const decemberThirtyFirst2024 = new Date(2024, 11, 31);

const generateDateLabels = (startDate, endDate) => {
    const labels = [];
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        labels.push(`${currentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`);
        currentDate.setDate(currentDate.getDate() + 1);
    }

    return labels;
};

const dateLabels = generateDateLabels(januaryFirst2024, decemberThirtyFirst2024);

const gapData = jsonData.map((task, index) => {
    // Split the date strings and parse them as day, month, and year
    const startDateParts = task.start_date.split('/');

    // Parse the date parts as integers (subtract 1 from month as JavaScript months are 0-indexed)
    const startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]);
    
    // Calculate the difference in milliseconds between the start date and January 1st, 2023
    const timeDifference = startDate.getTime() - januaryFirst2024.getTime();
    

    // Convert the time difference to days
    const gapDifference = timeDifference / (1000 * 3600 * 24);
    

    return gapDifference;
});


const BargraphObj = {
    chart: {
        type: 'bar',
    },
    title: {
        text: ''
    },
    xAxis: {
        categories: taskNumbers,
        title: {
            text: 'Task Number' // Optional: add a title to the x-axis
        },
        
        
        
    },
    yAxis: {
        title: {
            text: 'Date' // Adjust the title if needed
        },
        categories: dateLabels,
        tickLabelPlacement:'tick',
        opposite:true
       

        // Adjust the categories as needed
         
    },
    legend: {
        reversed: true,
        labels:'vinay'
    },
    plotOptions: {
        series: {
            stacking: 'normal',
            colorByPoint: true,
        },
        bar: {
            dataLabels: {
                enabled: false
            }
        }
    },
    series: [
        {
            name: '',
            data: seriesData.map((duration, index) => ({
                y: duration,
                color: statusColors[jsonData[index].statusText] // Color based on status text
            })),
        },
        {
            name: '',
            data: gapData.map(duration => ({
                y: duration,
                color: 'transparent' // Set color to transparent for gaps
            })),
        }
    ]
};

export default BargraphObj;

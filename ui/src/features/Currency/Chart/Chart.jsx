import ReactApexChart from 'react-apexcharts';

export default function Chart({ data }) {
  const sortedByDate = [...data.values]
    .sort((a, b) => new Date(b.time) - new Date(a.time))
    .reverse();

  const categories = sortedByDate.map((val) => val.time);
  const chartData = sortedByDate.map((val) => val.amount);
  const biggestValue = Math.max(...chartData);

  const state = {
    series: [
      {
        name: '',
        data: chartData,
      },
    ],

    options: {
      chart: {
        height: 350,
        type: 'bar',
      },
      colors: [
        function ({ value, seriesIndex, w }) {
          if (value === biggestValue) {
            return '#00b214';
          } else {
            return '#b0010a';
          }
        },
      ],
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '20%',
          distributed: true,
          dataLabels: {
            position: 'top', // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val + '$';
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: [
            function ({ value, seriesIndex, w }) {
              return value;
            },
          ],
        },
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: categories,
        position: 'bottom',
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          fill: {
            type: 'gradient',
            gradient: {
              colorFrom: '#D8E3F0',
              colorTo: '#BED1E6',
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val;
          },
        },
      },
      title: {
        text: '',
        floating: true,
        offsetY: 330,
        align: 'center',
        style: {
          color: '#444',
        },
      },
    },
  };

  return (
    <div id='chart'>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type='bar'
        height={350}
      />
    </div>
  );
}

<template>
  <v-container>
    <v-row>
      <v-col>
        <apexchart
          type="bar"
          height="32px"
          :options="chartOptions"
          :series="schooling"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "ChartTime",
  props: ["mainData"],
  computed: {
    // series() {
    //   return this.mainData;
    // },
  },
  data() {
    return {
      allSeries: ['schooling', 'labour', 'income', 'hdi', 'parliament'],

      schooling: [
        {
          name: "Male",
          data: [3.9, 1.4],
        },
        {
          name: "Female",
          data: [-4.22, -2.12],
        },
      ],
      chartOptions: {
        legend: {
          show: false,
        },
        chart: {
          type: "bar",
          stacked: true,
          foreColor: "#bfc8cf",
          sparkline: {
            enabled: true,
          },
        },
        colors: ["#2ac8e8", "#f02fc2"],
        plotOptions: {
          bar: {
            horizontal: true,
            colors: {
              backgroundBarColors: ["#40475D"],
            },
          },
        },
        stroke: {
          width: 0,
        },
        // series: [
        //   {
        //     name: "Process 3",
        //     data: [74],
        //   },
        // ],
        fill: {
          type: "gradient",
          gradient: {
            gradientToColors: ["#2f93ad", "#ccc"],
          },
        },
        dataLabels: {
          enabled: false,
        },

        grid: {
          xaxis: {
            lines: {
              show: false,
            },
          },
        },
        yaxis: {
          reversed: true,
          min: -5,
          max: 5,
          title: {
            // text: 'Age',
          },
        },
        tooltip: {
          theme: "dark",
          shared: false,
          x: {
            formatter: function (val) {
              return val;
            },
          },
          y: {
            formatter: function (val) {
              return Math.abs(val) + "%";
            },
          },
        },
        xaxis: {
          categories: ["20-24", 'test'],
          title: {
            text: "Percent",
          },
          labels: {
            formatter: function (val) {
              return Math.abs(Math.round(val)) + "%";
            },
          },
        },
      },
    };
  },
};
</script>

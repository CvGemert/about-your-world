<template>
  <apexchart
    type="area"
    height="95%"
    :options="chartOptions"
    :series="series"
  />
</template>

<script>
export default {
  name: "ChartTime",
  props: ["mainData"],
  computed: {
    series() {
      return this.mainData;
    },
  },
  data() {
    return {
      chartOptions: {
        legend: {
          show: false,
        },
        colors: [
          "#2E93fAbb",
          "#A300D6",
          "#abe5a1",
          "#d62629",
          "#973c5d",
          "#00B1F2",
        ],
        chart: {
          toolbar: {
            show: false,
          },
          type: "area",
          foreColor: "#bfc8cf",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          type: "datetime",
          min: undefined,
        },
        yaxis: {
          show: false,
          logarithmic: false,
        },
        tooltip: {
          theme: "dark",
          shared: true,
          // fixed: {
          //   enabled: true,
          //   position: 'topRight',
          //   offsetX: 0,
          //   offsetY: 0,
          // },
          x: {
            show: true,
            format: "yyyy",
            formatter: undefined,
          },
          y: {
            formatter: undefined,
            title: {
              formatter: (seriesName) => seriesName,
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            // gradientToColors: ['#4a569d', '#4a569d', '#4a569d', '#4a569d', '#4a569d', '#4a569d'],
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.1,
            stops: [0, 90, 100],
          },
        },
      },
    };
  },
};
</script>

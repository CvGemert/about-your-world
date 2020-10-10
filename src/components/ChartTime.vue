<template>
  <apexchart
    type="area"
    height="90%"
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
        // colors: [ "#2ac8e8", "#00B1F2", ],
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
        xaxis: {
          type: "datetime",
        },
        yaxis: {
          show: false,
          logarithmic: false,
        },
        tooltip: {
          theme: "dark",
          shared: true,
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
        stroke: {
          curve: "smooth",
          width: 1,
        },
        fill: {
          type: "gradient",
          gradient: {
            gradientToColors: ["#973c5d", "#d62629"],
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.3,
            stops: [0, 100],
          },
        },
        // fill: {
        //   type: "gradient",
        //   gradient: {
        //     shade: "dark",
        //     gradientToColors: ["#FDD835"],
        //     shadeIntensity: 1,
        //     opacityFrom: 1,
        //     opacityTo: 1,
        //     stops: [0, 100, 100, 100],
        //   },
        // },
      },
    };
  },
};
</script>

<style lang="scss">
// .apexcharts-data-labels{ display: contents !important; }
</style>

<template>
  <v-card
    class="mx-4 mb-8"
    dark
    width="100%"
  >
    <v-toolbar dense>
    <!-- <v-toolbar dense class="ml-4 mr-2"> -->
      <v-icon class="mr-4">mdi-trending-up</v-icon>
    </v-toolbar>
<apexchart type="radialBar" :height="chartHeight" :options="chartOptions" :series="series"></apexchart>
  </v-card>
</template>

<script>
  export default {
    props: ['chartHeight'],
    data () {
      return {
          series: [75],
          chartOptions: {
            chart: {
              height: 350,
              type: 'radialBar',
              toolbar: {
                show: false
              }
            },
            plotOptions: {
              radialBar: {
                startAngle: -135,
                endAngle: 225,
                 hollow: {
                  margin: 0,
                  size: '70%',
                  background: '#333',
                  image: undefined,
                  imageOffsetX: 0,
                  imageOffsetY: 0,
                  position: 'front',
                  dropShadow: {
                    enabled: true,
                    top: 3,
                    left: 0,
                    blur: 4,
                    opacity: 0.24
                  }
                },
                track: {
                  background: '#333',
                  strokeWidth: '67%',
                  margin: 0, // margin is in pixels
                  dropShadow: {
                    enabled: true,
                    top: -3,
                    left: 0,
                    blur: 4,
                    opacity: 0.35
                  }
                },
            
                dataLabels: {
                  show: true,
                  name: {
                    offsetY: -10,
                    show: true,
                    color: '#888',
                    fontSize: '17px'
                  },
                  value: {
                    formatter: function(val) {
                      return parseInt(val);
                    },
                    color: '#111',
                    fontSize: '36px',
                    show: true,
                  }
                }
              }
            },
            fill: {
              type: 'gradient',
              gradient: {
                shade: 'dark',
                type: 'horizontal',
                shadeIntensity: 0.5,
                gradientToColors: ['#ABE5A1'],
                inverseColors: true,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100]
              }
            },
            stroke: {
              lineCap: 'round'
            },
            labels: ['Percent'],
          },
      }
    },
  }
</script>

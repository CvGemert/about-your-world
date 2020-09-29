<template>
  <!-- The IHDI looks beyond the average achievements of a country in health,
    education and income to show how these achievements are distributed among
    its residents. The IHDI can be interpreted as the level of human development
    when inequality is accounted for. The relative difference between the IHDI
    and HDI is the loss due to inequality in distribution of the HDI within the
    country. -->

  <!-- We define workers in vulnerable employment as the sum of own-account workers
    and contributing family workers. They are less likely to have formal work
    arrangements, and are therefore more likely to lack decent working
    conditions, adequate social security and ‘voice’ through effective
    representation by trade unions and similar organizations. Vulnerable
    employment is often characterized by inadequate earnings, low productivity
    and difficult conditions of work that undermine workers’ fundamental rights. -->

  <!--********************************************************************

    <p>73506: "IHDI: Overall percentage loss",</p>
    <p>101706: "IHDI: Inequality in income",</p>
    <p>101606: "IHDI: Inequality in education",</p>
    <p>101806: "IHDI: Inequality in life expectancy",</p>
    <p>43006: "Vulnerable employment(% of total employment)",</p>

************************************************************************ -->

  <span>
    <p v-show="noData" class="text-center">No data for this selection</p>
    <apexchart
      type="radialBar"
      height="280"
      :options="chartOptions"
      :series="equalScore"
      v-show="!noData"
    />
  </span>

  <!-- <span>
    {{ equalScore }}
  </span> -->
</template>

<script>
import { mapState } from "vuex";
import reduceFunctions from "../compositions/reduceFunctions";

export default {
  name: "ChartEquality",
  setup() {
    const { reduceSum, reduceProp, reduceMergeSum } = reduceFunctions();
    return {
      reduceSum,
      reduceProp,
      reduceMergeSum,
    };
  },
  props: ["selectedHdi", "selectedCountry"],
  data() {
    return {
      noData: false,
    };
  },

  methods: {
    singleCountry(input) {
      let allValues = Object.values(input);

      return this.reduceSum(allValues) / allValues.length;
    },
  },

  computed: {
    ...mapState("inequalityModule", ["inequality"]),

    switchIndicator() {
      switch (this.selectedHdi) {
        case 141706:
          return 101706;
        case 69206:
          return 101806;
        case 103006:
          return 101606;
        case 140606:
          return 43006;
        case 137506:
          return 73506;
      }
    },

    equalScore() {
      this.noData = false;
      let input = this.inequality[this.switchIndicator];

      // SPECIFIC COUNTRY
      if (this.selectedCountry !== "global") {
        if (Object.keys(input).includes(this.selectedCountry)) {
          return [
            parseFloat(
              this.singleCountry(input[this.selectedCountry]).toFixed(1)
            ),
          ];
        } else {
          this.noData = true;
        }
      }

      // ALL COUNTRIES
      else {
        let countryCombi = [];

        Object.keys(input).map((country) => {
          countryCombi.push(this.singleCountry(input[country]));
        });

        return [
          parseFloat(
            this.reduceSum(countryCombi) / countryCombi.length
          ).toFixed(1),
        ];
      }
    },

    chartOptions() {
      return {
        chart: {
          type: "radialBar",
          toolbar: {
            show: false,
          },
        },
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: "70%",
              background: "#333",
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: "front",
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: "#333",
              strokeWidth: "67%",
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.35,
              },
            },

            dataLabels: {
              show: true,
              name: {
                offsetY: -10,
                show: true,
                color: "#888",
                fontSize: "17px",
              },
              value: {
                formatter: function (val) {
                  return parseInt(val);
                },
                color: "#111",
                fontSize: "36px",
                show: true,
              },
            },
          },
        },
        fill: {
          type: "gradient",
          gradient: {
            shade: "dark",
            type: "horizontal",
            shadeIntensity: 0.5,
            gradientToColors: ["#ABE5A1"],
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 100],
          },
        },
        stroke: {
          lineCap: "round",
        },
        labels: ["Percent"],
      };
    },
  },
};
</script>

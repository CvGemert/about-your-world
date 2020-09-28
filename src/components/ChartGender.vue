<template>
  <v-container>
    <v-row v-for="(serie, index) in pairedSeries" :key="'serie' + index">
      <!-- {{ reduceSeries(switchIndicator[index], index) }} -->

      <!-- {{ serie }} -->

      <v-col>
        <span class="overline">{{ serie.title }}</span>
        <apexchart
          type="bar"
          height="24px"
          :options="
            chartOptions(
              serie.content[0].data[0],
              serie.content[1].data[0],
              index,
              serie.title
            )
          "
          :series="serie.content"
        />
        <span class="caption float-left ml-1">
        {{numFormat(serie.content[0].data[0], index)}}
        </span>
        <span class="caption float-right">
        {{numFormat(serie.content[1].data[0], index)}}
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";
import reduceFunctions from "../compositions/reduceFunctions";

export default {
  name: "ChartGender",
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
      pairedValues: {},
    };
  },
  computed: {
    ...mapState("gEducationModule", ["education"]),
    ...mapState("gHealthModule", ["health"]),
    ...mapState("gIncomeModule", ["income"]),
    ...mapState("gLaboutModule", ["labour"]),
    ...mapState("gHdiModule", ["hdi"]),
    ...mapState("gRatioModule", ["ratio"]),

    switchIndicator() {
      switch (this.selectedHdi) {
        case 141706:
          return this.income;
        case 69206:
          return this.health;
        case 103006:
          return this.education;
        case 140606:
          return this.labour;
        case 137506:
          return this.hdi;
      }
    },

    pairedSeries() {
      let allSeries = {};
      let output = {};

      Object.keys(this.switchIndicator).map((indicator) => {
        let reducedValues = this.reduceSeries(this.switchIndicator[indicator]);

        allSeries[indicator] = reducedValues;
      });

      switch (this.selectedHdi) {
        case 141706:
          output.income = {
            title: "Income per capita (in PPP)",
            content: [
              {
                name: "Female",
                data: [-parseInt(allSeries[123506])],
              },
              { name: "Male", data: [parseInt(allSeries[123606])] },
            ],
          };

          output.management = {
            title: "Share of management positions",
            content: [
              {
                name: "Female",
                data: [-allSeries[175006]],
              },
              {
                name: "Male",
                data: [100 - allSeries[175006]],
              },
            ],
          };
          output.parliament = {
            title: "Share of parliament seats",
            content: [
              {
                name: "Female",
                data: [-allSeries[31706]],
              },
              {
                name: "Male",
                data: [100 - allSeries[31706]],
              },
            ],
          };
          break;
        case 69206:
          output.lifeExpectancy = {
            title: "Life expectancy",
            content: [
              {
                name: "Female",
                data: [-allSeries[120606]],
              },
              { name: "Male", data: [allSeries[121106]] },
            ],
          };
          output.mortality = {
            title: "Adult mortality rate",
            content: [
              {
                name: "Female",
                data: [-allSeries[57806]],
              },
              { name: "Male", data: [allSeries[57906]] },
            ],
          };
          output.ageMortality = {
            title: "Age-standardized mortality rate",
            content: [
              {
                name: "Female",
                data: [-allSeries[185106]],
              },
              { name: "Male", data: [allSeries[185206]] },
            ],
          };
          break;
        case 103006:
          output.secondaryEducation = {
            title: "Secondary education rate",
            content: [
              {
                name: "Female",
                data: [-allSeries[23906]],
              },
              { name: "Male", data: [allSeries[24006]] },
            ],
          };
          output.meanYears = {
            title: "Mean years of schooling",
            content: [
              {
                name: "Female",
                data: [-allSeries[24106]],
              },
              { name: "Male", data: [allSeries[24206]] },
            ],
          };
          output.expectedYears = {
            title: "Expected years of schooling",
            content: [
              {
                name: "Female",
                data: [-allSeries[123306]],
              },
              { name: "Male", data: [allSeries[123406]] },
            ],
          };
          break;
        case 140606:
          if(allSeries[169706] >= 1) {
            var totFemEmploy = (allSeries[169706] - 1)
          }

          output.labour = {
            title: "Labour force participation rate",
            content: [
              {
                name: "Female",
                data: [-allSeries[48706]],
              },
              { name: "Male", data: [allSeries[48806]] },
            ],
          };
          output.unemployment = {
            title: "Gender unemployment ratio (total)",
            content: [
              {
                name: "Female",
                data: [-allSeries[169706]],
              },
              {
                name: "Male",
                data: [1 / allSeries[169706]],
              },
            ],
          };
          output.unemploymentYouth = {
            title: "Gender unemployment ratio (youth)",
            content: [
              {
                name: "Female",
                data: [-allSeries[169806]],
              },
              {
                name: "Male",
                data: [1 / allSeries[169806]],
              },
            ],
          };
          break;
        case 137506:
          output.hdi = {
            title: "Human Development Index",
            content: [
              {
                name: "Female",
                data: [-allSeries[136906]],
              },
              { name: "Male", data: [allSeries[137006]] },
            ],
          };
          break;
      }

      //   141706: [
      //     {name: "Income per capita", data: [123506, 123606],
      //     123606: "Income per capita, male",
      //     175706: "Account ownership, female(%)",
      //     175006: "Female share of employment in senior and middle management(%)",
      //   ],

      return output;

      // return [
      //   {
      //     name: this.allTopics[this.selectedHdi][index],
      //     data: parseFloat(
      //       this.reduceSum(allValues) / allValues.length
      //     ).toFixed(2),
      //   },
      // ];
    },
  },
  methods: {
    reduceSeries(input) {
      let onlyFemale = [175706];
      let ratioValues = [169806, 169706, 175006, 49006];

      // SPECIFIC COUNTRY
      if (this.selectedCountry !== "global") {
        let allValues = [];

        if (Object.keys(input).includes(this.selectedCountry)) {
          allValues = Object.values(input[this.selectedCountry]);
        } else {
          allValues = [];
        }

        return this.reduceSum(allValues) / allValues.length;
      }

      // ALL COUNTRIES
      else {
        // let dataSerie = [];
        // let allValues = Object.values(this.mainHdi[input]);

        // let allYears = [
        //   ...new Set(allValues.map((x) => Object.keys(x)).flat()),
        // ];

        // allYears.map((year) => {
        //   let oneYear = Object.values(allValues)
        //     .filter((elKey) => elKey[year])
        //     .map((elVal) => elVal[year]);

        //   let unrounded =
        //     oneYear.reduce((acc, cur) => parseFloat(acc) + parseFloat(cur), 0) /
        //     oneYear.length;

        //   if (input === 141706) {
        //     dataSerie.push([year, parseInt(unrounded)]);
        //   } else if (input === 140606) {
        //     dataSerie.push([year, (100 - unrounded).toFixed(2)]);
        //   } else if (input === 137506) {
        //     dataSerie.push([year, unrounded.toFixed(3)]);
        //   } else {
        //     dataSerie.push([year, unrounded.toFixed(2)]);
        //   }
        // });

        // return [{ name: input, data: dataSerie }];

        return "global";
      }
    },
    numFormat(val, index) {
      switch (index) {
        case "income":
          return "$" + Math.abs(Math.round(val)).toLocaleString();
        case "management":
        case "parliament":
        case "secondaryEducation":
        case "labour":
          return Math.abs(val.toFixed(1)) + "%";
        case "lifeExpectancy":
        case "meanYears":
        case "expectedYears":
          return Math.abs(val.toFixed(1)) + " Years";
        case "mortality":
          return Math.abs((val / 10).toFixed(1)) + "%";
        case "ageMortality":
          return Math.abs(parseInt(val)) + " / 100,000"
        case "unemployment":
        case "unemploymentYouth":
        case "hdi":
          return Math.abs(val).toFixed(3)
        default:
          return val.toFixed(3)
      }
    },

    chartOptions(x, y, index, title) {
      return {
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
        colors: ["#f02fc2", "#2ac8e8"],
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
            gradientToColors: ["#ccc", "#2f93ad"],
          },
        },
        dataLabels: {
          enabled: false,
        },

        grid: {
          // xaxis: {
          //   lines: {
          //     show: false,
          //   },
          // },
        },
        xaxis: {
          show: false
        },
        yaxis: {
          // reversed: true,
          show: false,
          min: -(Math.ceil(Math.abs(x)) + y),
          max: (Math.ceil(Math.abs(x)) + y),
          title: {
            // text: 'Age',
          },
        },
        tooltip: {
          enabled: false,
        },
      };
    },
  },
};
</script>

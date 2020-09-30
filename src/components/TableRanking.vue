<template>
  <span>
    showSelected {{ showSelected }}
    <v-data-table
      :items="tableData"
      :headers="headers"
      :items-per-page="300"
      :sort-by="selectedsort"
      must-sort
      sort-desc
      dense
      fixed
      hide-default-footer
      class="campaign-table-wrap"
      mobile-breakpoint="md"
      @click:row="rowSelected"
    >
      <!-- Income -->
      <template v-slot:item.141706="{ item }">
        ${{ Math.round(item[141706]).toLocaleString() }}
      </template>

      <!-- Life span -->
      <template v-slot:item.69206="{ item }">
        {{ parseFloat(item[69206]).toFixed(1) }}
        <span class="caption">yrs</span>
      </template>

      <!-- Schooling -->
      <template v-slot:item.103006="{ item }">
        {{ parseFloat(item[103006]).toFixed(1) }}
        <span class="caption">yrs</span>
      </template>

      <!-- Unemployment -->
      <template v-slot:item.140606="{ item }">
        <span v-if="!isNaN(parseFloat(item[140606]))">
          {{ parseFloat(item[140606]).toFixed(1) }}
          <span class="caption">%</span>
        </span>
        <span v-else>
          <span class="caption">N/A</span>
        </span>
      </template>
    </v-data-table>
  </span>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import reduceFunctions from "../compositions/reduceFunctions";

export default {
  name: "TableRanking",
  setup() {
    const { reduceSum, reduceProp, reduceMergeSum } = reduceFunctions();
    return {
      reduceSum,
      reduceProp,
      reduceMergeSum,
    };
  },
  props: ["selectedHdi"],
  data() {
    return {
      showSelected: null,
    };
  },
  computed: {
    ...mapState("mainHdiModule", ["mainHdi"]),
    ...mapState("hdiModule", ["country_codes"]),
    ...mapState(["selectedCountry"]),

    selectedsort() {
      switch (this.selectedHdi) {
        case 141706:
          return "141706";
        case 69206:
          return "69206";
        case 103006:
          return "103006";
        case 140606:
          return "140606";
        case 137506:
          return "137506";
      }
    },

    tableData() {
      let output = [];

      Object.entries(this.country_codes).map((country) => {
        if (country[0] != "global") {
          let oneRow = { country: country[1] };

          Object.entries(this.mainHdi).map((hdi) => {
            if (Object.keys(hdi[1]).includes(country[0])) {
              let allValues = Object.values(hdi[1][country[0]]);

              oneRow[hdi[0]] = (
                this.reduceSum(allValues) / allValues.length
              ).toFixed(3);
            }
          });
          output.push(oneRow);
        }
      });
      return output;
    },

    headers() {
      return [
        { text: "country", value: "country", width: "160px" },
        { text: "income", value: "141706", width: "96px" },
        { text: "life span", value: "69206", width: "96px" },
        { text: "schooling", value: "103006", width: "96px" },
        { text: "employment", value: "140606", width: "96px" },
        { text: "hdi index", value: "137506", width: "96px" },
      ];
    },
  },
  methods: {
    ...mapMutations(["updateCountry"]),

    rowSelected(value) {
      Object.entries(this.country_codes).map((country) => {
        if (country[1] === value.country) {
          this.updateCountry(country[0]);
          this.showSelected = value;
        }
      });
    },
  },
};
</script>

<style lang="scss">
// Vuetify overwrites
.campaign-table-wrap {
  background: transparent !important;

  & .text-start:not(:first-child) {
    border-bottom: thin solid #aaaaaa66 !important;
  }
  & .text-start:first-child,
  & td:first-child,
  & tr:last-child th,
  & table {
    border-bottom: none !important;
    border-top: none !important;
    box-shadow: none;
  }

  & tr:hover {
    background: #cccccc22 !important;
    cursor: pointer;
  }
  & th {
    // font-size: 14px!important;
    font-weight: bold;
    text-align: center;
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
    padding: 0;
  }
  & td {
    letter-spacing: 1px;
    padding: 0;
    background: transparent;
  }
  // & td:first-child {
  //   width: 200px;
  //   padding-right: 16px;
  // }
  & .active {
    background: #eeeeee33;
    transition: all 0.3s;
  }
}
</style>
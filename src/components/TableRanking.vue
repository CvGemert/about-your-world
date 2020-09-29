<template>
  <div>
    <!-- <h1>Table</h1>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p>
    <p>TableRanking</p> -->

    <!-- {{ tableData }} -->

    <v-data-table
      :items="tableData"
      :headers="headers"
      :items-per-page="5"
      dense
      must-sort
      sort-desc
      :sort-by="selectedsort"
      fixed
      style="background: transparent"
    />

    <!-- {country: foo, income: foo, life: foo, schooling: foo, unemployment: foo,
    hdi: foo} -->
  </div>
</template>

<script>
import { mapState } from "vuex";
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
  props: ["selectedHdi", "selectedCountry"],
  computed: {
    ...mapState("mainHdiModule", ["mainHdi"]),
    ...mapState("hdiModule", ["country_codes"]),

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
        { text: "country", value: "country", width: "256px" },
        { text: "income", value: "141706", width: "128px" },
        { text: "life", value: "69206", width: "128px" },
        { text: "schooling", value: "103006", width: "128px" },
        { text: "unemployment", value: "140606", width: "128px" },
        { text: "hdi", value: "137506", width: "128px" },
      ];
    },
  },
};
</script>

<style lang="scss">
// This extra wrap is because the styles don't get properly transfered when using scoped
.campaign-table-wrap {
  height: 280px;
  margin-top: 31px;
  box-shadow: inset 0 0 1000px 10px #ffffff33;

  & .v-tabs-items {
    background-color: transparent;
    height: calc(100% - 56px);
    overflow: auto;
  }
  & .text-start:not(:first-child) {
    border-bottom: thin solid #666 !important;
  }
  & .text-start:first-child,
  & td:first-child,
  & tr:last-child th {
    border-bottom: none !important;
    border-top: none !important;
    box-shadow: none;
  }

  & tr:hover {
    background: none !important;
  }
  & .v-expansion-panel {
    box-shadow: inset 0 0 1000px 10px #ffffff22;
  }
  & .v-expansion-panel-header {
    line-height: inherit;
    padding: 0 0 0 16px;
    margin: 0;
    min-height: 0;
    width: 200px;
    white-space: nowrap;
  }
  & .v-expansion-panel-content__wrap {
    padding: 8px 16px;
  }
  & th {
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    letter-spacing: 1px;
    text-transform: uppercase;
    white-space: nowrap;
    padding: 0 4px;
  }
  & td {
    letter-spacing: 1px;
    padding: 0 4px;
    background: transparent;
  }
  & td:first-child {
    width: 200px;
    padding-right: 16px;
  }
  & td:last-child {
    width: 60px;
  }
  & .active {
    background: #eeeeee33;
    transition: all 0.3s;
  }
}
</style>
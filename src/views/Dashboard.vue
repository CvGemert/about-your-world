<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3"> </v-col>
      <v-col cols="6">
        <GridCard
          title="comp.title"
          toolbarIcon="calendar-clock"
          toolbarColour="comp.toolbarColour"
          contentClass="glass-card"
        >
          <!-- <template slot="detailSelection">
            <v-select
              v-if="comp.selectionItems"
              dense
              outlined
              v-model="selections[comp.key]"
              :items="comp.selectionItems"
              :label="comp.title"
            />
          </template> -->
          <template slot="body">
            <ChartTime :mainData="globalHdi"/>
          </template>
        </GridCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import ChartTime from "../components/ChartTime";
import GridCard from "../components/GridCard";

export default {
  name: "Home",
  components: {
    ChartTime,
    GridCard,
  },
  data() {
    return {
      selectedHdi: 141706,
    };
  },
  computed: {
    ...mapState("mainHdiModule", ["mainHdi"]),

    globalHdi() {
      let output = {};
      let dataSerie = [];

      let allValues = Object.values(this.mainHdi[this.selectedHdi]);
      let allYears = [...new Set(allValues.map((x) => Object.keys(x)).flat())];

      allYears.map((year) => {
        let oneYear = Object.values(allValues)
          .filter((elKey) => elKey[year])
          .map((elVal) => elVal[year]);
        dataSerie.push([
          year,
          (
            oneYear.reduce((acc, cur) => parseFloat(acc) + parseFloat(cur), 0) /
            oneYear.length
          ).toFixed(3),
        ]);
      });

      return [{ name: this.selectedHdi, data: dataSerie }];
    },
  },
};
</script>

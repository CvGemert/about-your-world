<template>
  <v-container fluid class="px-8">
    <v-row>
      <v-col cols="6" md="4" lg="3">
        <!-- HDI selection -->
        <v-item-group mandatory class="indicator-width">
          <v-item
            v-for="(hdi, index) in hdiSelect"
            :key="'hdi' + index"
            class="indicator-wrapper"
            dense
            ><span @click="selectedHdi = hdi.key" class="pointer">
              <Indicators
                :mainData="globalHdi(hdi.key)"
                :name="hdi.value"
                :selectedHdi="selectedHdi"
              />
            </span>
          </v-item>
        </v-item-group>
      </v-col>

      <!-- Time chart -->
      <v-col cols="6" md="8" lg="9">
        <v-row no-gutters>
          <v-col cols="9">
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
            <ChartTime :mainData="globalHdi(selectedHdi)" />
          </template>
        </GridCard>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

import ChartTime from "../components/ChartTime";
import GridCard from "../components/GridCard";
import Indicators from "../components/Indicators";

export default {
  name: "Home",
  components: {
    ChartTime,
    GridCard,
    Indicators,
  },
  data() {
    return {
      selectedHdi: 141706,
    };
  },
  computed: {
    ...mapState("mainHdiModule", ["mainHdi"]),
    ...mapState("hdiModule", ["country_codes", "indicators", "hdiSelect"]),
  },
  methods: {
    globalHdi(input) {
      let dataSerie = [];

      let allValues = Object.values(this.mainHdi[input]);
      let allYears = [...new Set(allValues.map((x) => Object.keys(x)).flat())];

      allYears.map((year) => {
        let oneYear = Object.values(allValues)
          .filter((elKey) => elKey[year])
          .map((elVal) => elVal[year]);

        let unrounded =
          oneYear.reduce((acc, cur) => parseFloat(acc) + parseFloat(cur), 0) /
          oneYear.length;

        if (input === 141706) {
          dataSerie.push([year, parseInt(unrounded)]);
        } else if (input === 137506) {
          dataSerie.push([year, unrounded.toFixed(3)]);
        } else {
          dataSerie.push([year, unrounded.toFixed(3)]);
        }
      });

      return [{ name: input, data: dataSerie }];
    },
  },
};
</script>

<style lang="scss">
.indicator-width {
  min-width: 320px!important;
}
</style>

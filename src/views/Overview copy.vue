<template>
  <div id="overview-grid">
    <!-- INDICATOR SELECTION -->
    <div class="overview-grid-item overview-1">
      <!-- <v-item-group mandatory class="indicator-flex-wrap">
        <v-item v-for="(hdi, index) in hdiSelect" :key="'hdi' + index" dense>
          <span @click="selectedHdi = hdi.key" class="pointer">
            <Indicators
              :mainData="filterHdi(hdi.key)"
              :name="hdi.value"
              :selectedHdi="selectedHdi"
            />
          </span>
        </v-item>
      </v-item-group> -->
    </div>

    <!-- MAIN STATS VIEW -->
    <!-- Time chart -->
    <div class="overview-2">
      <!-- <GridCard
        title="Time Series"
        toolbarIcon="calendar-clock"
        toolbarColour="comp.toolbarColour"
        cardClass="transparent-card"
        contentClass="glass-card"
      >
        <template slot="body"> -->
          <ChartTime :mainData="filterHdi(selectedHdi)" />
        <!-- </template>
      </GridCard> -->
    </div>

    <!-- Gender chart -->
    <div class="overview-grid-item overview-3">
      <!-- <GridCard
        title="Gender Statistics"
        toolbarIcon="calendar-clock"
        toolbarColour="comp.toolbarColour"
        cardClass="dark-card"
        contentClass="dark-card"
      >
        <template slot="body"> -->
          <ChartGender
            :selectedHdi="selectedHdi"
            :selectedCountry="selectedCountry"
          />
        <!-- </template>
      </GridCard> -->
    </div>

    <!-- Ranking table -->
    <div class="overview-grid-item overview-4">
      <!-- <GridCard
        title="Rank"
        toolbarIcon="calendar-clock"
        toolbarColour="comp.toolbarColour"
        cardClass="transparent-card"
        contentClass="glass-card"
      >
        <template slot="body"> -->
          <TableRanking
            :selectedHdi="selectedHdi"
            :selectedCountry="selectedCountry"
          />
        <!-- </template>
      </GridCard> -->
    </div>

    <!-- Inequality chart -->
    <div class="overview-grid-item overview-5">
      <!-- <GridCard
        title="Inequality adjustment"
        toolbarIcon="calendar-clock"
        toolbarColour="comp.toolbarColour"
        cardClass="dark-card"
        contentClass="dark-card"
      >
        <template slot="body"> -->
          <ChartEquality
            :selectedHdi="selectedHdi"
            :selectedCountry="selectedCountry"
          />
        <!-- </template>
      </GridCard> -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import ChartEquality from "../components/ChartEquality";
import ChartGender from "../components/ChartGender";
import ChartTime from "../components/ChartTime";
import GridCard from "../components/GridCard";
import GridGenerator from "../components/GridGenerator";
import Indicators from "../components/Indicators";
import TableRanking from "../components/TableRanking";

export default {
  name: "Overview",
  // props: ["selectedCountry"],
  components: {
    ChartEquality,
    ChartGender,
    ChartTime,
    GridCard,
    GridGenerator,
    Indicators,
    TableRanking,
  },
  data() {
    return {
      selectedHdi: 141706,
      genders: {
        68606: "GII: Gender Inequality Index, value",
        68706: "GII: Gender Inequality Index, rank",
        137906: "GDI: Gender Development Index",
        24106: "GDI: Mean years of schooling(females aged 25 years and above)",
        24206: "GDI: Mean years of schooling(males aged 25 years and above)",
        49006: "Sex ratio at birth(male to female births)",
        120606: "GDI: Life expectancy at birth, female",
        121106: "GDI: Life expectancy at birth, male",
        123506: "GDI: Estimated GNI per capita(PPP), female",
        123606: "GDI: Estimated GNI per capita(PPP), male",
        136906: "GDI: Female HDI, Geometric",
        137006: "GDI: Male HDI, Geometric",
        48706: "Labour force participation rate, female(% ages 15 and older)",
        48806: "Labour force participation rate, male(% ages 15 and older)",
        31706: "Share of seats in parliament(% held by women)",
      },
    };
  },
  computed: {
    ...mapState("mainHdiModule", ["mainHdi"]),
    ...mapState("hdiModule", ["country_codes", "indicators", "hdiSelect"]),
    ...mapState(["selectedCountry"]),
  },
  methods: {
    filterHdi(input) {
      // SPECIFIC COUNTRY
      if (this.selectedCountry !== "global") {
        let dataSerie = [];

        if (Object.keys(this.mainHdi[input]).includes(this.selectedCountry)) {
          Object.entries(this.mainHdi[input][this.selectedCountry]).map(
            (year) => {
              if (input === 141706) {
                dataSerie.push([year[0], parseInt(year[1])]);
              } else if (input === 140606) {
                dataSerie.push([year[0], (100 - year[1]).toFixed(2)]);
              } else if (input === 137506) {
                dataSerie.push([year[0], year[1].toFixed(3)]);
              } else {
                dataSerie.push([year[0], year[1].toFixed(2)]);
              }
            }
          );
        } else {
          dataSerie.push([]);
        }
        return [
          {
            name: input,
            data: dataSerie,
          },
        ];
      }

      // ALL COUNTRIES
      else {
        let dataSerie = [];
        let allValues = Object.values(this.mainHdi[input]);

        let allYears = [
          ...new Set(allValues.map((x) => Object.keys(x)).flat()),
        ];

        allYears.map((year) => {
          let oneYear = Object.values(allValues)
            .filter((elKey) => elKey[year])
            .map((elVal) => elVal[year]);

          let unrounded =
            oneYear.reduce((acc, cur) => parseFloat(acc) + parseFloat(cur), 0) /
            oneYear.length;

          if (input === 141706) {
            dataSerie.push([year, parseInt(unrounded)]);
          } else if (input === 140606) {
            dataSerie.push([year, (100 - unrounded).toFixed(2)]);
          } else if (input === 137506) {
            dataSerie.push([year, unrounded.toFixed(3)]);
          } else {
            dataSerie.push([year, unrounded.toFixed(2)]);
          }
        });

        return [{ name: input, data: dataSerie }];
      }
    },
  },
};
</script>

<style lang="scss">
.indicator-flex-wrap {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.overview-grid-item {
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px;
  margin: 20px;
  overflow: hidden;
  height: 100%;
  width: 100%;
}

#overview-grid {
  height: 100%;
  width: 100vw;
  padding: 32px;
  display: grid;
  grid-template-columns: 320px 0.75fr 0.25fr;
  grid-template-rows: 0.6fr 0.4fr;
  grid-template-areas:
    "overview-1 overview-2 overview-3"
    "overview-1 overview-4 overview-5";
}
.overview-1 {
  grid-area: overview-1;
}
.overview-2 {
  grid-area: overview-2;
}
.overview-3 {
  grid-area: overview-3;
}
.overview-4 {
  grid-area: overview-4;
}
.overview-5 {
  grid-area: overview-5;
}

@media (max-width: 1024px) {
  #overview-grid {
    grid-template-columns: 320px 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      "overview-1 overview-2 overview-2"
      "overview-1 overview-3 overview-5"
      "overview-1 overview-4 overview-4";
  }
}
</style>

<template>
  <v-container fluid class="px-8">
    <!-- Indicator selection -->
    <span class="indicator-wrapper">
      <v-item-group mandatory class="indicator-width">
        <v-item v-for="(hdi, index) in hdiSelect" :key="'hdi' + index" dense
          ><span @click="selectedHdi = hdi.key" class="pointer">
            <Indicators
              :mainData="filterHdi(hdi.key)"
              :name="hdi.value"
              :selectedHdi="selectedHdi"
            />
          </span>
        </v-item>
      </v-item-group>
    </span>

    <!-- Stats view -->
    <span class="stats-wrapper">
      <!-- Time chart -->
      <v-row>
        <!-- <v-col cols="8">
          <GridCard
            title="comp.title"
            toolbarIcon="calendar-clock"
            toolbarColour="comp.toolbarColour"
            cardClass="transparent-card"
            contentClass="glass-card"
          >
            <template slot="body">
              <ChartTime :mainData="filterHdi(selectedHdi)" />
            </template>
          </GridCard>
        </v-col> -->

        <!-- Gender chart -->
        <v-col cols="12">
          <GridCard
            title="Gender Statistics"
            toolbarIcon="calendar-clock"
            toolbarColour="comp.toolbarColour"
            cardClass="dark-card"
            contentClass="dark-card"
          >
            <template slot="body">
              <ChartGender
                :selectedHdi="selectedHdi"
                :selectedCountry="selectedCountry"
              />
            </template>
          </GridCard>
        </v-col>
      </v-row>
    </span>
  </v-container>
</template>

<script>
import { mapState } from "vuex";

// import ApexRadial from "../components/ApexRadial";
import ChartGender from "../components/ChartGender";
import ChartTime from "../components/ChartTime";
import GridCard from "../components/GridCard";
import Indicators from "../components/Indicators";

export default {
  name: "Overview",
  props: ["selectedCountry"],
  components: {
    // ApexRadial,
    ChartGender,
    ChartTime,
    GridCard,
    Indicators,
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
.indicator-wrapper {
  position: absolute;
  top: 24px;
  left: 32px;
  height: calc(100vh - 128px);
  width: 320px;
  overflow: hidden auto;
}

.stats-wrapper {
  position: absolute;
  top: 11px;
  right: 32px;
  height: calc(100vh - 128px);
  width: calc(100vw - 416px);
  overflow: hidden auto;
}
</style>

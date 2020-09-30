<template>
  <div id="advanced-grid">
    <!-- MAIN CONTROLS -->
    <div class="advanced-grid-item advanced-1">
      <p class="overline my-0 py-0">Select preloaded data</p>
      <v-select
        :items="Object.keys(this.preloaded)"
        v-model="selectedIndicatorPre"
        class="mt-n4"
      />

      <p class="overline mt-4 mb-0 py-0">Call data from API</p>
      <v-select
        :items="indicatorType"
        v-model="selectedIndicator"
        class="mt-n4"
      />
    </div>

    <div class="advanced-grid-item advanced-2">advanced-2</div>
    <div class="advanced-grid-item advanced-3">advanced-3</div>
    <div class="advanced-grid-item advanced-4">advanced-4</div>
    <div class="advanced-grid-item advanced-5">advanced-5</div>

    <!-- MAIN WORKSPACE -->
    <!-- <div class="advanced-grid-item">{{ sources }}</div> -->
  </div>
</template>

<script>
import { mapState } from "vuex";

import GridCard from "../components/GridCard";
import reduceFunctions from "../compositions/reduceFunctions";

export default {
  name: "HelloWorld",
  setup() {
    const { reduceSum, reduceProp, reduceMergeSum } = reduceFunctions();
    return {
      reduceSum,
      reduceProp,
      reduceMergeSum,
    };
  },
  components: {
    GridCard,
  },
  data() {
    return {
      loading: false,
      selectedIndicatorPre: null,
      selectedIndicator: null,
      onlyPreloaded: true,
      sources: null,
    };
  },
  watch: {
    selectedIndicatorPre(val) {
      if (val != null) {
        this.selectedIndicator = null;
        this.getData(val);
      }
    },
    selectedIndicator(val) {
      if (val != null) {
        this.selectedIndicatorPre = null;
        this.getData(val);
      }
    },
  },
  computed: {
    ...mapState("hdiModule", ["country_codes", "indicators", "preloaded"]),
    ...mapState("mainHdiModule", ["mainHdi"]),
    ...mapState("gEducationModule", ["education"]),
    ...mapState("gHealthModule", ["health"]),
    ...mapState("gIncomeModule", ["income"]),
    ...mapState("gLaboutModule", ["labour"]),
    ...mapState("gHdiModule", ["hdi"]),
    ...mapState("gRatioModule", ["ratio"]),
    ...mapState("inequalityModule", ["inequality"]),

    indicatorType() {
      return Object.keys(this.indicators).filter(
        (x) => !Object.keys(this.preloaded).includes(x)
      );
    },

    // gridContainer() {
    //   return "display: grid; grid-template-columns: auto auto auto; background-color: #2196F3; padding: 10px;";
    // },
    // gridItem() {
    //   return "background-color: rgba(255, 255, 255, 0.8); border: 1px solid rgba(0, 0, 0, 0.8); padding: 20px; font-size: 30px; text-align: center;";
    // },
  },
  methods: {
    getData(input) {
      if (Object.keys(this.preloaded).includes(input)) {
        this.sources = this[this.preloaded[input]][input];
      } else {
        (this.loading = true),
          this.axios
            .get(
              "https://cors-anywhere.herokuapp.com/http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=" +
                input
            )
            .then((resp) => {
              let output = {};

              // Object.entries(resp.data.indicator_value).map(country => {
              //   let filtered = {}

              //   output[country[0]] = country[1][this.selectedIndicator]
              // })

              this.sources = resp;

              //  this.sources = {[this.selectedIndicator]: output}
            })
            .finally(() => (this.loading = false));
      }
    },
  },
};
</script>

<style lang="scss">
.advanced-grid-item {
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 20px;
  margin: 20px;
  overflow: hidden auto;
}

#advanced-grid {
  height: 100%;
  width: 100%;
  padding: 32px;
  display: grid;
  grid-template-columns: 320px 0.75fr 0.25fr;
  grid-template-rows: 0.6fr 0.4fr;
  grid-template-areas:
    "advanced-1 advanced-2 advanced-3"
    "advanced-1 advanced-4 advanced-5";
}
.advanced-1 {
  grid-area: advanced-1;
}
.advanced-2 {
  grid-area: advanced-2;
}
.advanced-3 {
  grid-area: advanced-3;
}
.advanced-4 {
  grid-area: advanced-4;
}
.advanced-5 {
  grid-area: advanced-5;
}

@media (max-width: 1263px) {
  #advanced-grid {
    grid-template-columns: 320px 1fr 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      "advanced-1 advanced-2 advanced-2"
      "advanced-1 advanced-3 advanced-5"
      "advanced-1 advanced-4 advanced-4";
  }
}
</style>
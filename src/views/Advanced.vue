<template>
  <div>
    <v-select :items="Object.keys(indicators)" v-model="selectedIndicator" />
    {{ sources }}
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
      sources: null,
      selectedIndicator: null,
    };
  },
  watch: {
    selectedIndicator(val) {
      this.getData(val);
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
  },
  methods: {
    getData(input) {
      if (Object.keys(this.preloaded).includes(input)) {
        this.sources = this[this.preloaded[input]];
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

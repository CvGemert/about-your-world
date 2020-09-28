<template>
  <v-container fluid>
    <v-row>
      <v-col>
        {{sources}}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import GridCard from "./GridCard";
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
  data() {
    return {
      sources: null,
      selectedIndicator: 137006,
    };
  },
  components: {
    GridCard,
  },
  created() {
    this.axios
      .get(
        "https://cors-anywhere.herokuapp.com/http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=" +
          this.selectedIndicator
      )
      .then((resp) => {
        let output = {};

        Object.entries(resp.data.indicator_value).map(country => {
          let filtered = {}

          output[country[0]] = country[1][this.selectedIndicator]
        })


        this.sources = {[this.selectedIndicator]: output}
      })
      .finally(() => (this.loading = false));
  },
};
</script>

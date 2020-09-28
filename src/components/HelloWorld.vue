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
      selectedIndicator: 186606,
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
        this.sources = [resp.data.indicator_value];
      })
      .finally(() => (this.loading = false));
  },
};
</script>

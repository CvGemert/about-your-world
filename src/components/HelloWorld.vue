<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <v-card>
          {{sources}}
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data() {
    return {
      sources: null,
      selectedIndicator: 44206,
    };
  },
  created() {
    this.axios
      .get(
        "http://ec2-54-174-131-205.compute-1.amazonaws.com/API/HDRO_API.php/indicator_id=" +
          this.selectedIndicator
      )
      .then((resp) => {
        this.sources = [resp.data.indicator_value];
      })
      .finally(() => (this.loading = false));
  },
};
</script>

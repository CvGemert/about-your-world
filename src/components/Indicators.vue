<template>
  <v-card
    :color="active ? 'active' : 'transparent'"
    dark
    flat
    class="mb-6 py-1"
    width="320"
  >
    <!-- TOOLBAR -->
    <v-toolbar color="transparent" flat dense>
      <v-toolbar-title>{{ name }}</v-toolbar-title>
    </v-toolbar>

    <!-- ACTIVE -->
    <div class="d-flex">
      <v-scroll-y-transition hide-on-leave>
        <v-list-item two-line v-if="active" class="text-start">
          <v-list-item-content>
            <v-list-item-subtitle class="display-1">
              {{ mainData[0].data[mainData[0].data.length - 1][1] }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="kpi-number">
              2019
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-scroll-y-transition>

      <!-- NOT ACTIVE -->
      <v-scroll-y-transition hide-on-leave>
        <v-list-item two-line v-if="!active" class="text-start">
          <v-list-item-content>
            <v-list-item-subtitle class="display-1">
              {{ mainData[0].data[mainData[0].data.length - 1][1] }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="kpi-number">
              2019
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-scroll-y-transition>

      <apexchart
        class="mt-2"
        type="area"
        height="60"
        width="180"
        :options="chartOptions"
        :series="mainData"
      />
    </div>
  </v-card>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["mainData", "name", "selectedHdi"],
  data() {
    return {
      chartOptions: {
        chart: {
          type: "area",
          sparkline: {
            enabled: true,
          },
        },
        tooltip: {
          enabled: false,
        },
        stroke: {
          width: 1,
          curve: "smooth",
          curve: "straight",
        },

        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.1,
            stops: [0, 90, 100],
          },
        },
        xaxis: {
          type: "datetime",
        },
        colors: ["#DCE6EC"],
      },
    };
  },
  computed: {
    active() {
      if (this.selectedHdi === this.mainData[0].name) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style lang="scss">
.indicator-card {
  margin: 0;
  padding: 0;

  & .kpi-number {
    font-size: 14px !important;
    letter-spacing: 2px;
  }
  & .sparkline {
    margin: 0 16px;
    padding: 0;
  }
}

.active {
  background: linear-gradient(to top right, #dc2424, #4a569d);
}
</style>
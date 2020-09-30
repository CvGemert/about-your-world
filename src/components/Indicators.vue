<template>
  <v-card
    :color="active ? 'active' : 'transparent'"
    dark
    flat
    class="py-1 pr-1"
    width="320"
  >
    <!-- TOOLBAR -->
    <v-toolbar color="transparent" flat dense>
      <v-toolbar-title>{{ name }}</v-toolbar-title>
    </v-toolbar>

    <!-- ACTIVE -->
    <div class="d-flex">
      <v-slide-y-transition hide-on-leave>
        <v-list-item two-line v-if="active" class="text-start">
          <v-list-item-content>
            <v-list-item-subtitle
              class="display-1"
              v-if="mainData[0].data[0].length > 0"
            >
              <span v-if="this.mainData[0].name === 141706">$</span
              >{{
                mainData[0].data[
                  mainData[0].data.length - 1
                ][1].toLocaleString()
              }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="display-1" v-else>
              N/A
            </v-list-item-subtitle>
            <v-list-item-subtitle class="metric-info">
              {{ metrics[mainData[0].name] }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-slide-y-transition>

      <!-- NOT ACTIVE -->
      <v-slide-y-transition hide-on-leave>
        <v-list-item two-line v-if="!active" class="text-start">
          <v-list-item-content>
            <v-list-item-subtitle
              class="display-1"
              v-if="mainData[0].data[0].length > 0"
            >
              <span v-if="this.mainData[0].name === 141706">$</span
              >{{
                mainData[0].data[
                  mainData[0].data.length - 1
                ][1].toLocaleString()
              }}
            </v-list-item-subtitle>
            <v-list-item-subtitle class="display-1" v-else>
              N/A
            </v-list-item-subtitle>
            <v-list-item-subtitle class="metric-info">
              {{ metrics[mainData[0].name] }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-slide-y-transition>

      <apexchart
        class="mt-2"
        type="area"
        height="60"
        width="144"
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
      metrics: {
        141706: "GNI p/c in PPP",
        103006: "Years",
        140606: "Percent",
        69206: "Years",
        137506: "HDI score",
      },
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

  & .metric-info {
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
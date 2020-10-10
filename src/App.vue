<template>
  <v-app>
    <!-- ************************************ APP BAR ************************************ -->
    <v-app-bar app clipped-left>
      <!-- Title -->
      <v-toolbar-title class="app-title ml-5">
        <p class="mb-n2 mt-1">About:</p>
        <h3>Your World</h3>
      </v-toolbar-title>

      <!-- Spacing -->
      <v-divider vertical inset class="mx-6" />
      <v-spacer />

      <!-- Search -->
      <!-- <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search your world"
        hide-details
      /> -->

      <!-- Spacing -->
      <v-spacer />

      <!-- Country selection -->
      <v-autocomplete
        :items="keyedCountries"
        v-model="countrySelect"
        item-text="value"
        item-value="key"
        label="Select Country"
        placeholder="All countries"
        hide-details
        outlined
        dense
        class="appbar-select"
        @change="updateCountry(countrySelect)"
      />

      <!-- TABS HEADERS -->
      <v-tabs v-model="tab" icons-and-text right class="app-tabs">
        <v-tab href="#overview-tab">
          Overview
          <v-icon>mdi-television-guide</v-icon>
        </v-tab>

        <v-tab href="#advanced-tab">
          advanced
          <v-icon>mdi-chart-bar-stacked</v-icon>
        </v-tab>
      </v-tabs>

      <!-- Right drawer toggle -->
      <!-- <v-btn icon @click="rightDrawer = !rightDrawer">
        <v-badge content="i" color="primary" overlap>
          <v-icon large>mdi-apps</v-icon>
        </v-badge>
      </v-btn> -->
    </v-app-bar>

    <!-- ************************************ MAIN CONTENT ************************************ -->
    <v-main class="content-wrap">
      <v-tabs-items v-model="tab" class="transparent">
        <v-tab-item id="overview-tab">
          <Overview :selectedCountry="selectedCountry" />
        </v-tab-item>
        <v-tab-item id="advanced-tab">
          <Advanced />
        </v-tab-item>
      </v-tabs-items>
    </v-main>

    <!-- ************************************ SIDE DRAWER ************************************ -->
    <v-navigation-drawer v-model="rightDrawer" fixed right temporary>
      <v-card>
        <v-toolbar>
          <v-app-bar-nav-icon @click="rightDrawer = !rightDrawer" />
          <v-toolbar-title>About: this demo</v-toolbar-title>
        </v-toolbar>

        <v-list two-line subheader>
          <v-subheader>General</v-subheader>

          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Made with:</v-list-item-title>
              <v-list-item-subtitle>
                Learn about this data
                <v-btn>LEARN MORE</v-btn>
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-divider />

        <v-list subheader two-line flat>
          <v-subheader>Technologies</v-subheader>

          <v-list-item-group multiple>
            <v-list-item>
              <v-list-item-action>
                <v-checkbox color="primary" />
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Vue 3 Compositon API</v-list-item-title>
                <v-list-item-subtitle>(docs link)</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";

import Advanced from "./views/Advanced";
import Overview from "./views/Overview";

export default {
  components: {
    Advanced,
    Overview,
  },
  watch: {
    selectedCountry(val) {
      this.countrySelect = val;
    }
  },
  data() {
    return {
      // App & Layouts
      tab: "overview-tab",
      rightDrawer: false,

      // Search & Selects
      search: "",
      countrySelect: "",

      // Loading States
      // loading: true,
    };
  },
  computed: {
    ...mapState(["selectedCountry"]),
    ...mapState("hdiModule", ["country_codes"]),

    keyedCountries() {
      return Object.entries(this.country_codes).map((x) => ({
        key: x[0],
        value: x[1],
      }));
    },
  },
  methods: {
    ...mapMutations(["updateCountry"]),
  },
};
</script>

<style lang="scss">
// Custom scrollbars
* {
  scrollbar-width: thin;
  scrollbar-color: #dddddd22 #dddddd22;
}
*::-webkit-scrollbar {
  width: 12px;
}
*::-webkit-scrollbar-track {
  background: #dddddd22;
}
*::-webkit-scrollbar-thumb {
  background-color: #dddddd44;
  border-radius: 32px;
}

// General app styles
html {
  overflow: hidden !important;
}
#app {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  top: 0;
  // width: 100vw;
  // height: 100vh;
  background: url("./assets/bg-radial.jpg");
  overflow: hidden !important;
  // background-size: 100% 100%;
}

// App bar
.app-title {
  font-weight: 400;
  letter-spacing: 0.1667em !important;
  font-size: 18px;
  text-transform: uppercase;
  margin-right: 132px;
}
.appbar-select {
  max-width: 320px !important;
}
.app-tabs {
  width: fit-content !important;
}

// Main tabs content
#advanced-tab,
#overview-tab {
  height: calc(100vh - 64px);
  width: 100vw;
  background: transparent !important;
}

// Global reusable classes
.pointer {
  cursor: pointer;
}
</style>

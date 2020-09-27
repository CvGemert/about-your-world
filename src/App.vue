<template>
  <v-app>
    <!-- ************************************ SIDE DRAWERS ************************************ -->

    <!-- Drawer left -->
    <!-- <v-navigation-drawer app permanent clipped mini-variant>
      Placeholder
    </v-navigation-drawer> -->

    <!-- Drawer right -->
    <v-navigation-drawer
      v-model="rightDrawer"
      width="475"
      fixed
      right
      temporary
    >
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

    <!-- ************************************ APP BAR ************************************ -->
    <v-app-bar app clipped-left>
      <!-- Title -->
      <v-toolbar-title class="app-title">
        <p>About:</p>
        <h3>Your World</h3>
      </v-toolbar-title>

      <!-- Spacing -->
      <v-divider vertical inset class="mx-6" />
      <v-spacer />

      <!-- Search -->
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search your world"
        hide-details
      />

      <!-- Spacing -->
      <v-spacer />

      <!-- Region select -->
      <v-select
        :items="regionList"
        single-line
        placeholder="Select Region"
        class="mt-5 mr-4 appbar-select"
      />

      <!-- Country selection -->
      <v-select
        :items="keyedCountries"
        v-model="selectedCountry"
        item-text="value"
        item-value="key"
        label="Select Country"
        hide-details
        outlined
        dense
      />

      <!-- TABS HEADERS -->
      <v-tabs v-model="tab" icons-and-text right class="app-tabs">
        <v-tab href="#dashboard-tab">
          dashboard
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
        <v-tab-item id="dashboard-tab">
          <Dashboard :selectedCountry="selectedCountry" />
        </v-tab-item>
        <v-tab-item id="advanced-tab">
          <Advanced />
        </v-tab-item>
      </v-tabs-items>
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";

import Advanced from "./views/Advanced";
import Dashboard from "./views/Dashboard";

export default {
  components: {
    Advanced,
    Dashboard,
  },
  data() {
    return {
      // App & Layouts
      rightDrawer: false,
      tab: "dashboard-tab",

      // Search & Selects
      search: "",
      regionList: [],
      selectedCountry: "global",

      // Loading States
      loading: true,
    };
  },
  computed: {
    ...mapState("hdiModule", ["country_codes"]),

    keyedCountries() {
      return Object.entries(this.country_codes).map((x) => ({
        key: x[0],
        value: x[1],
      }));
    },
  },
};
</script>

<style lang="scss">
// Custom scrollbars
* {
  box-sizing: border-box;
  scrollbar-width: thin;
  scrollbar-color: #dddddd22 #dddddd22;
}
*::-webkit-scrollbar {
  width: 7px;
}
*::-webkit-scrollbar-track {
  background: #dddddd22;
}
*::-webkit-scrollbar-thumb {
  background-color: #dddddd22;
  border-radius: 2px;
}

html {
  overflow: hidden !important;
}

.content-wrap {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 100%;
  height: calc(100% - 64px);
  padding: 0 !important;
  overflow: hidden auto;
  // background: radial-gradient(#31a2ac4d, #1f1f39);
  background-image: url("./assets/bg-radial.jpg");
  background-size: 100% 100%;
}

// App bar
.app-title {
  font-weight: 400;
  letter-spacing: 0.1667em !important;
  font-size: 18px;
  text-transform: uppercase;
}

.appbar-select {
  width: 64px;
}

.app-tabs {
  width: fit-content !important;
}

// Global reusable classes
.pointer {
  cursor: pointer;
}
</style>

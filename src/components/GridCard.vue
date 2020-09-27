<template>
  <v-card height="100%" class="transparent">
    <v-toolbar dense flat dark :class="toolbarColour">
      <v-icon class="mr-6">mdi-{{toolbarIcon}}</v-icon>
      <v-toolbar-title class="overline">{{title}}</v-toolbar-title>
      <v-spacer />
      <slot name="toolBarBtn" />
    </v-toolbar>

    <v-card-text class="card-overflow" :class="contentClass">
      <slot name="detailSelection" />
      <slot name="body" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "GridCard",
  props: ["title", "toolbarIcon", "toolbarColour", "contentClass"],
};
</script>

<style lang="scss" scoped>
.card-overflow {
  overflow-y: auto;
  min-height: 400px;
  max-height: 60vh;
}

.glass-card {
  box-shadow: inset 0 0 100px 10px #ffffff33;
}
</style>
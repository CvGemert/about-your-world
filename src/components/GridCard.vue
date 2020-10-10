<template>
  <v-card class="card-height" :class="cardClass">
    <v-toolbar dense flat dark :class="toolbarColour">
      <v-icon class="mr-6">mdi-{{toolbarIcon}}</v-icon>
      <v-toolbar-title class="overline">{{title}}</v-toolbar-title>
      <v-spacer />
      <slot name="toolBarBtn" />
    </v-toolbar>

    <v-card-text class="card-overflow py-0" :class="contentClass">
      <slot name="detailSelection" />
      <slot name="body" />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "GridCard",
  props: ["title", "toolbarIcon", "toolbarColour", "cardClass", "contentClass"],
};
</script>

<style lang="scss" scoped>
.card-height {
  // min-height: 340px;
  height: 100%;
}
.card-overflow {
  height: calc(100% - 48px);
  width: 100%;
  overflow-y: auto;
}

.glass-card {
  box-shadow: inset 0 0 200px 10px #ffffff33;
}

.transparent-card{
  background: transparent!important;
}
</style>
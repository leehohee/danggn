<template>
  <v-row no-gutters class="mt-3">
    <v-col cols="4">
      <v-card nuxt to="/category/1" class="pa-3 d-flex align-center flex-column" elevation="0">
        <img height="58px" src="~/assets/logo.png" />

        <div><span :style="{ fontSize: '11px' }">로고</span></div>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card nuxt to="/category/2" class="pa-3 d-flex align-center flex-column" elevation="0">
        <img height="58px" src="~/assets/placard.png" />
        <div><span :style="{ fontSize: '11px' }">배너</span></div>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card nuxt to="/category/3" class="pa-3 d-flex align-center flex-column" elevation="0">
        <img height="58px" src="~/assets/poster.png" />
        <div><span :style="{ fontSize: '11px' }">포스터</span></div>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card nuxt to="/category/4" class="pa-3 d-flex align-center flex-column" elevation="0">
        <img height="58px" src="~/assets/box.png" />
        <div><span :style="{ fontSize: '11px' }">패키지</span></div>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card nuxt to="/category/5" class="pa-3 d-flex align-center flex-column" elevation="0">
        <img height="58px" src="~/assets/search.png" />
        <div><span :style="{ fontSize: '11px' }">디테일</span></div>
      </v-card>
    </v-col>
    <v-col cols="4">
      <v-card nuxt to="/category/6" class="pa-3 d-flex align-center flex-column" elevation="0">
        <img height="58px" src="~/assets/video.png" />
        <div><span :style="{ fontSize: '11px' }">비디오</span></div>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {};
</script>

<style>
</style>
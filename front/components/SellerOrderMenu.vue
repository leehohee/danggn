<template>
  <v-card
    width="100%"
    :style="{
      backgroundImage: 'linear-gradient(136deg, #2d2d33, #18181f)',
    }"
  >
    <v-container>
      <v-row class="mt-1">
        <v-col class="white--text font-weight-bold" cols="8"
          >판매중인 주문<span class="grey--text text-caption"
            >(최근 3개월)</span
          ></v-col
        >
        
        <v-col class="grey--text text-caption text-right" cols="4"
          ><nuxt-link class="grey--text" to="sellerpage">전체보기 ></nuxt-link></v-col
        >
      </v-row>
      <v-row min-height="100%" class="d-flex">
        <v-col>
          <div
            class="py-3 text-center yellow--text"
            width="58px"
            min-height="58px"
            :style="{
              borderRadius: '50%',
              border: 'solid 2px rgba(141,109,8,1)',
            }"
          >
            <h2>0</h2>
          </div>
          <div class="pt-1 grey--text text-center"><h5>미결제</h5></div>
        </v-col>
        <v-col>
          <div
            class="py-3 text-center yellow--text"
            width="58px"
            height="58px"
            :style="{
              borderRadius: '50%',
              border: 'solid 2px rgba(141,109,8,1)',
            }"
          >
            <h2>0</h2>
          </div>
          <div class="pt-1 grey--text text-center"><h5>진행중</h5></div>
        </v-col>
        <v-col>
          <div
            class="py-3 text-center yellow--text"
            width="58px"
            height="58px"
            :style="{
              borderRadius: '50%',
              border: 'solid 2px rgba(141,109,8,1)',
            }"
          >
            <h2>1</h2>
          </div>
          <div class="pt-1 grey--text text-center"><h5>발송중</h5></div>
        </v-col>
        <v-col>
          <div
            class="py-3 text-center yellow--text"
            width="58px"
            height="58px"
            :style="{
              borderRadius: '50%',
              border: 'solid 2px rgba(141,109,8,1)',
            }"
          >
            <h2>0</h2>
          </div>
          <div class="pt-1 grey--text text-center"><h5>판매완료</h5></div>
        </v-col>
      </v-row>
      <v-sheet class="mt-5 mx-4">
        <v-row :style="{ backgroundColor: '#1c1c23' }">
          
          <!-- <v-col class="grey--text text-caption" cols="6">늦은발송 1건</v-col>
          <v-col class="grey--text text-caption" cols="6">주문취소 0건</v-col> -->
        </v-row>
      </v-sheet>
      <div class="my-6 mx-4">
        <v-row class="mt-4 white--text"
          ><v-icon class="white--text text-subtitle-1"
            >mdi-chart-bell-curve-cumulative</v-icon
          ><span class="ml-2 text-body-2">수익관리</span></v-row
        >
        <v-row class="mt-6 white--text"
          ><v-icon class="white--text text-subtitle-1"
            >mdi-text-box-outline</v-icon
          >
          <nuxt-link class="white--text" :to="`/myservicepage`">
          <span class="ml-2 text-body-2">나의 서비스</span>
          </nuxt-link>
          </v-row>
        <!-- <v-row class="mt-6 white--text"
          ><v-icon class="white--text text-subtitle-1"
            >mdi-advertisements</v-icon
          ><span class="ml-2 text-body-2">광고 신청</span></v-row
        > -->
      </div>
    </v-container>
  </v-card>
</template>

<script>
export default {};
</script>

<style>
</style>
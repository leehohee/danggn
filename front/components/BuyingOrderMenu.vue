<template>
  <v-card
    width="100%"
    :style="{
      backgroundImage: 'linear-gradient(135deg, #ffea85, #ffdd37)',
    }"
  >
    <v-container>
      <v-row class="mt-1">
        <v-col class="font-weight-bold" cols="8">구매중인 주문</v-col>
        <v-col class="grey--text text-caption text-right" cols="4"
          ><nuxt-link class="grey--text" to="buyerpage">전체보기 ></nuxt-link></v-col
        >
      </v-row>

      <v-sheet
        class="mt-4 d-flex justify-center align-center"
        height="100px"
        v-if="false"
        :style="{
          borderRadius: '4px',
          backgroundImage: 'linear-gradient(135deg, #ffea85, #ffdd37)',
          border: 'solid 2px rgba(141,109,8,0.3)',
        }"
      >
        <div>
          <div class="text-center mb-2">
            <v-icon>mdi-information-outline</v-icon>
          </div>
          <div><h5>어머, 구매중인 주문이 없어요</h5></div>
        </div>
      </v-sheet>

      <v-row min-height="100%" class="d-flex">
        <v-col>
          <div
            class="py-3 text-center black--text"
            width="58px"
            min-height="58px"
            :style="{
              borderRadius: '50%',
              border: 'solid 2px #1c1c23',
            }"
          >
            <h2>0</h2>
          </div>
          <div class="pt-1 grey--text text-center"><h5>미결제</h5></div>
        </v-col>
        <v-col>
          <div
            class="py-3 text-center black--text"
            width="58px"
            height="58px"
            :style="{
              borderRadius: '50%',
              border: 'solid 2px #1c1c23',
            }"
          >
            <h2>0</h2>
          </div>
          <div class="pt-1 grey--text text-center"><h5>진행중</h5></div>
        </v-col>
        <v-col>
          <div
            class="py-3 text-center black--text"
            width="58px"
            height="58px"
            :style="{
              borderRadius: '50%',
              border: 'solid 2px #1c1c23',
            }"
          >
            <h2>1</h2>
          </div>
          <div class="pt-1 grey--text text-center"><h5>발송중</h5></div>
        </v-col>
        <v-col>
          <div
            class="py-3 text-center black--text"
            width="58px"
            height="58px"
            :style="{
              borderRadius: '50%',
              border: 'solid 2px #1c1c23',
            }"
          >
            <h2>0</h2>
          </div>
          <div class="pt-1 grey--text text-center"><h5>판매완료</h5></div>
        </v-col>
      </v-row>

      <div class="my-6 mx-4">
        <v-row class="mt-4"
          ><v-icon class="text-subtitle-1">mdi-credit-card-outline</v-icon
          ><span class="ml-2 text-body-2">결제/환불내역</span></v-row
        >
        <!-- <v-row class="mt-6"
          ><v-icon class="text-subtitle-1"
            >mdi-ticket-confirmation-outline</v-icon
          ><span class="ml-2 text-body-2">쿠폰/프로모션</span></v-row
        >
        <v-row class="mt-6"
          ><v-icon class="text-subtitle-1">mdi-cash</v-icon
          ><span class="ml-2 text-body-2">컴포디 캐시 충전</span></v-row
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
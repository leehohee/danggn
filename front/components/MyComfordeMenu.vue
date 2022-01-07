<template>
  <div>
    <v-container>
      <v-row>
        <v-card
          elevation="0"
          width="100%"
          class="d-flex-row justify-center align-center"
        >
          <div class="text-right">
            <v-btn outlined elevation="0" x-small rounded>계정 설정</v-btn>
          </div>
          <div class="d-flex">
            <v-img
              contain
              width="86"
              height="86"
              src="https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png"
            ></v-img>
          </div>
          <div class="text-center mt-2"><h3>{{me.nickname}}</h3></div>
          <div class="text-center grey--text">{{me.status}}</div>
          <!-- <v-row dense class="mt-3">
                <v-col cols="4">
                <div class="text-center text-caption">크몽 캐시</div>
                <div class="text-center font-weight-bold">0원</div>
                </v-col>
                <v-divider vertical inset />
                <v-col cols="4">
                <div class="text-center text-caption">쿠폰</div>
                <div class="text-center font-weight-bold">1장</div>
                </v-col>
                <v-divider vertical inset />
                <v-col cols="4">
                <div class="text-center text-caption">전문가 마일리지</div>
                <div class="text-center font-weight-bold">20,000원</div>
                </v-col>
            </v-row> -->
        </v-card>
      </v-row>

      <v-row class="mt-8" v-if="me.status==='designer'">
        <SellerOrderMenu />
      </v-row>

      <v-row class="mt-8">
        <BuyingOrderMenu />
      </v-row>
      <v-card width="100%" elevation="0" class="mt-5 pb-10">
        <div v-if="me.status==='designer'" class="py-5"><h4><nuxt-link to="/serviceedit">판매 시작하기</nuxt-link></h4></div>
        <div class="py-5"><h4>컴포디 이용방법</h4></div>
        <div class="py-5"><h4>고객센터</h4></div>
        <div @click="onLogOut" class="py-5"><h4>로그아웃</h4></div>
        
      </v-card>
    </v-container>
  </div>
</template>

<script>
import SellerOrderMenu from '~/components/SellerOrderMenu';
import BuyingOrderMenu from '~/components/BuyingOrderMenu';

export default {
    components: {
        SellerOrderMenu,
        BuyingOrderMenu,
    },
    methods: {
        
        onLogOut(){
            this.$store.dispatch('users/logOut');
        },
    },
    computed:{
        me(){
            return this.$store.state.users.me;
        },
        
    },


};
</script>

<style>
</style>
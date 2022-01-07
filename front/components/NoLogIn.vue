<template>
  <v-container class="text-center">
    <nuxt-link to="/loginpage">
      <v-avatar size="78">
        <v-img
          src="https://jejuhydrofarms.com/wp-content/uploads/2020/05/blank-profile-picture-973460_1280.png"
        ></v-img>
      </v-avatar>
    </nuxt-link>
    <nuxt-link to="/loginpage"
      ><h4 class="pt-2 font-weight-bold">눌러보세요</h4></nuxt-link
    >
    <v-row class="my-8"
      ><nuxt-link to="/loginpage"><h5>로그인/회원가입</h5></nuxt-link></v-row
    >
    <v-row class="my-8"
      ><nuxt-link to="/serviceedit"><h5>판매 시작하기</h5></nuxt-link></v-row
    >
    <v-row class="my-8"><h5>친구초대</h5></v-row>
    <v-row class="my-8"><h5>크몽 이용방법</h5></v-row>
    <v-row class="my-8"><h5>고객센터</h5></v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
</style>
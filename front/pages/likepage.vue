<template>
  <div>
    <div v-if="me">
      내근처정보입니다.
      
    </div>
    <div v-else>
      <LoginForm />
    </div>
  </div>
</template>

<script>
import LoginForm from "~/components/LoginForm";
import RecommendListMenu from '~/components/RecommendListMenu';
export default {
  components: {
    LoginForm,
    RecommendListMenu,
  },
  data() {
    return {
      
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    likeItems(){
        return this.$store.state.posts.likeItems;
    },
  },
  fetch({store}){
        //fetch는 보통 store 넣을때 많이 쓴다.
        return store.dispatch('posts/loadLikeItems', { 
          userId : store.state.users.me.id,
          reset: true
        });
  },
  methods:{
        onClick(){
            console.log(this.me);
        }
  },

  middleware: 'authenticated',
};
</script>

<style>
</style>
<template>
  <v-container>
      
      {{$vuetify.breakpoint.name}}{{$vuetify.breakpoint.mobile}}{{$vuetify.breakpoint.mobileBreakpoint}}
      <div>
          <Post2Card v-for="p in mainPosts" :key="p.id" :post="p" />
          
      </div>
  </v-container>  
</template>

<script>
import Post2Card from '~/components/Post2Card';
export default {
    components: {
        Post2Card,
        
    },
    
    data() {
        return {
            name: 'Nuxt.js',
        };
    },
    computed:{
        me(){
            return this.$store.state.users.me;
        },
        mainPosts(){
            return this.$store.state.posts.mainPosts;
        },
        hasMorePost(){
            return this.$store.state.posts.hasMorePost;
        }
    },
    
    fetch({store}){  //fetch는 보통 store 넣을때 많이 쓴다.
        return store.dispatch('posts/loadPosts', { reset: true});
    },
    
    
    head(){
        return {
            title: '메인페이지'
        }
    },

};
</script>

<style>

</style>
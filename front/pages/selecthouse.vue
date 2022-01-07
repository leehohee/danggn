<template>
  <v-container>
      
      <h2>주택을 골라주세요.</h2>
      <div>
          <Post3Card v-for="p in main3Posts" :key="p.id" :post="p" />
          
      </div>
  </v-container>  
</template>

<script>
import Post3Card from '~/components/Post3Card';
export default {
    components: {
        Post3Card,
        
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
        main3Posts(){
            return this.$store.state.posts.main3Posts;
        },
        
    },
    
    fetch({store}){  //fetch는 보통 store 넣을때 많이 쓴다.
        return store.dispatch('posts/load3Posts', { reset: true});
    },
    
    mounted(){
        window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
        
    },
    methods: {
        
        fuckyou(){
            consol.log('good');
        },
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
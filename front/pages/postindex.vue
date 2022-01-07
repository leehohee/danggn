<template>
  <v-container>
      <LoginForm />
      <PostForm v-if="me"/>

      <div>
          
          <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
          
      </div>
  </v-container>  
</template>

<script>
import PostCard from '~/components/PostCard';
import PostForm from '~/components/PostForm';
import LoginForm from '~/components/LoginForm';
export default {
    components: {
        PostCard,
        PostForm,
        LoginForm,
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
    
    mounted(){
        window.addEventListener('scroll', this.onScroll);
    },
    beforeDestroy() {
        window.removeEventListener('scroll', this.onScroll);
        
    },
    methods:{
        onScroll(){
            if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300){
                if(this.hasMorePost){
                    this.$store.dispatch('posts/loadPosts');
                }
            }
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
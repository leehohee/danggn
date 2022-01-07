<template>
  <v-container>
      <v-card style="margin-bottom: 20px">
          <v-container>
              {{other.nickname}}
              <v-row>
                  <v-col cols="4">{{other.Followings.length}} 팔로윙</v-col>
                  <v-col cols="4">{{other.Followers.length}} 팔로워</v-col>
                  <v-col cols="4">{{other.Posts.length}} 게시글</v-col>
              </v-row>
          </v-container>
      </v-card>
      <div>
          <PostCard v-for="p in mainPosts" :key="p.id" :post="p" />
          
      </div>
  </v-container>  
</template>

<script>
import PostCard from '~/components/PostCard';
export default {
    components: {
        PostCard,
        
    },
    
    data() {
        return {
            name: 'Nuxt.js',
        };
    },
    computed:{
        other(){
            return this.$store.state.users.other;
        },
        mainPosts(){
            return this.$store.state.posts.mainPosts;
        },
        
    },
    
    fetch({store, params}){  //fetch는 보통 store 넣을때 많이 쓴다.
        
        return Promise.all([  //한번에 실행을 보장할수있다.
            store.dispatch('posts/loadUserPosts', {
                userId : params.id,
                reset: true,
            }),
            store.dispatch('users/loadOther', {
                userId : params.id,
            }),
        ]);
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
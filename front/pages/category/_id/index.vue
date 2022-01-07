<template>
  <v-container>
      
      <div>
          <RecommendListMenu :mainItems="mainItems"/>
          
      </div>
  </v-container>  
</template>

<script>
import RecommendListMenu from '~/components/RecommendListMenu';
export default {
    layout:'categorydefault',
    components: {
        RecommendListMenu,
        
    },
    
    data() {
        return {
            name: 'Nuxt.js',
        };
    },
    computed:{
        
        mainItems(){
            return this.$store.state.posts.mainItems;
        },
        
    },
    
    fetch({store, params}){  //fetch는 보통 store 넣을때 많이 쓴다.
        
        return Promise.all([  //한번에 실행을 보장할수있다.
            store.dispatch('posts/loadCategoryItems', {
                CategoryId : params.id,
                reset: true,
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
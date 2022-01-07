<template>
    <div>
        
        
        <Post2Images :images="post.Images || []" />   
        <v-card-text>
            
        </v-card-text>
    </div>
  
</template>

<script>
import Post2Images from './Post2Images';
export default {
    components:{
        Post2Images,
    },
    props:{
        post:{
            type:Object,
        },
    },
    computed:{
        
        me(){
            return this.$store.state.users.me;
        },
        
    },
    methods: {
        

    },
};
</script>

<style scoped>
    a {
        text-decoration:none;
        color: inherit;
    }

</style>
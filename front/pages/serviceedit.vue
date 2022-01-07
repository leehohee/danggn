<template>
    <div>
        <div v-if="!me">
        <PostForm />
        </div>
        <div v-else>
            로그인을 해야합니다.
        </div>
         
    </div>
    
    
</template>

<script>
import PostForm from '../components/PostForm.vue';

export default {
    layout:'mypagedefault',
    components: {
        PostForm,
    },
    data () {
      return {
        
        
      }
    },
}
</script>

<style>

</style>
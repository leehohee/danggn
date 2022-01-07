<template>
    <div>
        <div v-if="me">
            
            <MyComfordeList :mainItems="mainItems"/>
            
        </div>
        <div v-else>
            <LoginForm />
        </div>
    </div>
</template>
<script>
import MyComfordeList from '~/components/MyComfordeList';
import LoginForm from '~/components/LoginForm';
export default {
    
    layout:'mypagedefault',
    components:{
        MyComfordeList,
        LoginForm,
    },
    computed:{
        me(){
            return this.$store.state.users.me;
        },
        mainItems(){
            return this.$store.state.posts.mainItems;
        },
        
    },
    fetch({store}){  //fetch는 보통 store 넣을때 많이 쓴다.
        return store.dispatch('posts/loadItems', { reset: true});
    },
}
</script>

<style>

</style>
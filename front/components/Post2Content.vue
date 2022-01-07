<template>
    <div>
        
        <v-card-title>
            <nuxtLink :to="'/user/' + post.User.id"><h3>{{ post.User.nickname }} 님의 입찰</h3></nuxtLink>
            <v-btn v-if="canFollow" @click="onFollow">팔로우</v-btn>
            <v-btn v-if="canUnfollow" @click="onUnfollow">언팔로우</v-btn>
        </v-card-title>

        
        <div style="display:flex">
            <div style="flex:1; width:120px;">
                <PostImages :images="post.Hashtags[0].Images || []" />
            </div>

           
            <div style="flex:1;align-items:center; justify-content: center;padding-left:10px">
                <div>구조공법 : {{ post.Hashtags[0].tree || []}}</div>
                <div>건축규모 : {{ post.Hashtags[0].py || []}}</div>
                <div>건축용도 : {{ post.Hashtags[0].solo || []}}</div>
            </div>
            
        </div>

        <v-card-text>
            <div>
                <nuxtLink :to="'/post/' + post.id">
                <button @click="what">입찰진행중</button>
                </nuxtLink>
            </div>
            <div>{{$moment(post.createdAt).fromNow()}}</div>
        </v-card-text>
    </div>
  
</template>

<script>
import PostImages from './PostImages';
export default {
    components:{
        PostImages,
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
        canFollow(){
            return this.me && this.post.User.id !== this.me.id && !this.me.Followings.find(v => v.id === this.post.User.id);
        },
        canUnfollow(){
            return this.me && this.post.User.id !== this.me.id && this.me.Followings.find(v => v.id === this.post.User.id);

        },

    },
    methods: {
        onFollow(){
            this.$store.dispatch('users/follow',{
                userId : this.post.User.id,
            });
        },
        onUnfollow(){
            this.$store.dispatch('users/unfollow',{
                userId : this.post.User.id,
            });
        },
        what(){
            console.log(this.post.id);
            
        },

    },
};
</script>

<style scoped>
    a {
        text-decoration:none;
        color: inherit;
    }

</style>
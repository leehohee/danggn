<template>
  <div>
      
      <v-container>
          <v-card style="margin-bottom:20px">
              <v-container>
                <LoginForm/>
                <v-subheader>내 프로필</v-subheader>
                <v-form v-model="valid" @submit.prevent="onChangeNickname">
                    <v-text-field
                        v-model="nickname"
                        label="닉네임"
                        :rules="nicknameRules"
                        required
                    />
                    <v-btn type="submit">수정</v-btn>
                </v-form>
              </v-container>

          </v-card>
          <v-card style="margin-bottom:20px">
              <v-container>
                  <v-subheader>팔로윙</v-subheader>
                  <FollowList :users="followingList" :remove="removeFollowing"/>
                  <v-btn v-if="hasMoreFollowing" dark color="blue" style="width: 100%" @click="loadMoreFollowings">더보기</v-btn>
              </v-container>
          </v-card>
          <v-card style="margin-bottom:20px">
              <v-container>
                  <v-subheader>팔로워</v-subheader>
                  <FollowList :users="followerList" :remove="removeFollower"/>
                  <v-btn v-if="hasMoreFollower" dark color="blue" style="width: 100%" @click="loadMoreFollowers">더보기</v-btn>
              </v-container>
          </v-card>
      </v-container>
  </div>  
</template>

<script>
import FollowList from '~/components/FollowList';
import LoginForm from '~/components/LoginForm'; //~표는 소스들의 루트
export default {
    components:{
        FollowList,
        LoginForm,
    },
    layout: 'default', //넉스트가 뷰 위에 편의를 위한 기능을 확장한 것
    data() {
        return {
            valid:false,
            nickname:'',
            nicknameRules:[
                v => !!v || '닉네임을 입력하세요.',
            ]
        }
    },
    computed:{
        followerList(){
            return this.$store.state.users.followerList;
        },
        followingList(){
            return this.$store.state.users.followingList;
        },
        hasMoreFollowing(){
            return this.$store.state.users.hasMoreFollowing;
        },
        hasMoreFollower(){
            return this.$store.state.users.hasMoreFollower;

        }
    },
    fetch({store}){
        
        return Promise.all([  //둘다 실행을 보장받을수있다.
            store.dispatch('users/loadFollowings',{offset:0}),
            store.dispatch('users/loadFollowers',{offset:0}),
        ]);
    },
    methods:{
        onChangeNickname(){
            this.$store.dispatch('users/changeNickname',{
                nickname: this.nickname,
            })
        },
        removeFollowing(userId){
            this.$store.dispatch('users/unfollow',{
                userId,
            });
        },
        removeFollower(userId){
            this.$store.dispatch('users/removeFollower',{
                userId,
            })

        },
        loadMoreFollowers(){
            this.$store.dispatch('users/loadFollowers');
        },
        loadMoreFollowings(){
            this.$store.dispatch('users/loadFollowings');
            
        }
    },
    head(){
        return {
            title: '프로필'
        }
    },
    //middleware: 'authenticated',


}
</script>

<style>

</style>
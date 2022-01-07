<template>
    <v-container v-if="!me">
        
        <v-card elevation="0">
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                    <h4>이메일</h4>
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="이메일"
                        type="email"
                        required
                        outlined
                    />
                    <h4>비밀번호</h4>
                    <v-text-field
                        v-model="password"
                        :rules="passwordRules"
                        label="비밀번호"
                        type="password"
                        required
                        outlined
                    />
                    <v-btn
                    class="yellow"
                    x-large
                    width="100%"
                    type="submit"
                    elevation="0"
                    >
                    로그인
                    </v-btn>
                    <v-row class="d-flex justify-center align-center">
                        <v-col cols="6">
                            <v-checkbox
                            v-model="checkbox"
                            
                            label="로그인 유지"
                            required
                            
                            ></v-checkbox>
                        </v-col>
                        <v-col class="text-right" cols="6">
                            <h5><a href="#">아이디·비밀번호 찾기</a></h5>
                        </v-col>
                    </v-row>
                
                    
                
            </v-form>
            
        </v-card>
        <v-row>
            <v-container>
            <v-card elevation="0">
                <v-row>
                <v-col cols="9"><nuxt-link to="/signup"><span class="blue--text font-weight-bold text--darken-4">아직 회원이 아니신가요?</span></nuxt-link></v-col>
                <v-col class="d-flex justify-center align-center" cols="3"><v-icon large>mdi-chevron-right</v-icon></v-col>
                </v-row>
            </v-card>
            </v-container>
        </v-row>
    </v-container>


    <v-container fluid v-else>
        <v-card fluid elevation="0" width="100%">
            <v-container fluid width="100%">
                <h4 class="mb-2">{{ me.nickname }} 로그인되었습니다.</h4>
                <v-btn @click="onLogOut">로그아웃</v-btn>
                <v-row width="100%" class="mt-5">
                    <PostForm />
                </v-row>
            </v-container>
        </v-card>
    </v-container>
</template>

<script>
import PostForm from '~/components/PostForm';
export default {
    components: {
        
        PostForm,
        
    },
    data(){
        return {
            valid:false,
            email:'',
            password: '',
            emailRules:[
                v => !!v || '아이디는 필수입니다.',
            ],
            passwordRules:[
                v => !!v || '비밀번호는 필수입니다.',
            ],
        }
    },
    computed:{
        me(){
            return this.$store.state.users.me;
        },
        
    },
    
    methods: {
        onSubmitForm(){
            if (this.$refs.form.validate()){
                this.$store.dispatch('users/logIn',{
                    email:this.email,
                    password:this.password,

                });
            }
        },
        onLogOut(){
            this.$store.dispatch('users/logOut');
        },
    }
}
</script>

<style>

</style>
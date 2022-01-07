<template>
  <div>
      
      <v-container>
          <v-card elevation="0">
              <v-container>
                <v-subheader>
                    회원가입
                </v-subheader>
                <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm"> 
                    <v-text-field
                        v-model="email"
                        label="이메일"
                        type="email"
                        :rules="emailRules"
                        required
                    />
                    <v-text-field
                        v-model="password"
                        label="비밀번호"
                        type="password"
                        :rules="passwordRules"
                        required
                    />
                    <v-text-field
                        v-model="passwordCheck"

                        label="비밀번호확인"
                        type="password"
                        :rules="passwordCheckRules"
                        required
                    />
                    <v-text-field
                        v-model="nickname"
                        label="닉네임"
                        type="nickname"
                        :rules="nicknameRules"
                        required
                    />
                    
                    <v-radio-group
                    v-model="status"
                    row
                    required
                    :rules="statusRules"
                    >
                        <v-radio
                            label="판매자로 가입"
                            value="designer"
                        ></v-radio>
                        <v-radio
                            label="의뢰인으로 가입"
                            value="user"
                        ></v-radio>
                    </v-radio-group>
                    <v-checkbox
                        v-model="terms"
                        required
                        :rules="[v => !!v || '약관에 동의해야합니다.']" 
                        label="약관에 동의합니다."
                    />  
                    <v-btn type="submit">가입하기</v-btn>
                </v-form>
              </v-container>
          </v-card>
      </v-container>
  </div>  
</template>

<script>
export default {
    layout:'mypagedefault',
    data() {
        return {
            valid:false,
            email:'',
            password:'',
            passwordCheck:'',
            nickname:'',
            status:'',
            
            terms:false,
            emailRules: [  
                v => !!v || '이메일은 필수입니다.',
                v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || '이메일 형식에 맞아야합니다.',
            ],
            nicknameRules: [
                v=> !!v || '닉네임은 필수입니다.',
                v => v.length <= 10 || '닉네임은 10자 이하여야 합니다.'
            ],
            passwordRules: [
                v=> !!v || '비밀번호는 필수입니다.',
            ],
            passwordCheckRules: [
                v=> !!v || '비밀번호 확인은 필수입니다.',
                v => v === this.password || '비밀번호가 일치하지 않습니다.',
            ],
            statusRules: [
                v=> !!v || '디자이너 혹은 의뢰인 확인은 필수입니다.',
            ],
        }
    },
    computed:{
        me(){
            return this.$store.state.users.me;
        }
    },
    watch:{
        me(value, oldValue){
            if(value){
                this.$router.push({
                    path: '/',
                });
            }
        }
    },
    methods:{
        onSubmitForm(){
            if (this.$refs.form.validate()){
                this.$store.dispatch('users/signUp',{



                    nickname:this.nickname,
                    email:this.email,
                    password:this.password,
                    status:this.status,


                    
                })
                    .then(()=>{
                        this.$router.push({
                            path: '/',
                        });

                    })
                    .catch(()=>{
                        alert('회원가입실패');
                    });
                
            }else{
                alert('폼이 유효하지 않습니다.');
            }

        },
        onSubmitForm2(){
            if (this.$refs.form.validate()){
                console.log(this.nickname,this.email,this.password,this.status);
                    
               
                
            }else{
                alert('폼이 유효하지 않습니다.');
            }

        }
    },
    head(){
        return {
            title: '회원가입'
        }
    },
    
    middleware: 'anonymous',

}
</script>

<style>

</style>
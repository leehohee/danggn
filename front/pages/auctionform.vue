<template>
    <v-card style="margin-bottom:20px">
        <v-container>
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                원하는 집을 입력해주세요.
                <v-text-field
                        v-model="tree"
                        label="구조공법"
                        type="nickname"
                        
                        required
                    />
                <v-text-field
                        v-model="py"
                        label="건축규모"
                        type="nickname"
                        
                        required
                    />
                <v-text-field
                        v-model="solo"
                        label="건축용도"
                        type="nickname"
                        required
                    />
                <v-btn type="submit" absolute right>다음으로</v-btn>
                
                
            </v-form>
        </v-container>
    </v-card>
  
</template>

<script>
import { mapState } from 'vuex';
export default {
    data(){
        return {
            valid:false,
            hideDetails:true, //에러표시해두는곳 
            successMessages:'',
            success: false,
            content:'',
            tree:'',
            py:'',
            solo:'',
        }
    },
    computed:{
        ...mapState('users', ['me']),
        ...mapState('posts',['imagePaths'])
    },
    methods:{
        onChangeTextarea(value){
            if(value.length){

                this.hideDetails = true;
                this.success = false;
                this.successMessages = '';
            }
        },
        onSubmitForm(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('posts/selecthouse',{
                    content: this.content,
                    tree: this.tree,
                    py: this.py,
                    solo: this.solo,
                    
                })
                    .then(()=>{
                        this.$router.push({
                            path: '/selecthouse',
                        });
                    })
                    .catch(()=>{

                    });
            }
        },
        
    }
}
</script>

<style>

</style>
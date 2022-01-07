<template>
    <v-form ref="form" v-model="valid" style="position:relative" @submit.prevent="onSubmitForm">
        <v-text-field
            v-model="content"
            filled
            auto-grow
            label="입찰금액"
            :hide-details="hideDetails"
            :success="success"
            :success-messages="successMessages"
            @input="onChangeTextarea"
        />
        <v-btn dark absolute top right type="submit">입찰하기</v-btn>
    </v-form>
  
</template>

<script>
export default {
    props: {
        postId:{
            type: String,
            required: true,
        }
    },
    data(){
        return {

            valid: false,
            content:'',
            success: false,
            successMessages:'',
            hideDetails:true,
        }
    },
    computed: {
        me() {
            return this.$store.state.users.me;
        },
    },
    methods:{
        onChangeTextarea(value){
            if(value.length){
                this.hideDetails =true;
                this.success = false;
                this.successMessages = '';

            }
        },
        onSubmitForm(){
            if (this.$refs.form.validate()){
                this.$store.dispatch('posts/addComment',{
                    
                    postId: this.postId,
                    content:this.content,
                    

                })
                .then(()=>{
                    this.content = '';
                    this.success = true;
                    this.successMessages='입찰이 완료되었습니다.';
                    this.hideDetails=false;
                })
                .catch(()=>{

                });
                
            }
        },
    },
};
</script>

<style>

</style>
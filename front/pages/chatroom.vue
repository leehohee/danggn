<template>
    <div width="100%" class="grey text-center hohee">
        <v-form @submit.prevent="onSubmitForm">
            <h4>중계채팅방</h4>
            <v-text-field
            class="white"
            v-model="content"
            outlined
            >

            </v-text-field>
            <v-btn x-large type="submit"><h4>가랏!</h4></v-btn>
        </v-form>
        <v-list-item v-for="(bomi,i) in cutebomi" :key="i" dense>
            
            <h2>{{me.nickname}}</h2><v-spacer></v-spacer>
            <h1>{{bomi}}</h1>
            
        </v-list-item>
    </div>
</template>




<script>
export default {
    data(){
        return {
            content:'',
            cutebomi:[],
            receiver:'bomi',
        } 

        
    },
    computed:{
        me(){
            return this.$store.state.users.me;
        },
        
    },
    methods:{
        onSubmitForm(){

            this.$store.dispatch('posts/chatSend',{
                

                content:this.content,
                receiver:this.receiver,

                    


                    
                })
                    .then(()=>{
                        console.log('잘됐따리');

                    })
                    .catch(()=>{
                        console.log('끈겨버렸따리');
                    });
            
            

        }
            
        
    }
}
</script>





<style>

</style>
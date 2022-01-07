<template>
    <v-card style="margin-bottom:20px">
        <v-container>
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm">
                <v-text-field
                    outlined
                    
                    clearable
                    v-model="content"
                    label="종로"
                    :hide-details="hideDetails"
                    :success-messages="successMessages"
                    :success="success"
                    @input="onChangeTextarea"
                />
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
                        
                        required
                    />
                <v-btn type="submit" absolute right>올리기</v-btn>
                <input ref="imageInput" type="file" multiple hidden @change="onChangeImages">
                <v-btn @click="onClickImageUpload" type="button">사진올리기</v-btn>
                <div>
                    <div v-for="(p, i) in imagePaths" :key="p" style="display: inline-block">
                        <img :src="`http://localhost:3085/${p}`" :alt="p" style="width: 200px">
                        <div>
                            <button @click="onRemoveImage(i)" type="button">제거</button>
                        </div>
                    </div>
                </div>
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
                this.$store.dispatch('posts/add2',{
                    content: this.content,
                    tree: this.tree,
                    py: this.py,
                    solo: this,solo,
                    
                })
                    .then(()=>{
                        this.content = '';
                        this.tree = '';
                        this.py = '';
                        this.solo = '';
                        this.hideDetails = false;
                        this.success = true;
                        this.successMessages = '게시글 등록 성공!';
                    })
                    .catch(()=>{

                    });
            }
        },
        onClickImageUpload(){
            this.$refs.imageInput.click();
        },
        onChangeImages(e){
            console.log(e.target.files);
            const imageFormData = new FormData();
            [].forEach.call(e.target.files, (f)=>{
                imageFormData.append('image', f);
            });
            this.$store.dispatch('posts/uploadImages', imageFormData);

        },
        onRemoveImage(index){
            this.$store.commit('posts/removeImagePath', index);
        }
    }
}
</script>

<style>

</style>
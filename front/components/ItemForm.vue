<template>
    <v-card elevation="0" min-width="100%" :style="{width:'100%', marginBottom:'100px'}">
        <v-container fluid>
            
            <v-form ref="form" v-model="valid" @submit.prevent="onSubmitForm2">
                <h4><v-btn @click="onClick">제목</v-btn></h4>
                <v-text-field
                    v-model="title"
                    counter
                    clearable
                    outlined
                    required
                    dense
                />
                <input ref="imageInput" type="file" multiple hidden @change="onChangeImages">
                <v-btn @click="onClickImageUpload" type="button">대표이미지등록</v-btn>
                <div class="mt-5">
                    <div class="mb-2" v-for="(p, i) in imagePaths" :key="p" style="display: inline-block">
                        <img :src="`http://localhost:3065/${p}`" :alt="p" style="width: 200px">
                        <div>
                            <button @click="onRemoveImage(i)" type="button">제거</button>
                        </div>
                    </div>
                </div>
                <h4>카테고리</h4>
                <v-select
                :items="items"
                v-model="category"
                outlined
                dense
                ></v-select>
                <h4>서비스 설명</h4>
                <v-textarea
                    outlined
                    
                    clearable
                    counter
                    no-resize
                    rows="10"
                    v-model="content"
                    placeholder="디자이너 소개, 작업 가능 분야, 작업 제공 절차, 서비스 특정에 대해서 의뢰인이 이해하기 쉽도록 정확하게 작성해 주세요."
                    :value="value"
                    :hide-details="hideDetails"
                    :success-messages="successMessages"
                    :success="success"
                    @input="onChangeTextarea"
                />
                <input ref="image2Input" type="file" multiple hidden @change="onChangeImage2s">
                <v-btn class="mt-5" @click="onClickImage2Upload" type="button">상세이미지등록</v-btn>
                <div class="mt-5">
                    <div class="mb-2" v-for="(p, i) in image2Paths" :key="p" style="display: inline-block">
                        <img :src="`http://localhost:3065/${p}`" :alt="p" style="width: 200px">
                        <div>
                            <button @click="onRemoveImage2(i)" type="button">제거</button>
                        </div>
                    </div>
                </div>
                <h4 class="mt-5">수정 및 재진행 안내</h4>
                <v-textarea
                    outlined
                    
                    clearable
                    counter
                    
                    v-model="modify"
                    placeholder="무상으로 제공 가능한 수정 범위를 구체적으로 작성해주세요."
                    :value="value"
                    :hide-details="hideDetails"
                    :success-messages="successMessages"
                    :success="success"
                    @input="onChangeTextarea"
                />
                
                <h4 class="mt-5">취소 및 환불 규정</h4>
                <div class="pa-1"><h5 class="grey--text">취소 및 환불규정은 판매하시는 서비스의 관련 법령에 따라 일괄 적용됩니다.</h5></div>
                <h4 class="mt-5">가격설정</h4>
                <v-text-field
                    v-model="cost"
                    dense
                    clearable
                    outlined
                    required
                    prepend-icon="mdi-currency-krw"
                    :rules="costRules"
                />
                <v-btn type="submit" absolute right>제출하기</v-btn>
                
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
            title:'',
            items: ['로고', '배너', '포스터', '패키지','디테일','비디오'],
            category:'',
            value: 'Hello!',
            cost:'',
            modify:'',
            costRules: [
                v=> !!v || '가격은 필수입니다.',
                v => v.length >= 4 || '가격은 1000원 이상이어야 합니다.'
            ],
        }
    },
    computed:{
        ...mapState('users', ['me']),
        ...mapState('posts',['imagePaths']),
        ...mapState('posts',['image2Paths']),
        mainItems(){
            return this.$store.state.posts.mainItems;
        },
    },
    fetch({ store, params }) {
        return store.dispatch("posts/loadItem", 
            this.$route.params.id
        );
    },
    mounted() {
        console.log(this.mainItems);
        

    },
    methods:{
        onChangeTextarea(value){
            if(value){

                this.hideDetails = true;
                this.success = false;
                this.successMessages = '';
            }
        },
        onSubmitForm(){
            
        },
        onSubmitForm2(){
            if(this.$refs.form.validate()){
                this.$store.dispatch('posts/addItem',{
                    content: this.content,
                    modify:this.modify,
                    category:this.category,
                    cost:this.cost,
                    title:this.title,
                    
                })
                    .then(()=>{
                        this.content = '';

                        this.hideDetails = false;
                        this.success = true;
                        this.successMessages = '게시글 등록 성공!';

                        this.$router.push({
                            path: '/',
                        });
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
        },

        onClickImage2Upload(){
            this.$refs.image2Input.click();
        },
        onChangeImage2s(e){
            console.log(e.target.files);
            const image2FormData = new FormData();
            [].forEach.call(e.target.files, (f)=>{
                image2FormData.append('image', f);
            });
            this.$store.dispatch('posts/uploadImage2s', image2FormData);

        },
        onRemoveImage2(index){
            this.$store.commit('posts/removeImage2Path', index);
        },
        onClick(){
            console.log(this.mainItems + '왜하나만안뜰까')
        },
    }
}
</script>

<style>

</style>
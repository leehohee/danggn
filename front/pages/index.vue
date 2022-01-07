<template>
    <v-container class="ma-0 pa-0" fluid>
    
        

        

        <div>
            <v-row>
                <v-col>
                    <div class="mt-3"><h3>내가 찜한 거래</h3></div>
                </v-col>
                <v-col>
                    <div class="text-right mt-3">
                        <h5 class="mt-2">
                            <a href="#">모두보기 ></a>
                        </h5>
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <v-slide-group
                    v-model="model"
                    class="pa-0 ma-0"
                    center-active
                    show-arrows
                    >
                    <v-slide-item
                        v-for="(item, i) in item2s"
                        :key="i"
                        v-slot="{ toggle }"
                        show-arrows="false"
                    >   
                        <v-card
                        color="white"
                        class="mt-n3"
                        height="175"
                        width="145"
                        elevation="0"
                        @click="toggle"
                        
                        nuxt to="/"
                        >
                        
                            <v-list-item dense class="px-1 my-0" two-line>
                                <v-list-item-content>
                                    <v-avatar
                                    class="ma-0 pa-0"
                                    size="108"
                                    tile
                                    >
                                        <v-img
                                        :src="item.src"
                                        max-width="145"
                                        contain
                                        ></v-img>
                                    </v-avatar>
                                    <v-list-item-subtitle dense v-text="item.title" class="pa-1 mb-n1">
                                    
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle class="pt-1">
                                    <span style="fontWeight:900">{{item.cost}}</span>
                                    </v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-card>
                    </v-slide-item>
                    </v-slide-group>
                </v-col>
            </v-row>
        </div>
        <div>
            <v-row>
                <v-col>
                    <div class="mt-3"><h3>추천 거래</h3></div>
                </v-col>
                
            </v-row>
            <v-row>
                <v-col
                v-for="(item, i) in item2s"
                :key="i"
                cols="12"
                >
                <v-card
                    :color="item.color"
                    max-height="98"
                    
                    elevation="0"
                    nuxt to="/"
                >
                    <div class="d-flex flex-no-wrap">

                    <v-avatar
                        class="ma-0"
                        size="98"
                        tile
                    >
                        <v-img
                        :src="item.src"
                        max-height="98"
                        ></v-img>
                    </v-avatar>
                    <div class="pl-3">
                        <v-card-subtitle
                        style="width: 250px;" class="text-truncate"
                        v-text="item.title"
                        ></v-card-subtitle>

                        <v-row
                        align="center"
                        class="ml-n1 mt-2"
                        >
                        <v-card-subtitle>{{item.location}}</v-card-subtitle>
                        <v-spacer></v-spacer>    
                        <v-card-subtitle>{{item.time}}</v-card-subtitle>    
                        </v-row>

                        <v-card-actions>
                        

                        <v-btn
                            
                            class="white ml-n2 mt-0 pa-0 pb-2"
                            elevation="0"
                            
                            
                        >
                        <span style="fontWeight:900">11,000 원</span>
                        </v-btn>
                        </v-card-actions>
                    </div>

                    
                    </div>
                </v-card>
                </v-col>
            </v-row>
            <v-row class="mt-5 mb-5">
                
                    
                
            </v-row>
            <v-row>
                <v-container fluid>
                    <v-row>
                        <v-col class="border-top-solid border-bottom-solid">
                            <div
                            class="d-flex justify-space-around"
                            max-width="100%"
                            >
                                <h5 class="inline-block"><a href="#">서비스 소개</a></h5>
                                <h5 class="inline-block"><a href="#">FAQ</a></h5>
                                <h5 class="inline-block"><a href="#">고객센터</a></h5>
                                
                                

                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="text-center">
                            <h6>
                                (주)홍당무마켓은 통신판매중개자이며, 통신판매의 당사자가 아닙니다.<br>
                                상품, 상품정보, 거래에 관한 의무와 책임은 판매회원에게 있습니다.
                 
                            </h6>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="d-flex justify-center text-center">
                            <h5>
                                (주)홍당무마켓 사업자정보
                            </h5>
                            <v-avatar
                                class="ma-0 mt-1"
                                size="10"
                                tile
                            >
                                <v-img
                                src="https://kmong.com/img/seller/become_seller/ic_become_seller_faq.png"
                                max-height="10"
                                ></v-img>
                            </v-avatar>	
                            
                        </v-col>
                    </v-row>
                    <v-row></v-row>
                    <v-row class="pa-0">
                        <v-col class="pa-0">
                            <v-col class="text-center" style="fontSize:13px">
                                <a href="#">사업자정보 확인</a>
                                <span>|</span>
                                <a href="#">이용약관</a>
                                <span>|</span>
                                <a href="#">개인정보처리방침</a>

                            </v-col>
                        </v-col>
                    </v-row>
                    <v-row class="mb-0 text-center">
                        <v-col cols="6">
                            <a href="https://play.google.com/store/apps/details?id=com.kmong.kmong">
                                <v-img
                                src="https://kmong.com/img/kmong_is/img_google_play.png"
                                contain
                                max-height="44"
                                ></v-img>
                            </a>
                        </v-col>
                        <v-col cols="6">
                            <a href="http://itunes.apple.com/kr/app//id1039179300?mt=8">
                                <v-img
                                src="https://kmong.com/img/kmong_is/img_app_store.png"
                                contain
                                max-height="44"
                                ></v-img>
                            </a>
                        </v-col>
                    </v-row>
                    <v-row class="mb-11 text-center">
                        <v-col class="text-center">
                            <h5>© 2021 홍당무마켓 Inc. All rights reserved.</h5>
                        </v-col>
                    </v-row>
                </v-container>
            </v-row>
        </div>
        
        


        
    </v-container>      
</template>

<script>
export default {
    computed:{
        height (){
            switch (this.$vuetify.breakpoint.name){
                case 'xs' : return 100
                case 'md' : return 500
                default : return 300
            }
        },
        
    },
    data () {
      return {
        
        item2s: [
        {
          color: '#ffffff',
          src: 'http://kkalstudio.com/files/attach/images/137/721/005/a571b95b1e8140684e83a93b0162ed37.JPG',


          title: '사다리 무료나눔',
          artist: 'Foster the People',
          cost: '5,000 원',
          location: '송파구 오금동',
          time: '1일 전',
        },
        {
          color: 'gray',
          src: 'http://kkalstudio.com/files/attach/images/137/160/006/474a503356237a59c9c1dc9c1b57defa.jpg',
          title: '머그(정품)',
          artist: '최길동',
          cost: '25,000 원',
          location: '마포구 연남동',
          time: '11일 전',
        },
        {
          color: 'gray',
          src: 'http://kkalstudio.com/files/attach/images/137/146/006/1d31fafde44eba924b2c8ec4311ed811.jpg',
          title: '새제품 팝니다',
          artist: 'Foster the People',
          cost: '35,000 원',
          location: '관악구 조원동',
          time: '1일 전',
        },
        {
          color: 'gray',
          src: 'http://kkalstudio.com/files/attach/images/137/689/005/7cb129f58fd69559d2328491385b3861.jpg',
          title: '화장품 가져가실분 찾습니다',
          artist: '유길동',
          cost: '5,000 원',
          location: '동작구 상도동',
          time: '16일 전',
        },
        {
          color: 'gray',
          src: 'http://kkalstudio.com/files/attach/images/137/525/005/c417f27eabb52ce3649f569a0d6a1a15.jpg',
          title: '"벌꿀세트 삽니다',
          artist: '김길동',
          cost: '25,000 원',
          location: '강남구 역삼1동',
          time: '5일 전',
        },
        
        {
          color: 'gray',
          src: 'http://kkalstudio.com/files/attach/images/137/276/4a54cf3121b81bcfd2b72693965d7e4f.JPG',
          title: '가방',
          artist: '홍길동',
          cost: '15,000 원',
          location: '노원구 하계동',
          time: '10일 전',
        },
      ],
      }
    },
}
</script>

<style scoped>
a {
    text-decoration: none !important;
    color:black !important;
}
.border-top-solid {
    border-top : solid #e6e6e6 1px !important;
}
.border-bottom-solid {
    border-bottom : solid #e6e6e6 1px !important;
}
</style>
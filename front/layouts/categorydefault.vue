<template>
    <v-app>
            

            <v-app-bar
            class="white"
            app
            dense
            flat
            outlined
            justify="space-between"
            no-gutter
            :style="{ position:'fixed', top: '0px',zIndex:'100', width:'100%', marginLeft:'0px'}"
            >
                
                    <v-btn v-if="1" @click="goBack" icon :style="{ marginLeft:'0px',paddingLeft:'0px', display:'flex', alignItems: 'center'}">
                            <v-icon large>mdi-chevron-left</v-icon>
                    </v-btn>
                    
                    
                    <v-spacer></v-spacer>
                    
                    <v-toolbar-title>
                        
                        <nuxt-link to="/"><h4>자유게시판</h4></nuxt-link>
                        
                    </v-toolbar-title>
                    
                    <v-spacer></v-spacer>
                    
                    <v-btn icon :style="{ opacity:'0', marginRight:'0px',paddingRight:'0px', display:'flex', alignItems: 'center'}">
                            <v-icon large>mdi-chevron-left</v-icon>
                    </v-btn>
                    
                    
                
            </v-app-bar>
            
            <v-navigation-drawer app
            v-model="drawer"
            right
            :style="{zIndex:'100',}"
            hide-overlay
            width="100%"
            clipped
            >
                <v-row>
                    <v-col cols="1"><v-btn class="px-0 mt-1" flat elevation="0" @click.stop="drawer = !drawer"><v-icon large>mdi-chevron-left</v-icon></v-btn></v-col>
                    <v-col cols="11">
                        <v-form>
                            <v-text-field
                            placeholder="검색어를 입력하세요."
                            class="pa-0 ml-4"
                            hide-details="false"
                            clearable
                            rounded
                            >

                            </v-text-field>
                        </v-form>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-container>
                            <div>추천 검색어</div>
                            <v-list-item
                            v-for="i in 10"
                            :key="i"
                            dense
                            >
                                <v-list-item-icon>
                                    <v-icon v-text="i"></v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>디자인</v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-container>
                        

                    </v-col>
                </v-row>
            </v-navigation-drawer>
            
            <v-main>
            <v-col cols="12" md="12">





            <nuxt />






            </v-col>
            
            </v-main>


                
            <v-footer app>
            <v-bottom-navigation
            v-model="value"
            absolute
            class="white pa-4"
            :style="{boxShadow: '0 -1.5px 0 0 rgb(0 0 0 / 10%)',paddingRight:'5vw',paddingLeft:'3vw',position:'fixed', top: 'calc(100vh - 56px)',zIndex:'100', width:'100%'}"
            grow
            
            >
                <v-btn nuxt to="/" value="home" class="white">
                <span :style="{ fontSize:'0.6rem',marginTop:'0.5rem'}"><nuxt-link to="/">홈</nuxt-link></span>
                <v-icon>mdi-home</v-icon>
                </v-btn>

                <v-btn nuxt to="/categorypage" value="category" class="white">
                <span :style="{ fontSize:'0.6rem',marginTop:'0.5rem'}">게시판</span>
                <v-icon>mdi-view-grid-outline</v-icon>
                </v-btn>

                <v-btn nuxt to="/likepage" value="favorites" class="white">
                <span :style="{ fontSize:'0.6rem',marginTop:'0.5rem'}">내근처</span>
                <v-icon>mdi-map-marker</v-icon>
                </v-btn>

                <v-btn nuxt to="/messagepage" value="message" class="white">
                <span :style="{ fontSize:'0.6rem',marginTop:'0.5rem'}">채팅</span>
                <v-icon>mdi-email-outline</v-icon>
                </v-btn>

                <v-btn nuxt to="/mypage" value="user" class="white">
                <span :style="{ fontSize:'0.6rem',marginTop:'0.5rem'}">나의홍당무</span>
                <v-icon>mdi-account-outline</v-icon>
                </v-btn>
            </v-bottom-navigation>
            </v-footer>    
    </v-app>  
</template>

<script>


export default {
    components: {
        
        
    },
    
    data(){
        return {
            hashtag: '',
            drawer: false,    
        };
    },
    
    
    methods:{
        onSerachHashtag(){
            this.$router.push({
                path: `/hashtag/${encodeURIComponent(this.hashtag)}`,
            });
            this.hashtag='';
        },
        goBack(){
            this.$router.go(-1); [2]
        },
    },

    
}

</script>
    

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@500&display=swap');



    a {
        display:inline-block;
        text-decoration: none;
        color: inherit;
    }
    ul {
        text-decoration: none;
        list-style: none;
    }
    li {
        text-decoration: none;
    }
    h4 {
        
        font-weight: 500;
    }
    


   
</style>
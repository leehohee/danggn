<template>
    <v-app>
            
        <v-card
        
        >
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
                        
                        <nuxt-link to="/"><h4>채팅</h4></nuxt-link>
                        
                    </v-toolbar-title>
                    
                    <v-spacer></v-spacer>
                    
                    <v-btn icon @click.stop="drawer = !drawer" :style="{ marginRight:'0px',paddingRight:'0px',display:'flex', alignItems: 'center'}">
                            <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                    


                    
                    
                    
                    
                
            </v-app-bar>
            
            
        </v-card>    
            
            <v-main>
            <v-col cols="12" md="12">





            <nuxt />






            </v-col>
            
            </v-main>


                
            <v-footer app>
            <v-bottom-navigation
            v-model="value"
            absolute
            class="white pt-3"
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
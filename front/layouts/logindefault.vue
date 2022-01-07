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
                        
                        <nuxt-link to="/"><h4>로그인</h4></nuxt-link>
                        
                    </v-toolbar-title>
                    
                    <v-spacer></v-spacer>
                    <v-btn icon nuxt to="/" :style="{ marginLeft:'0px',paddingLeft:'0px', display:'flex', alignItems: 'center'}">
                           
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
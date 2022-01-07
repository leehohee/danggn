<template>
  <div class="chat_wrap mt-4 mx-n2">
    <div class="header">
        <v-btn @click="onClick">{{chatmainItems.User.nickname}}님과의 메세지</v-btn>
    </div>
    <div class="chat">
        <ul>
            <li v-for="(chat, i) in chatList" :key="i">
                <div :class="{ right: chat.SenderId==me.id }">
                <div class="sender">
                    <span v-if="chat.SenderId===me.id">{{me.nickname}}</span>
                    <span v-else>{{chatmainItems.User.nickname}}</span>
                </div>
                
                <div class="message">
                    <span>{{chat.content}}</span>
                </div>
                </div>
            </li>


            
            
        </ul>
    </div>
    
    <div
    ref="scrollToMe" class="scrollmargin" :class="{ active: isActive }"
    
    >
    </div>
    <div class="input-div">
        <v-form action="" id="chatform">
            <v-textarea
            placeholder="메시지를 입력하세요"
            v-model="content"
            @click:append-outer="onSubmitForm"
            :append-outer-icon="message ? 'mdi-send' : 'mdi-send'"
            rows="2"
            solo
            no-resize
            >
            </v-textarea>
            
        </v-form>
    </div>
 
    <!-- format -->
 
    
</div>



</template>

<script>
export default {
    layout:'messagedefault',
    data() {
        return {
            content:'',
            isRight:true,
            isActive:true,
            name:''
        }
    },
    computed:{
        me(){
            return this.$store.state.users.me;
        },
        mainItems(){
        return this.$store.state.posts.mainItems;
        },
        chatmainItems() {
        return this.$store.state.posts.mainItems.find(
            (v) => v.UserId === parseInt(this.$route.params.id, 10)
        );
        },
        chatList() {
            return this.$store.state.posts.chatList;
        }

    },
    watch:{
        chatList() {
            this.scrollToElement();
            
        },
        
    },
    methods:{
        onSubmitForm(){
            
                
                this.$store.dispatch('posts/chatSend',{


                    content:this.content,
                    receiverId:this.$route.params.id,
                    senderId:this.$store.state.users.me.id,
                 
                })
                    .then(()=>{
                        

                    })
                    .catch(()=>{
                        
                    });
                
                this.content='';
               

        },
        onClick(){
            console.log(this.chatList);
        },
        scrollToElement() {
            const el = this.$refs.scrollToMe;
            const timer1 = setTimeout(() => {
                    this.isActive=true;
                    console.log(this.isActive + '첫번째')
                
                    // Use el.scrollIntoView() to instantly scroll to the element
                    el.scrollIntoView({behavior: 'smooth'});
                    // el.scrollTop = el.scrollHeight;
                    // window.scrollTop = window.scrollHeight;
                    const timer2 = setTimeout(() => {
                        this.isActive=false;
                        console.log(this.isActive + '두번째');
                    }, 200);
                }, 200);
                
            
            
            
            
        }
        
        
    },
    fetch({store, params}){  //fetch는 보통 store 넣을때 많이 쓴다.
        return store.dispatch('posts/chatGet',            
             encodeURIComponent(params.id)
             );
    },
    // created() {
    //     this.$store.dispatch('posts/chatGet', 
            
    //         this.$route.params.id,
    //         );
        
        
    // },
    mounted() {
        this.scrollToElement();
    }
}
</script>

<style scope>


.chat_wrap .header { position: sticky; top:47px; font-size: 14px; padding: 15px 0; background: #F18C7E; color: white; text-align: center;  }
 
.chat_wrap .chat { padding-bottom: 0px; }
.chat_wrap .chat ul { width: 100%; list-style: none; }
.chat_wrap .chat ul li { width: 100%; }
.chat_wrap .chat ul li.left { text-align: left; }
.chat_wrap .chat ul li.right { text-align: right; }
 
.chat_wrap .chat ul li > div { font-size: 13px;  }
.chat_wrap .chat ul li div > div.sender { margin: 10px 20px 0 20px; font-weight: bold; }
.chat_wrap .chat ul li div > div.message { display: inline-block; word-break:break-all; margin: 5px 20px; max-width: 75%; border: 1px solid #888; padding: 10px; border-radius: 5px; background-color: #FCFCFC; color: #555;}
 
.chat_wrap .input-div { position: fixed; bottom: 40px; width: 95vw; background-color: #fff; text-align: center; border-top: 0px solid #888; }
.chat_wrap .input-div > form > textarea { resize: none; width: 75%; height: 80px; border: 0px solid #888 ; padding: 10px; }
.chat_wrap .input-div > form > textarea:focus { outline:none !important; }

 
.format { display: none; }

.scrollmargin {
    
    height:15px;
    
}

.active{
    padding-top: 100px;
}
.scrollmargin2 {
    background-color: blue;
    padding-bottom:100px;
    
}

.right {
    color:blue;
    text-align:right;
}

</style>
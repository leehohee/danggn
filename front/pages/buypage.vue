<template>
    <div>
        <v-container>
            <v-row>
                
                
                <v-card
                    color="white"
                    max-height="98"
                    class="pa-0 ma-0"
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
                        src="https://d2v80xjmx68n4w.cloudfront.net/gigs/QbVBu1625654810.jpg"
                        max-height="98"
                        ></v-img>
                    </v-avatar>
                    <div class="pl-3">
                        <v-card-subtitle
                        
                        v-text="'미술, 디자인, 작가가 모여 감각적인 로고 제작해 드립니다.'"
                        ></v-card-subtitle>
                        <br>
                        <v-card-subtitle
                        
                        v-text="'로고고디자인'"
                        ></v-card-subtitle>
                        <v-row
                        align="center"
                        class="ml-n1 mt-2"
                        >
                            
                        </v-row>

                        <v-card-actions>
                        

                        
                        </v-card-actions>
                    </div>

                    
                    </div>
                    
                </v-card>
              
            </v-row>
            <v-row class="mt-10">
              <v-card width="100%" fluid>
                <v-btn
                block
                outlined
                x-large
                class="justify-start"
                >
                <v-radio
                  
                  
                  label="11,000원"
                  
                ></v-radio>
                STANDARD
                </v-btn>
              </v-card>
              
              <v-card width="100%" fluid>
                <v-btn
                block
                outlined
                x-large
                class="justify-start"
                >
                <v-radio
                  
                  
                  label="22,000원"
                  
                ></v-radio>
                DELUXE
                </v-btn>
              </v-card>

              <v-card width="100%" fluid>
                <v-btn
                @click="buyItem"
                block
                outlined
                x-large
                class="justify-start"
                >
                <v-radio
                  
                  
                  label="33,000원"
                  
                ></v-radio>
                PREMIUM
                </v-btn>
              </v-card>

            </v-row>
        </v-container>
    </div>

</template>

<script>
export default {
    layout:'buydefault',
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
        buyItem(){
          window.BootPay.request({
            price: '5000', //실제 결제되는 가격
            application_id: "619e506ce38c30001ed2bbeb",
            name: '테스트디자인', //결제창에서 보여질 이름
            
           
            show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
            items: [
                {
                    item_name: '테스트디자인', //상품명
                    qty: 1, //수량
                    unique: '1', //해당 상품을 구분짓는 primary key
                    price: 5000, //상품 단가
                    cat1: '로고', // 대표 상품의 카테고리 상, 50글자 이내
                    
                }
            ],
            user_info: {
                username: '이호희',
                email: 'leehohee@gmail.com',
                
            },
            order_id: '1234', //고유 주문번호로, 생성하신 값을 보내주셔야 합니다.
            
        }).error(function (data) {
            //결제 진행시 에러가 발생하면 수행됩니다.
            console.log(data);
        }).cancel(function (data) {
            //결제가 취소되면 수행됩니다.
            console.log(data);
        }).ready(function (data) {
            // 가상계좌 입금 계좌번호가 발급되면 호출되는 함수입니다.
            console.log(data);
        }).confirm(function (data) {
            //결제가 실행되기 전에 수행되며, 주로 재고를 확인하는 로직이 들어갑니다.
            //주의 - 카드 수기결제일 경우 이 부분이 실행되지 않습니다.
            console.log(data);
            var enable = true; // 재고 수량 관리 로직 혹은 다른 처리
            if (enable) {
                BootPay.transactionConfirm(data); // 조건이 맞으면 승인 처리를 한다.
            } else {
                BootPay.removePaymentWindow(); // 조건이 맞지 않으면 결제 창을 닫고 결제를 승인하지 않는다.
            }
        }).close(function (data) {
            // 결제창이 닫힐때 수행됩니다. (성공,실패,취소에 상관없이 모두 수행됨)
            console.log(data);
        }).done(function (data) {
            //결제가 정상적으로 완료되면 수행됩니다
            //비즈니스 로직을 수행하기 전에 결제 유효성 검증을 하시길 추천합니다.
            console.log(data);
        });
        },


        
    },
}
</script>

<style>

</style>
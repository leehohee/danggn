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
                    <PostImages :images="mainItems[0].Images || []" />    
                    </v-avatar>
                    <div class="pl-3">
                        <v-card-subtitle>
                            {{mainItems[0].title}}
                        </v-card-subtitle>
                        <br>
                        <v-card-subtitle>
                            {{mainItems[0].User.nickname}}
                        </v-card-subtitle>
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
            
            <v-row width="100" class="mt-10">
                <v-card elevation="0" width="100%">
                    

                    <v-row>
                    <v-col
                    cols="8"
                    
                    
                    >
                    <h5>총 서비스 금액</h5>
                    </v-col>
                    <v-col cols="4" class="text-right">
                    <h5>{{mainItems[0].cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} 원</h5>
                    </v-col>
                    </v-row>

                    

                    <v-row>
                    <v-col
                    cols="8"
                    
                    
                    >
                    <h5>총 결제 금액</h5>
                    </v-col>
                    <v-col cols="4" class="text-right">
                    <h4>{{mainItems[0].cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} 원</h4>
                    </v-col>
                    </v-row>
                </v-card>
            </v-row>
            
            

            <v-row width="100" class="mt-12">
                <v-card elevation="0" width="100%">
                    <h4>세금 계산서</h4>
                    <v-card-subtitle class="mt-5">
                        ·개인 전문가이므로 세금계산서 발행이 불가능합니다.<br>
                        ·현금영수증(사업자지출증빙)/신용카드 매입전표는 매입세액공제 사용이 불가능합니다.<br>
                        ·현금영수증/신용카등 영수증은 개익 소득 공제용으로만 사용하실 수 있습니다.<br>
                    </v-card-subtitle>
                </v-card>
            </v-row>
            <v-row width="100%">
                <v-checkbox
                @click="onClick"
                required
                ref="form"
                v-model="checkbox"
                label="주문 내용을 확인하였으며, 결제에 동의합니다. (필수)"
                ></v-checkbox>
                <v-col cols="12">
                <v-row width="100%">
                    <v-col width="100%">
                        <v-btn @click="buyItem" width="100%" class="yellow">
                            {{mainItems[0].cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}원 결제하기
                            </v-btn>
                    </v-col>
                </v-row>
                </v-col>
            </v-row>
            <v-row width="100vw" class="text-center mb-10">
                <h6>서비스 제공이 완료된 이후에 전문가에게 결제 대금이 전달됩니다.</h6>
            </v-row>


        </v-container>
    </div>

</template>

<script>
import PostImages from '~/components/PostImages';
export default {
    layout:'orderdefault',
    data(){
        return {
            checkbox:false,
        }
    },
    components:{
        PostImages,
    },
    computed: {
        mainItems(){
            return this.$store.state.posts.mainItems;
        },
        Orders(){
            return this.$store.state.posts.order;
        },
    },
    methods:{
        
        buyItem(){
        if (this.checkbox){
          window.BootPay.request({
            price: this.mainItems[0].cost, //실제 결제되는 가격
            application_id: "619e506ce38c30001ed2bbeb",
            name: this.mainItems[0].title, //결제창에서 보여질 이름
            
           
            show_agree_window: 0, // 부트페이 정보 동의 창 보이기 여부
            items: [
                {
                    item_name: this.mainItems[0].title, //상품명
                    qty: 1, //수량
                    unique: '1', //해당 상품을 구분짓는 primary key
                    price: this.mainItems[0].cost, //상품 단가
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

        }else{
                alert('주문내용확인을 체크해주세요.');
            }
        },
        

        onClick(){
            console.log(this.mainItems);
            console.log(this.checkbox + '이것은체크박스입니다.')
            console.log(this.Orders+'이것은주문입니다.');
        }
    }
}
</script>

<style>

</style>
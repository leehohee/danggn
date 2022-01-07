<template>
    <div>
        <v-img
        
        
        max-width="100%"
        :src="`http://localhost:3065/${mainItems.Images[0].src}`"
        ></v-img>
        <v-container>
            <v-row>
                <v-list-item dense class="px-1 my-0" two-line>
                    <v-list-item-content>
                        
                        <v-list-item-subtitle dense class="pa-1 mb-n1">
                        카테고리 > {{mainItems.Category.name}} 
                        </v-list-item-subtitle>
                        <v-list-item-title class="pt-1">
                        <span style="fontWeight:900"><v-btn @click="onClick">{{mainItems.title}}</v-btn></span>
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-row>
            <v-row>
                <v-rating
                :value="4.5"
                color="amber"
                dense
                half-increments
                readonly
                size="16"
                ></v-rating>

                <div class="pt-1 grey--text ms-1">
                4.5 (413)
                </div>
            </v-row>
            <v-row>
                {{mainItems.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}} 원

            </v-row>
            <v-row class="pt-10">
                <v-card class="px-4" elevation="0">
                  <v-row>서비스설명</v-row>
                  <v-row>
                    <h5>{{mainItems.content}}</h5>
                  </v-row>

                </v-card>
            </v-row>
            <v-row justify="space-around">
              
                
                  <v-col cols="12">
                    
                    
                    <v-img
                      :src="`http://localhost:3065/${mainItems.Images[0].src}`"
                      
                    ></v-img>
                    
                    
                  </v-col>

                  
                  
                
            </v-row>
            <v-row>
              <v-card class="mt-5" elevation="0">
                <span>수정 및 재진행</span>
                
                <h5 class="description">
                  {{mainItems.modify}}
                </h5>	
              </v-card>
            </v-row>
            <v-row>
              <v-card class="mt-5" elevation="0">
                <span>취소 및 환불 규정</span>
                
                <h5 class="description">
                  01. 전문가와 의뢰인 간의 상호 협의 후 청약철회가 가능합니다. <br>
                  <br>02. 전문가의 귀책사유로 디자인작업을 시작하지 않았거나 혹은 이에 준하는 보편적인 관점에서 심각하게 잘못 이행한 경우 결제 금액 전체 환불이 가능합니다. <br><br>
                  03. 전문가가 작업 기간 동안 지정된 서비스를 제공하지 못할 것이 확실한 경우 지급받은 서비스 비용을 일할 계산하여 작업물 개수와 작업 기간 일수만큼 공제하고 잔여 금액을 환불합니다. <br><br>
                  04. 서비스 받은 항목을 공제하여 환불하며, 공제 비용은 정가 처리됩니다.<br>가. 소비자 피해 보상 규정에 의거하여 작업물 원본의 멸실 및 작업 기간 미이행 및 이에 상응하는 전문가 책임으로 인한 피해 발생 시, 전액 환불 <br>
                  나. 시안 작업 진행된 상품 차감 환불<br>
                  ⓐ. '디자인'에 대한 금액이 서비스 내 별도 기재가 되지 않았거나, 디자인 상품 패키지 내 수정 횟수가 1회(1회 포함) 이상인 서비스 상품의 시안 or 샘플이 제공된 경우<br>
                  → 구매금액의 10% 환불(디자인 비용이 별도 기재되어 있는 경우, 해당금액 차감 후 환불)<br>※ 시안 제공 및 수정이 추가로 이뤄진 경우 환불 금액내 수정 횟수에 따라 분할하여 환불. <br><br>
                  05. 주문 제작 상품 등 서비스 받은 항목이 없으며, 결제 후 1일 이내 작업이 진행되기 전 시점은 전액 환불 가능. <br><br>
                  06. 다만, 환불이 불가능한 서비스에 대한 사실을 표시사항에 포함한 경우에는 의뢰인의 환불요청이 제한될 수 있습니다. <br>
                  가. 고객의 요청에 따라 개별적으로 주문 제작되는 재판매가 불가능한 경우(인쇄, 이니셜 각인, 사이즈 맞춤 등) <br>
                  ⓐ. 주문 제작 상품 특성상 제작(인쇄 등) 진행된 경우. <br>
                  ⓑ. 인쇄 색상의 차이 : 모니터의 종류에 따라 색상의 차이가 발생하며,인쇄 시마다 합판 인쇄 방법의 특성상 색상 표현의 오차가 발생함. <br>
                  ⓒ. 디자인 서비스이며 수정 횟수가 존재하지 않았던 상품일 경우 시안 수령 후 환불 불가
                </h5>
              </v-card>
            </v-row>
            <v-row>
              <v-card elevation="0" class="mt-5">
                <span>전문가 정보</span>
                
                
                <v-card-subtitle>{{mainItems.User.nickname}}</v-card-subtitle>

              </v-card>          
                    

                    
            </v-row>        
                    <v-row>
                      <v-col cols="3">
                        <div>총작업개수</div>
                        <div>1984건</div>
                      </v-col>
                      <v-col cols="3">
                        <div>만족도</div>
                        <div>99%</div>
                      </v-col>
                      <v-col cols="3">
                        <div>평균응답시간</div>
                        <div>1시간 내외</div>
                      </v-col>
                      <v-col cols="3">
                        <div>회원구분</div>
                        <div>개인</div>
                      </v-col>
                      
                    </v-row>
                
              
            
            
              <v-card elevation="0" class="mt-5">
                <span>서비스 평가</span>
                
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
                        5.0
                    </v-avatar>
                    <div class="pl-3">
                        <v-card-subtitle
                        
                        v-text="text"
                        ></v-card-subtitle>

                        <v-row
                        align="center"
                        class="ml-n1 mt-2"
                        >
                            <v-rating
                            :value="4.5"
                            color="amber"
                            dense
                            half-increments
                            readonly
                            size="16"
                            ></v-rating>

                            <div class="pt-1 grey--text ms-1">
                            
                            </div>
                        </v-row>

                        <v-card-actions>
                        

                        <v-btn
                            
                            class="white ml-n2 mt-0 pa-0 pb-2"
                            elevation="0"
                            
                            
                        >
                        <span style="fontWeight:900">1,501개의 평가</span>
                        </v-btn>
                        </v-card-actions>
                    </div>

                    
                    </div>
                    <v-row>
                      <v-col cols="12">
                        <h5>실제 컴포디를 통해 구매한 이용자들이 남긴 평가입니다.</h5>
                        
                      </v-col>
                      
                      
                    </v-row>
                </v-card>
              </v-card>
            
            
              <v-card elevation="0" class="mt-5 mb-10">
                <span>구매후기</span>
                
                
              </v-card>

            
            <v-row>
              
                
                

            </v-row>
            <v-row></v-row>
            <v-row></v-row>
            <v-row></v-row>
            <v-row></v-row>
            <v-row></v-row>
            <v-row></v-row>
            <v-row></v-row>
            <v-row><v-card></v-card></v-row>
            <v-row></v-row>
            <v-row></v-row>
            <v-row></v-row>
            

        </v-container>

    </div>

</template>

<script>
export default {
  layout: "detaildefault",
  data() {
    return {};
  },
  components: {},
  computed: {
    mainItems() {
      return this.$store.state.posts.mainItems.find(
        (v) => v.id === parseInt(this.$route.params.id, 10)
      );
    },
  },
  fetch({ store, params }) {
    return store.dispatch("posts/loadItem", params.id);
  },
  methods: {
    onClick() {
      console.log(this.mainItems);
    },
  },
};
</script>

<style>
</style>
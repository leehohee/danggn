<template>
  <div>
    <v-row>
      <v-col>
        <div class="mt-3"><h3>내가 찜한 서비스</h3></div>
      </v-col>
      <v-col>
        <div class="text-right mt-3">
          <h5 class="mt-2">
            <nuxt-link to="likepage"> 모두보기 ></nuxt-link>
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
            v-for="(item, i) in likeItems"
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
              nuxt
              :to="'/item/' + item.id"
            >
              <v-list-item dense class="px-1 my-0" two-line>
                <v-list-item-content>
                  <v-avatar class="ma-0 pa-0" size="108" tile>
                    
                    <v-img :src="`http://localhost:3065/${item.Images[0].src}`" max-width="145" contain></v-img>
                  </v-avatar>
                  <v-list-item-subtitle
                    dense
                    v-text="item.title"
                    class="pa-1 mb-n1"
                  >
                  </v-list-item-subtitle>
                  <v-list-item-subtitle class="pt-1">
                    <span style="fontweight: 900"><v-btn @click="onClick">{{item.cost}}</v-btn></span>
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </v-slide-item>
        </v-slide-group>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src: "https://d2v80xjmx68n4w.cloudfront.net/assets/images/curated_contents/Au8Dj_curated_content_item_main_mobile_654.jpg",
        },
        {
          src: "https://d2v80xjmx68n4w.cloudfront.net/assets/images/curated_contents/YFwsc_curated_content_item_main_mobile_655.png",
        },
        {
          src: "https://d2v80xjmx68n4w.cloudfront.net/assets/images/curated_contents/Au8Dj_curated_content_item_main_mobile_654.jpg",
        },
        {
          src: "https://d2v80xjmx68n4w.cloudfront.net/assets/images/curated_contents/YFwsc_curated_content_item_main_mobile_655.png",
        },
      ],
      item2s: [
        {
          color: "#ffffff",
          src: "https://d2v80xjmx68n4w.cloudfront.net/gigs/QbVBu1625654810.jpg",
          title: "미술,디자인,작가가 모여 감각적인 로고 제작해 드립니다.",
          artist: "Foster the People",
        },
        {
          color: "gray",
          src: "https://d2v80xjmx68n4w.cloudfront.net/gigs/D6OhI1637212595.jpg",
          title: '8년연속 만족 1위 수상" 디자인 1위의 신뢰를 보여 드립니다.',
          artist: "Foster the People",
        },
        {
          color: "gray",
          src: "https://d2v80xjmx68n4w.cloudfront.net/gigs/gStnB1633435839.jpg",
          title: '공모전 488회" 우승 명함 디자인 이벤트 드립니다.',
          artist: "Foster the People",
        },
        {
          color: "gray",
          src: "https://d2v80xjmx68n4w.cloudfront.net/gigs/T155E1634276078.jpg",
          title: "로고 제작 3,000건, 로고 디자인 드립니다.",
          artist: "Foster the People",
        },
        {
          color: "gray",
          src: "https://d2v80xjmx68n4w.cloudfront.net/gigs/sEfSY1634543284.jpg",
          title: '"카카오, SK 출신 디자인 팀" 압도적인 만족도 감사 드립니다.',
          artist: "Foster the People",
        },

        {
          color: "gray",
          src: "https://d2v80xjmx68n4w.cloudfront.net/gigs/ympAE1635611268.jpg",
          title: "아모레퍼시픽 CJ출신이 화장품 제품 패키지 디자인 해 드립니다.",
          artist: "Foster the People",
        },
      ],
    };
  },
  computed: {
    me() {
      return this.$store.state.users.me;
    },
    likeItems(){
        return this.$store.state.posts.likeItems;
    },
  },
  fetch({store}){
        //fetch는 보통 store 넣을때 많이 쓴다.
        return store.dispatch('posts/loadLikeItems', { 
          userId : store.state.users.me.id,
          reset: true
        });
  },
  methods:{
        onClick(){
            console.log(this.likeItems);
        }
  },
};
</script>

<style>
</style>
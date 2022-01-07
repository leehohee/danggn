<template>
  <div width="300">
    <v-row>
      <v-col v-for="(item, i) in mainItems" :key="i">
        <v-card max-height="98" width="100%" class="pa-0 ma-0" elevation="0">
          <div class="d-flex flex-row">
            <nuxt-link :to="'/item/' + item.id">
              <v-avatar class="ma-0" size="98" tile>
                <PostImages :images="item.Images || []" />
              </v-avatar>
            </nuxt-link>
            <div
              class="pl-3 flex-grow-1 flex-shrink-0"
              style="min-width: 100px; max-width: 100%"
            >
              <div class="d-flex flex-row">
                <v-card-subtitle>
                    <nuxt-link :to="'/item/' + item.id">
                  {{ item.title }}
                    </nuxt-link>
                </v-card-subtitle>
                <v-spacer></v-spacer>

                
                <v-menu
                    bottom
                    left
                    
                >
                    <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        
                        icon
                        v-bind="attrs"
                        v-on="on"
                        
                    >
                        <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                    </template>

                    <v-list>
                    <v-list-item>
                        <v-list-item-title><nuxt-link :to="'/itemedit/' + item.id">수정</nuxt-link></v-list-item-title>
                        
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title @click="onClickDelete(item.id)">삭제</v-list-item-title>
                        
                    </v-list-item>
                    </v-list>
                </v-menu>
              </div>

              <v-row align="center" class="ml-n1 mt-2">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="16"
                ></v-rating>

                <div class="pt-1 grey--text ms-1">4.5 (413)</div>
              </v-row>

              <v-card-actions>
                <v-btn class="white ml-n2 mt-0 pa-0 pb-2" elevation="0">
                  <span>{{
                    item.cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }}</span
                  ><span>원</span>
                </v-btn>
              </v-card-actions>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import PostImages from "./PostImages";
export default {
  components: {
    PostImages,
  },
  props: {
    mainItems: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    currentroute() {
      return this.$nuxt.$route.path.substr(1);
    },
  },
  methods: {
    onClickRouter() {
      this.$router.push({
        path: "/item/" + item.id,
      });
    },
    onClickModify() {
      this.$router.push({
        path: "/item/" + item.id,
      });
    },
    onClickDelete(id) {
        
        this.$store.dispatch('posts/removeItem',{
            itemId: id,
        })
        
      
    },
  },
};
</script>

<style>
</style>
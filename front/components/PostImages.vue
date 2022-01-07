<template>
    <div v-if="images.length === 0"></div>
    <div v-else-if="images.length === 1" height="98">
        <img
        :src="`http://localhost:3065/${images[0].src}`"
        :style="{height:'98px',}"
        
        
        height="98"
        />
        <ImageZoom v-if="imageZoomed" :closeModal="closeModal" :images="images" />
    </div>
    <div v-else-if="images.length === 2" style="display:flex">
        <v-img
        :src="`http://localhost:3065/${images[0].src}`"
        contain
        aspect-raio="2"
        style="flex:1"
        height="98"
        />
        <v-img
        :src="`http://localhost:3065/${images[1].src}`"
        contain
        aspect-raio="2"
        style="flex:1"
        height="98"
        />
        <ImageZoom v-if="imageZoomed" :closeModal="closeModal" :images="images" />
    </div>
    <div v-else-if="images.length > 2" style="display:flex">
        <v-img
        :src="`http://localhost:3065/${images[0].src}`"
        contain
        aspect-raio="2"
        style="flex:1"
        height="98"
        />
        <div style="flex:1;align-items:center; justify-content: center; display:flex" @click="zoomImages">
            <div style="text-align:center">

                <v-icon>mdi-dots-horizontal</v-icon>
                <div>더보기</div>
            </div>
        </div>
        <ImageZoom v-if="imageZoomed" :closeModal="closeModal" :images="images" />
    </div>
</template>

<script>
import ImageZoom from './ImageZoom';
export default {
    components:{ ImageZoom},
    props:{
        images:{
            type: Array,
            required:true,
        }
    },
    data(){
        return {
            imageZoomed: false,
        };
    },
    methods: {
        closeModal(){
            this.imageZoomed = false;
        },
        zoomImages(){
            this.imageZoomed = true;
        }
    }
}
</script>

<style>

</style>
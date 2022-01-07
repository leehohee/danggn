<template>
    <div v-if="images.length === 0"></div>
    <div v-else-if="images.length === 1">
        <v-img
        :src="`http://dothemagic.net:3085/${images[0].src}`"
        contain
        aspect-raio="2"
        @click="selectImage"
        />
        <ImageZoom v-if="imageZoomed" :closeModal="closeModal" :images="images" />
    </div>
    <div v-else-if="images.length === 2" style="display:flex">
        <v-img
        :src="`http://dothemagic.net:3085/${images[0].src}`"
        contain
        aspect-raio="2"
        style="flex:1"
        @click="selectImage"
        />
        <v-img
        :src="`http://dothemagic.net:3085/${images[1].src}`"
        contain
        aspect-raio="2"
        style="flex:1"
        @click="selectImage"
        />
        <ImageZoom v-if="imageZoomed" :closeModal="closeModal" :images="images" />
    </div>
    <div v-else-if="images.length > 2" style="display:flex">
        <v-img
        :src="`http://dothemagic.net:3085/${images[0].src}`"
        contain
        aspect-raio="2"
        style="flex:1"
        @click="selectImage"
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
    components:{ ImageZoom },
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
        },
        selectImage(){
            console.log(this.images[0].HashtagId);
            
            this.$store.dispatch('posts/selectImage',{
                id:this.images[0].HashtagId,
                
                
            })
            .then(()=>{
                this.$router.push({
                    path: '/',
                });
            })
            .catch(()=>{

            });
            
        },
    }
}
</script>

<style>

</style>
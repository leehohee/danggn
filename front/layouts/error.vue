<template>
  <div class="container">
    
  </div>
</template>

<script>
export default {
  props: ['error'],
  layout: 'blog', // you can set a custom layout for the error page
  created() {
        this.$router.push({
                path: `/`,
            });
    },
}
</script>
<template>
  <!-- 1111111 -->
  <!-- <div :style="note">
  </div> -->
  <!-- 2222222 -->
  <div>
    <img :src="imgUrl" alt="">
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgUrl: require('@/assets/404.png'),
      note: {
        backgroundImage: 'url(' + require('@/assets/404.png') + ')'
      }
    }
  }
}
</script>
<style scoped>
  /* div {
    height: 100%;
    background-repeat: no-repeat;
  } */
  div {
    height: 80%;
    text-align: center;
  }
  div img{
    width: 60%;
  }
</style>

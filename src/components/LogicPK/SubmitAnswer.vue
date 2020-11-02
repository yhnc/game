<template>
  <div id="app">
    <input type="checkbox" v-model="answer" value="0"/><img src="../../assets/cards/card0.png">
    <input type="checkbox" v-model="answer" value="1"/><img src="../../assets/cards/card1.png">
    <input type="checkbox" v-model="answer" value="2"/><img src="../../assets/cards/card2.png">
    <input type="checkbox" v-model="answer" value="3"/><img src="../../assets/cards/card3.png">
    <input type="checkbox" v-model="answer" value="4"/><img src="../../assets/cards/card4.png">
    <input type="checkbox" v-model="answer" value="5"/><img src="../../assets/cards/card5.png">
    <input type="checkbox" v-model="answer" value="6"/><img src="../../assets/cards/card6.png">
    <input type="checkbox" v-model="answer" value="7"/><img src="../../assets/cards/card7.png">
    <input type="checkbox" v-model="answer" value="8"/><img src="../../assets/cards/card8.png">
    <input type="checkbox" v-model="answer" value="9"/><img src="../../assets/cards/card9.png">
    <input type="checkbox" v-model="answer" value="10"/><img src="../../assets/cards/card10.png">
    <input type="checkbox" v-model="answer" value="11"/><img src="../../assets/cards/card11.png">
    <input type="checkbox" v-model="answer" value="12"/><img src="../../assets/cards/card12.png">
    <input type="checkbox" v-model="answer" value="13"/><img src="../../assets/cards/card13.png">
    <input type="checkbox" v-model="answer" value="14"/><img src="../../assets/cards/card14.png">
    <input type="checkbox" v-model="answer" value="15"/><img src="../../assets/cards/card15.png">
    <input type="checkbox" v-model="answer" value="16"/><img src="../../assets/cards/card16.png">
    <input type="checkbox" v-model="answer" value="17"/><img src="../../assets/cards/card17.png">
    <input type="checkbox" v-model="answer" value="18"/><img src="../../assets/cards/card18.png">
    <input type="checkbox" v-model="answer" value="19" /><img src="../../assets/cards/card19.png">
    <el-button type="primary" style="width:200px;height: 50px;font-size: 30px" v-on:click="submit">确定</el-button>
  </div>
</template>

<script>
export default {
  name: 'SubmitAnswer',
  data () {
    return {
      answer: []
    }
  },
  methods: {
    submit () {
      console.log('submit:', this.answer)
      this.$emit('submit-msg', this.answer)
    }
  },
  props: {
    submitData: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

<style scoped>
img{
  width: 75px;
  height: 75px;
}
</style>

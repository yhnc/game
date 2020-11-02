<template>
  <div>
    <h3>{{specific[toChildrenData.question]}}</h3>
    <h4 v-for="index in 4" :key="index">
      {{toChildrenData.name[index-1]}}:  {{toChildrenData.result[index-1]}}
    </h4>
  </div>
  <!--&lt;!&ndash;    <div>父组件通过字符串方式传过来的title -&#45;&#45; {{title}}</div>&ndash;&gt;-->
  <!--&lt;!&ndash;    <button @click="parentFun()">调用父组件的方法</button>&ndash;&gt;-->
  <!--&lt;!&ndash;    <div>通过父组件传过来的父组件对象调用的父组件的属性msg -&#45;&#45; {{parent.msg}}</div>&ndash;&gt;-->
</template>

<script>
export default {
  data () {
    return {
      specific: ['0的位置',
        '1的位置',
        '2的位置',
        '3的位置',
        '4的位置',
        '5的位置',
        '6的位置',
        '7的位置',
        '8的位置',
        '9的位置',
        '颜色相同且相邻的板块位置',
        '连续的数字板块位置',
        '所有数字的和',
        '蓝色卡牌数字和',
        '红色卡牌数字和',
        '左边三个卡牌数之和',
        '右边三个卡牌数之和',
        '最大牌与最小牌的差',
        '蓝色卡牌个数',
        '红色卡牌个数',
        '偶数牌个数',
        '奇数牌个数',
        '相同数字卡牌数目'
      ]
    }
  },
  props: {
    toChildrenData: {
      type: Object,
      default () {
        return {}
      }
    }
  }
}
</script>

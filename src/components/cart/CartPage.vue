<template>
    <el-table :data="tableData" style="width: 100%" ref="multipleTable">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column prop="user_id" label="用户id" width="120"></el-table-column>
        <el-table-column prop="user_name" label="用户名" width="120"></el-table-column>
        <el-table-column prop="goods_id" label="商品编号" width="120"></el-table-column>
        <el-table-column prop="goods_name" label="商品名称" width="120"></el-table-column>
        <el-table-column prop="image" label="商品图片" width="250">
            <el-image src="image" style="width: 230px;height: 180px"></el-image>
        </el-table-column>
        <el-table-column prop="goods_category" label="商品类别"></el-table-column>
        <el-table-column prop="goods_description" label="商品描述"></el-table-column>
    </el-table>
</template>

<script>
export default {
  name: 'CartPage',
  data () {
    return {
      tableData: []
    }
  }}
</script>

<style scoped>

</style>

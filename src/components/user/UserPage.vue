<template>
    <div>
        <el-row style="height: 840px;">
            <el-tooltip effect="dark" placement="right"
                        v-for="item in goods.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                        :key="item.id">
                <p slot="content" style="font-size: 14px;margin-bottom: 6px;">{{item.name}}</p>
                <p slot="content" style="font-size: 13px;margin-bottom: 6px">
                    <span>{{item.description}}</span>
                </p>
                <el-card style="width: 135px;margin-bottom: 20px;height: 233px;float: left;margin-right: 15px"
                         bodyStyle="padding:10px" shadow="hover">
                    <div class="cover" @click="editGood(item)">
                        <img :src="item.image" alt="图片">
                    </div>
                    <div class="name">
                        <p>{{item.name}}</p>
                    </div>
                </el-card>
            </el-tooltip>
            <edit-form @onSubmit="loadGoods()" ref="edit"></edit-form>
        </el-row>
        <el-row>
            <el-pagination
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="pageSize"
                    :total="goods.length">
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
import store from '../../store'

export default {
  name: 'UserPage',
  data () {
    return {
      goods: [],
      currentPage: 1,
      pageSize: 17
    }
  },
  mounted: function () {
    this.loadGoods()
  },
  methods: {
    loadGoods () {
      const _this = this
      this.$axios.get('shop/' + store.state.user.username).then(resp => {
        if (resp && resp.status === 200) {
          _this.goods = resp.data
        }
      })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
      console.log(this.currentPage)
    },
    editGood (item) {
      this.$refs.edit.dialogFormVisible = true
      this.$refs.edit.form = {
        id: item.id,
        name: item.name,
        image: item.image,
        description: item.description,
        category: item.category,
        uid: item.uid
      }
    }
  }
}
</script>

<style scoped>

    .cover {
        width: 115px;
        height: 172px;
        margin-bottom: 7px;
        overflow: hidden;
        cursor: pointer;
    }

    img {
        width: 115px;
        height: 172px;
        /*margin: 0 auto;*/
    }

    .name {
        font-size: 14px;
        text-align: left;
    }

    a {
        text-decoration: none;
    }

    a:link, a:visited, a:focus {
        color: #3377aa;
    }

</style>

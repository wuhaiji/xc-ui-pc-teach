<template>

  <div>
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-select v-model="params.siteId" placeholder="请选择站点">
          <el-option v-for="item in siteList" :key="item.siteId" :label="item.siteName" :value="item.siteId">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="页面别名">
        <el-input v-model="params.pageAliase"></el-input>
      </el-form-item>
      <el-form-item label="页面名称">
        <el-input v-model="params.pageName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-select v-model="params.pageType" placeholder="请选择类型">
          <el-option v-for="item in pageTypeList" :key="item.typeValue" :label="item.typeName" :value="item.typeValue">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
      <el-form-item>
        <router-link :to="{path:'/cms/page/add',query:{
          page:this.params.page,
          siteId:this.params.siteId,
          pageAliase: this.params.pageAliase
        }}">
          <el-button type="primary">新增</el-button>
        </router-link>
      </el-form-item>

    </el-form>

    <el-table :data="list" stripe style="width: 100%">
      <el-table-column type="index" width="60">
      </el-table-column>
      <el-table-column prop="pageName" label="页面名称" min-width="120">
      </el-table-column>
      <el-table-column prop="pageAliase" label="别名" width="120">
      </el-table-column>
      <el-table-column prop="pageType" label="类型（静态、动态）" width="100">
      </el-table-column>
      <el-table-column prop="pageWebPath" label="访问路径" min-width="120">
      </el-table-column>
      <el-table-column prop="pagePhysicalPath" label="物理路径" min-width="120">
      </el-table-column>
      <el-table-column prop="pageCreateTime" label="创建时间" min-width="120">
      </el-table-column>
      <el-table-column label="操作" min-width="120">
        <template slot-scope="page">
          <el-button type="text" @click="edit(page.row.pageId)">编辑</el-button>
          <el-button type="text" @click="del(page.row.pageId)">删除</el-button>
          <el-button @click="preview(page.row.pageId)" type="text">页面预览</el-button>
          <el-button @click="postPage(page.row.pageId)" type="text">页面发布</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--翻页-->
    <el-pagination background layout="prev, pager, next" style="float:right"
                   :total="total"
                   :page-size="params.size"
                   :current-page="params.page"
                   @current-change="changePage">
    </el-pagination>
  </div>
</template>
<script>
  import * as cmsApi from '../api/cms'

  export default {
    data() {
      return {
        list: [],
        siteList: [],//站点列表
        pageTypeList: [
          {typeName: '静态', typeValue: '0'},
          {typeName: '动态', typeValue: '1'}
        ],
        total: 50,
        params: {
          page: 1,//页码
          size: 10,//每页显示个数
          siteId: '',//选中的站点ID
          pageAliase: '',//页面别名
          pageName: '',//页面名称
          pageType: ''//页面类型
        }
      }
    },
    created() {
      //取出路由中的数据参数
      this.params.page = Number.parseInt(this.$route.query.page || 1);
      this.params.siteId = this.$route.query.siteId || '';
      this.params.pageAliase = this.$route.query.pageAliase || '';
      this.query();
      this.querySite();
    },
    methods: {
      query: function () {
        cmsApi.page_list(this.params.page, this.params.size, this.params).then((res) => {
          this.list = res.queryResult.list;
          this.total = res.queryResult.total;
        })
      },
      querySite: function () {
        cmsApi.sit_list().then((res) => {
          this.siteList = res.queryResult.list;
        })
      },
      changePage: function (page) {
        this.params.page = page;
        this.query();
      },
      edit: function (id) {
        this.$router.push({
          path: '/cms/page/edit',
          query: {
            id: id,
            page: this.params.page,
            siteId: this.params.siteId,
            pageAliase: this.params.pageAliase
          }
        })
      },
      del: function (id) {
        this.$confirm('确定删除吗？', '警告', {}).then((res) => {
          cmsApi.page_delete(id).then((res) => {
            if (res.success) {
              this.$message.success("删除成功");
              this.query()
            } else {
              this.$message.error("删除失败")
            }
          })
        })
      },
      preview: function (pageId) {
        window.open("http://www.xuecheng.com/cms/preview/" + pageId)
      },
      postPage: function (pageId) {
        this.$confirm('确定发布吗？', '警告', {}).then((res) => {
          cmsApi.post_page(pageId).then((res) => {
            if (res.success) {
              this.$message.success("发布成功")
            } else {
              this.$message.error("发布失败")
            }
          })
        });

      }
    }
  }
</script>
<style>
  /*编写页面样式，不是必须*/
</style>

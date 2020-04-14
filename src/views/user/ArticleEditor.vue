<template>
  <div>

    <el-row>
      <el-input
        v-model="article.articleTitle"
        style="margin: 10px 0px;font-size: 18px;"
        placeholder="请输入标题"></el-input>
    </el-row>
    <el-row style="height: calc(100vh - 140px);">
      <mavon-editor
        v-model="article.articleContentMd"
        style="height: 100%;"
        ref=md
        @save="saveArticles"
        fontSize="16px">
        <button type="button" class="op-icon el-icon-document" :title="'博文设置'" slot="left-toolbar-after"
                @click="dialogVisible = true"></button>
      </mavon-editor>
      <el-dialog
        :visible.sync="dialogVisible"
        width="30%">

        <el-divider content-position="left">摘要</el-divider>
        <el-input
          type="textarea"
          v-model="article.articleAbstract"
          rows="6"
          maxlength="255"
          show-word-limit></el-input>
        <el-divider content-position="left">封面</el-divider>
        <div style="margin-top: 20px">
          <el-input v-model="article.articleCover" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload" style="margin-top: 5px"></img-upload>
        </div>

        <!--文章分类-->
        <el-divider content-position="left">分类</el-divider>
        <el-select v-model="value" placeholder="请选择">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>
        <!--文章标签-->
        <el-divider content-position="left">标签</el-divider>
        <el-select v-model="value" placeholder="请选择">
          <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
          </el-option>
        </el-select>

        <!--发布形式-->
        <el-divider content-position="left">发布形式</el-divider>
        <el-radio-group v-model="radio">
          <el-radio :label="3">公开</el-radio>
          <el-radio :label="6">仅粉丝可见</el-radio>
          <el-radio :label="9">私密</el-radio>
        </el-radio-group>

        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import ImgUpload from '../../components/ImgUpload'

  export default {
    name: 'Editor',
    components: {ImgUpload},
    data () {
      return {
        article: {},
        dialogVisible: false,
          options: [{
              value: '选项1',
              label: '黄金糕'
          }, {
              value: '选项2',
              label: '双皮奶'
          }, {
              value: '选项3',
              label: '蚵仔煎'
          }, {
              value: '选项4',
              label: '龙须面'
          }, {
              value: '选项5',
              label: '北京烤鸭'
          }],
          value: '',
          radio: 3
      }
    },
    mounted () {
      // if (this.$route.params.article) {
      //   this.article = this.$route.params.article
      // }
    },
    methods: {
      saveArticles (value, render) {
        // // value 是 md，render 是 html
        // this.$confirm('是否保存并发布文章?', '提示', {
        //   confirmButtonText: '确定',
        //   cancelButtonText: '取消',
        //   type: 'warning'
        // }).then(() => {
        //     this.$axios
        //       .post('/admin/content/article', {
        //         id: this.article.id,
        //         articleTitle: this.article.articleTitle,
        //         articleContentMd: value,
        //         articleContentHtml: render,
        //         articleAbstract: this.article.articleAbstract,
        //         articleCover: this.article.articleCover,
        //         articleDate: this.article.articleDate
        //       }).then(resp => {
        //       if (resp && resp.data.code === 200) {
        //         this.$message({
        //           type: 'info',
        //           message: '已保存成功'
        //         })
        //       }
        //     })
        //   }
        // ).catch(() => {
        //   this.$message({
        //     type: 'info',
        //     message: '已取消发布'
        //   })
        // })
          console.log("保存文章");

      },
      uploadImg () {
        // this.article.articleCover = this.$refs.imgUpload.url
          console.log("上传封面");
      }
    }
  }
</script>

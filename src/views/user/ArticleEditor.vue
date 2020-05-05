<template>
  <div>

    <el-row>
      <el-input
        v-model="blog.blogTitle"
        style="margin: 10px 0px;font-size: 18px;"
        placeholder="请输入标题"></el-input>
    </el-row>
    <el-row style="height: calc(100vh - 140px);">
      <mavon-editor
        v-model="blog.blogContentMd"
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
          v-model="blog.blogAbstract"
          rows="6"
          maxlength="255"
          show-word-limit></el-input>
        <el-divider content-position="left">封面</el-divider>
        <div style="margin-top: 20px">
          <el-input v-model="blog.blogCover" autocomplete="off" placeholder="图片 URL"></el-input>
          <img-upload @onUpload="uploadImg" ref="imgUpload" style="margin-top: 5px"></img-upload>
        </div>

        <!--文章分类-->
        <el-divider content-position="left">分类</el-divider>
        <el-select v-model="blog.blogKind" placeholder="请选择">
          <el-option
                  v-for="item in kinds"
                  :key="item.kindId"
                  :label="item.kindName"
                  :value="item.kindId">
          </el-option>
        </el-select>
        <!--文章标签-->
        <el-divider content-position="left">标签</el-divider>
        <el-select v-model="blog.blogTag" placeholder="请选择">
          <el-option
                  v-for="item in tags"
                  :key="item.tagId"
                  :label="item.tagName"
                  :value="item.tagId">
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
        blog: {},
        dialogVisible: false,
          kinds: [],
          tags:[],
          value: '',
          radio: 3
      }
    },
    mounted () {
      // if (this.$route.params.article) {
      //   this.article = this.$route.params.article
      // }
        if(this.$route.params.blog!=null){
            this.blog=this.$route.params.blog;
        }


        this.loadTags();
        this.loadKind();
    },
    methods: {
      saveArticles (value, render) {
          let _this = this;
          let uid = this.$store.state.uid;
        // value 是 md，render 是 html
        this.$confirm('是否保存并发布文章?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

            if(this.blog.blogId==null){
                this.$axios
                    .post('/blog/add', {
                        blogAuthor: uid,
                        blogTitle: _this.blog.blogTitle,
                        blogContentMd: value,
                        blogContentHtml: render,
                        blogReleaseType: _this.radio,
                        blogKind: _this.blog.blogKind,
                        blogTag: _this.blog.blogTag,
                        blogAbstract: _this.blog.blogAbstract,
                        blogCover: _this.blog.blogCover,

                    }).then(resp => {
                    if (resp && resp.data.code === 200) {
                        _this.$message({
                            type: 'info',
                            message: '已保存成功'
                        })
                        this.$router.push('/')
                    }
                })
            }else{
                this.$axios
                    .post('/blog/update', {
                        blogId:_this.blog.blogId,
                        blogAuthor: uid,
                        blogTitle: _this.blog.blogTitle,
                        blogContentMd: value,
                        blogContentHtml: render,
                        blogReleaseType: _this.radio,
                        blogKind: _this.blog.blogKind,
                        blogTag: _this.blog.blogTag,
                        blogAbstract: _this.blog.blogAbstract,
                        blogCover: _this.blog.blogCover,

                    }).then(resp => {
                    if (resp && resp.data.code === 200) {
                        this.$message({
                            type: 'info',
                            message: '修改成功'
                        })
                        this.$router.push('/')
                    }
                })
            }


          }
        ).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消发布'
          })
        })
          console.log("保存文章");

      },
      uploadImg () {
          this.blog.blogCover = this.$refs.imgUpload.url
          console.log(this.$refs.imgUpload.url);
      },
      loadKind(){
          let _this = this;
          this.$axios.get('/kind/list').then(resp => {
              if (resp && resp.data.code === 200) {
                  // _this.books = resp.data.result
                  _this.kinds = resp.data.result;
              }
          })
      },
      loadTags()
      {
          let _this = this;
          let uid = this.$store.state.uid;
          this.$axios.get('/tag/list?id='+uid+'&pageSize=50&pageNum=1').then(resp => {
              if (resp && resp.data.code === 200) {
                  // _this.books = resp.data.result
                  _this.tags=resp.data.result.list;
              }
          })
      },
    }
  }
</script>

<template>
    <div class="articles-area">
        <el-card style="text-align: left;width: 990px;margin: 35px auto 0 auto">
            <div>
                <!--文章标题-->
                <div style="text-align: center">
                    <span style="font-size: 20px"><strong><h2>{{blog.blogTitle}}</h2></strong></span>
                </div>
                <!--作者-->
                <div style="text-align: center">
                    <h4>作者：<router-link :to="{path:'showuser',query:{userId: blog.blogAuthor}}">{{author.userNickname}}</router-link></h4>
                </div>
                <el-divider content-position="left">
                    <span>
                        阅读数：{{views}}
                    </span>
                    <span style="margin-left: 40px">
                        最后更新于{{blog.blogUpdatetime}}
                    </span>
                </el-divider>
                <!--博文内容-->
                <div class="markdown-body">
                    <div v-html="blog.blogContentHtml"></div>
                </div>
                <!--点赞功能-->
                <div>
                    <el-button v-if="!isLike" class="like" @click="toLike">
                        <i   class="iconfont">&#xe618;</i>

                        点赞
                    </el-button>
                    <el-button v-if="isLike" class="like" @click="toLike">

                        <i  class="iconfont">&#xe62d;</i>
                        取消点赞
                    </el-button>
                    <!--<span >-->
                        <!--<i  v-if="!isLike" class="iconfont">&#xe618;</i>-->
                        <!--<i  v-if="isLike" class="iconfont">&#xe62d;</i>-->
                        <!--点赞-->
                    <!--</span>-->
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "ShowArticle",
        data(){
            return{
                blog:{
                },
                isLike:false,
                views:-1,
                author:''
            }
        },
        mounted(){
            this.blog.blogId=this.$route.query.blogId;
            this.getBlog(this.blog.blogId);
            this.getViews(this.blog.blogId);
            this.checkLike();
        },
        methods:{
            toLike(){
                let blogId=this.blog.blogId;
                let uid = this.$store.state.uid;
                let _this=this;
                this.$axios.get('/like/change?blogId='+blogId+"&userId="+uid).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.isLike=!_this.isLike;
                    }else{
                        _this.$message("操作失败");
                    }
                    console.log(resp);
                })

            },
            getBlog(id)
            {
                let _this =this
                this.$axios.get('/blog/get/'+id).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.blog=resp.data.result;

                        this.$axios.get('/user/get/'+_this.blog.blogAuthor).then(resp => {
                            if (resp && resp.data.code === 200) {
                                // _this.books = resp.data.result
                                _this.author=resp.data.result;


                            }
                        })
                    }
                })
            },

            getViews(id){
                let _this =this
                this.$axios.get('/view/get/'+id).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.views=resp.data.result;

                    }
                })
            },

            checkLike(){
                let blogId=this.blog.blogId;
                let uid = this.$store.state.uid;
                let _this=this;
                this.$axios.get('/like/check?blogId='+blogId+"&userId="+uid).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.isLike=true;
                    }else{
                        _this.isLike=false;
                    }
                })

            }
        }
    }
</script>

<style scoped>
    @import "../assets/css/markdown.css";
    .like{
        font-size: 20px;
        background: gainsboro;
        box-shadow: 0 2px 2px 0;
    }

</style>
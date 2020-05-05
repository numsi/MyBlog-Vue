<template>
    <div style="margin-top: 40px">
        <div class="articles-area">
            <el-card style="text-align: left">
                <div v-for="blog in blogs" :key="blog.blogId">
                    <div style="float:left;width:85%;height: 150px;">
                        <router-link @click.native="viewAdd(blog.blogId)" class="article-link" :to="{path:'detail',query:{blogId: blog.blogId}}"><span style="font-size: 20px"><strong>{{blog.blogTitle}}</strong></span></router-link>
                        <el-divider content-position="left">{{blog.blogCreattime}}</el-divider>
                        <router-link @click.native="viewAdd(blog.blogId)" class="article-link" :to="{path:'detail',query:{blogId: blog.blogId}}"><p>{{blog.blogAbstract}}</p></router-link>

                    </div>
                    <el-image
                            style="margin:18px 0 0 30px;width:100px;height: 100px"
                            :src="blog.blogCover"
                            fit="cover"></el-image>
                    <el-divider></el-divider>
                    <span>
                    <router-link :to="{path:'showuser',query:{userId: blog.blogAuthor}}">{{blog.userNickname}}</router-link>
                        <!--阅读数-->
                    <i class="iconfont" style="margin-left: 10px">&#xe6a0;
                      <span style="font-size:12px;margin-left:1px;">{{blog.viewNum}}</span>
                    </i>
                        <!--回复数-->
                        <i class="iconfont" style="margin-left: 10px">&#xe6df;
                      <span style="font-size:12px;margin-left:3px;">{{blog.commentNum}}</span>
                    </i>
                        <!--点赞数-->
                        <i class="iconfont" style="margin-left: 10px">&#xe8ad;
                      <span style="font-size:12px;margin-left:3px;">{{blog.likeNum}}</span>
                    </i>
                    </span>
                    <el-divider></el-divider>
                </div>
            </el-card>
            <div style="margin: 20px 0 50px 0">
                <el-pagination
                        background
                        style="float:right;"
                        layout="total, prev, pager, next, jumper"
                        @current-change="handleCurrentChange"
                        :page-size="pageSize"
                        :total="total">
                </el-pagination>
            </div>
        </div>

    </div>
</template>
    


<script>
    export default {
        name: "ShowAllByTag",
        props:{
            tag:'',
        },
        data(){
            return {
                blogs:[],
                uid:'',
                pageSize: 10,
                total: 0,
                pageNum:1
            }
        },
        methods:{
            loadByTag(id){
                let _this =this;
                let uid = this.$store.state.uid;
                if(id==-1){
                    this.$axios.get('/blog/listByUser?id='+uid+'&pageSize='+_this.pageSize+'&pageNum='+_this.pageNum).then(resp => {
                        if (resp && resp.data.code === 200) {
                            // _this.books = resp.data.result
                            console.log(resp.data.result);
                            _this.total=resp.data.result.total;
                            _this.blogs=resp.data.result.list;
                            _this.blogs.forEach((item,i) => {
                                this.$axios.get('/user/get/' + item.blogAuthor).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        // _this.books = resp.data.result
                                        _this.$set(item, 'userNickname', resp.data.result.userNickname);
                                        // item.userNickname=resp.data.result.userNickname;
                                        // console.log(resp.data.result.userNickname);
                                        // _this.follows.userNickName = resp.data.result.userNickname;
                                        // return row.followFollowerid=resp.data.result.userNickname;

                                    }
                                })

                                this.$axios.get('/view/get/' + item.blogId).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        _this.$set(item, 'viewNum', resp.data.result);
                                    }
                                })

                                this.$axios.get('/like/getBlog/' + item.blogId).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        _this.$set(item, 'likeNum', resp.data.result);
                                    }
                                })

                                this.$axios.get('/comment/getBlog/' + item.blogId).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        _this.$set(item, 'commentNum', resp.data.result);
                                    }
                                })

                            })
                            console.log(resp.data.result.list);
                        }
                    })
                }else{
                    this.$axios.get('/blog/listByTag?id='+id+'&pageSize='+_this.pageSize+'&pageNum='+_this.pageNum).then(resp => {
                        if (resp && resp.data.code === 200) {
                            // _this.books = resp.data.result
                            // console.log(resp.data.result);
                            // console.log(resp);
                            _this.total=resp.data.result.total;
                            _this.blogs=resp.data.result.list;
                            _this.blogs.forEach((item,i) => {
                                this.$axios.get('/user/get/'+item.blogAuthor).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        // _this.books = resp.data.result
                                        _this.$set(item,'userNickname',resp.data.result.userNickname);
                                        // item.userNickname=resp.data.result.userNickname;
                                        // console.log(resp.data.result.userNickname);
                                        // _this.follows.userNickName = resp.data.result.userNickname;
                                        // return row.followFollowerid=resp.data.result.userNickname;

                                    }
                                })

                                this.$axios.get('/view/get/' + item.blogId).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        _this.$set(item, 'viewNum', resp.data.result);
                                    }
                                })

                                this.$axios.get('/like/getBlog/' + item.blogId).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        _this.$set(item, 'likeNum', resp.data.result);
                                    }
                                })

                                this.$axios.get('/comment/getBlog/' + item.blogId).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        _this.$set(item, 'commentNum', resp.data.result);
                                    }
                                })
                            })
                            // console.log(resp.data.result.list);
                        }
                    })
                }



            },
            handleCurrentChange(page) {
                this.pageNum=page;
                let _this = this;
                if(this.tag==-1){
                    this.$axios.get('/blog/listByUser?id='+_this.$store.state.uid+'&pageSize='+_this.pageSize+'&pageNum='+_this.pageNum).then(resp => {
                        if (resp && resp.data.code === 200) {
                            // _this.books = resp.data.result
                            console.log(resp.data.result);
                            _this.total=resp.data.result.total;
                            _this.blogs=resp.data.result.list;
                            _this.blogs.forEach((item,i) => {
                                this.$axios.get('/user/get/' + item.blogAuthor).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        // _this.books = resp.data.result
                                        _this.$set(item, 'userNickname', resp.data.result.userNickname);
                                        // item.userNickname=resp.data.result.userNickname;
                                        // console.log(resp.data.result.userNickname);
                                        // _this.follows.userNickName = resp.data.result.userNickname;
                                        // return row.followFollowerid=resp.data.result.userNickname;

                                    }
                                })

                                this.$axios.get('/view/get/' + item.blogId).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        _this.$set(item, 'viewNum', resp.data.result);
                                    }
                                })

                                this.$axios.get('/like/getBlog/' + item.blogId).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        _this.$set(item, 'likeNum', resp.data.result);
                                    }
                                })

                                this.$axios.get('/comment/getBlog/' + item.blogId).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        _this.$set(item, 'commentNum', resp.data.result);
                                    }
                                })
                            })
                            console.log(resp.data.result.list);
                        }
                    })
                }else{
                    this.$axios.get('/blog/listByTag?id='+_this.tag+'&pageSize='+_this.pageSize+'&pageNum='+_this.pageNum).then(resp => {
                        if (resp && resp.data.code === 200) {
                            // _this.books = resp.data.result
                            // console.log(resp.data.result);
                            // console.log(resp);
                            _this.total=resp.data.result.total;
                            _this.blogs=resp.data.result.list;
                            _this.blogs.forEach((item,i) => {
                                this.$axios.get('/user/get/'+item.blogAuthor).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        // _this.books = resp.data.result
                                        _this.$set(item,'userNickname',resp.data.result.userNickname);
                                        // item.userNickname=resp.data.result.userNickname;
                                        // console.log(resp.data.result.userNickname);
                                        // _this.follows.userNickName = resp.data.result.userNickname;
                                        // return row.followFollowerid=resp.data.result.userNickname;

                                    }
                                })

                                this.$axios.get('/view/get/' + item.blogId).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        _this.$set(item, 'viewNum', resp.data.result);
                                    }
                                })

                                this.$axios.get('/like/getBlog/' + item.blogId).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        _this.$set(item, 'likeNum', resp.data.result);
                                    }
                                })

                                this.$axios.get('/comment/getBlog/' + item.blogId).then(resp => {
                                    if (resp && resp.data.code === 200) {
                                        _this.$set(item, 'commentNum', resp.data.result);
                                    }
                                })
                            })
                            // console.log(resp.data.result.list);
                        }
                    })
                }

            },
            viewAdd(id)
            {
                let _this = this;
                let uid = this.$store.state.uid;
                _this.$axios.post('/view/add',{
                    viewBlog:id,
                    viewUser:uid,

                }).then(resp => {
                    if (resp && resp.data.code === 200) {
                        let data = resp.data.result
                        // _this.$store.commit('login', data)
                        // console.log(data);
                        // this.$router.go(0);
                    }
                })
            }
        },
        mounted(){
            this.loadByTag(this.tag);
            // let self = this;
            // this.bus.$on("blog_kind", function(item) { self.blog_kind = item; })
            // console.log(this.kind);

        },
        created(){
            // this.$set(this.blog_kind,1,this.kind);
            // console.log(this.blog_kind);
        },
        watch:{
            tag(newVal,oldVal){
                console.log(newVal);
                this.loadByTag(newVal)
            }
        }

    }
</script>

<style scoped>
    .articles-area {
        width: 990px;
        height: 750px;
        margin-left:0px;
        margin-right: auto;
    }

    .article-link {
        text-decoration: none;
        color: #606266;
    }

    .article-link:hover {
        color: #409EFF;
    }
</style>
<template>
    <div>


        <span style="font-size: 40px"><strong>评论管理</strong></span>
        <el-divider content-position="left"></el-divider>
        <el-card style="margin: 18px 2%;width: 95%">
            <el-table
                    :data="comments"
                    stripe
                    style="width: 100%"
                    :max-height="tableHeight">
                <el-table-column

                        label="文章名"
                        fit>
                    <template slot-scope="scope">
                        <a :href="scope.row.blogUrl" target="_blank" class="buttonText">{{scope.row.blogName}}</a>
                    </template>

                </el-table-column>
                <el-table-column
                        prop="commentCreattime"
                        label="评论日期"
                        width="200">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="180">
                    <template slot-scope="scope">

                        <el-popover
                                placement="bottom"
                                title="评论内容"
                                width="200"
                                trigger="click"
                                :content="scope.row.commentContent">
                            <el-button
                                    slot="reference"
                                    type="text"
                                    size="small">
                                查看
                            </el-button>
                        </el-popover>

                        <el-button
                                @click.native.prevent="editArticle(scope.row.commentId)"
                                type="text"
                                size="small">
                            编辑
                        </el-button>
                        <el-button
                                @click.native.prevent="deleteArticle(scope.row.commentId)"
                                type="text"
                                size="small">
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
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
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "CommentManagement",
        data () {
            return {
                comments: [

                ],
                dialogFormVisible: false,
                pageSize: 10,
                pageNum:1,
                total: 0,
                form: {
                    name: '',
                },
            }
        },
        mounted () {
            // this.loadArticles()
            this.loadComments();
        },
        computed: {
            tableHeight () {
                return window.innerHeight - 320
            }
        },
        methods: {
            loadComments() {
                let _this = this;
                let uid = this.$store.state.uid;
                this.$axios.get('/comment/listByUser?id='+uid+'&pageSize='+_this.pageSize+'&pageNum='+_this.pageNum).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.comments=resp.data.result.list;

                        _this.comments.forEach((item,i) => {
                            this.$axios.get('/blog/get/' + item.commentBlog).then(resp => {
                                if (resp && resp.data.code === 200) {
                                    // _this.books = resp.data.result
                                    _this.$set(item, 'blogName', resp.data.result.blogTitle);
                                    // item.userNickname=resp.data.result.userNickname;
                                    // console.log(resp.data.result.userNickname);
                                    // _this.follows.userNickName = resp.data.result.userNickname;
                                    // return row.followFollowerid=resp.data.result.userNickname;

                                }
                            })

                            _this.$set(item, 'blogUrl', "http://localhost:9000/detail?blogId="+item.commentBlog);


                        })

                        _this.total=resp.data.result.total;
                        console.log(resp.data.result.list);
                    }
                })
            },
            handleCurrentChange(page) {

                let _this = this;
                let uid = this.$store.state.uid;
                _this.pageNum=page;
                this.$axios.get('/comment/listByUser?id='+uid+'&pageSize='+_this.pageSize+'&pageNum='+_this.pageNum).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.comments=resp.data.result.list;

                        _this.comments.forEach((item,i) => {
                            this.$axios.get('/blog/get/' + item.commentBlog).then(resp => {
                                if (resp && resp.data.code === 200) {
                                    // _this.books = resp.data.result
                                    _this.$set(item, 'blogName', resp.data.result.blogTitle);
                                    // item.userNickname=resp.data.result.userNickname;
                                    // console.log(resp.data.result.userNickname);
                                    // _this.follows.userNickName = resp.data.result.userNickname;
                                    // return row.followFollowerid=resp.data.result.userNickname;

                                }
                            })

                            _this.$set(item, 'blogUrl', "http://localhost:9000/detail?blogId="+item.commentBlog);


                        })

                        _this.total=resp.data.result.total;
                        console.log(resp.data.result.list);
                    }
                })
            },

            editArticle(commentId) {
                // this.$router.push(
                //     {
                //         name: 'Editor',
                //         params: {
                //             article: article
                //         }
                //     }
                // )
                this.$prompt('请输入评论', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    // inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {

                    let newComment = value;

                    let _this = this;
                    let uid = this.$store.state.uid;
                    _this.$axios.post('/comment/update',{
                        commentContent:newComment,
                        commentId:commentId

                    }).then(resp => {
                        if (resp && resp.data.code === 200) {
                            let data = resp.data.result
                            // _this.$store.commit('login', data)
                            console.log(data);
                            this.$router.go(0);
                        }else {
                            console.log(resp.data.message);
                            _this.$message(resp.data.message)
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            },
            deleteArticle(id) {
                // console.log("测试啊啊啊");
                let _this = this;
                this.$axios.get('/comment/delete/' + id).then(resp => {
                    if (resp && resp.data.code === 200) {
                        this.$router.go(0);
                        // _this.books = resp.data.result
                        // item.userNickname=resp.data.result.userNickname;
                        // console.log(resp.data.result.userNickname);
                        // _this.follows.userNickName = resp.data.result.userNickname;
                        // return row.followFollowerid=resp.data.result.userNickname;

                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
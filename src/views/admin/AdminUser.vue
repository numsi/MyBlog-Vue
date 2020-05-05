<template>
    <div>


        <span style="font-size: 40px"><strong>用户管理</strong></span>
        <el-divider content-position="left"></el-divider>

        <el-button type="success" @click="dialogFormVisible = true">新增用户</el-button>

        <!-- Form -->
        <!--<el-button type="text" @click="dialogFormVisible = true">打开嵌套表单的 Dialog</el-button>-->

        <el-dialog title="新增用户" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="账号" prop="user_name">
                    <el-input type="text" v-model="form.userUsername"
                              auto-complete="off" placeholder="账号">
                    </el-input>
                </el-form-item>
                <el-form-item label="用户昵称" prop="user_nickname">
                    <el-input type="text" v-model="form.userNickname"
                              auto-complete="off" placeholder="昵称">
                    </el-input>
                </el-form-item>
                <el-form-item label="密码" prop="user_password">
                    <el-input type="password" v-model="form.userPassword"
                              auto-complete="off" placeholder="密码"
                    >
                    </el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addTag()">确 定</el-button>
            </div>
        </el-dialog>


        <el-card style="margin: 18px 2%;width: 95%">
            <el-table
                    :data="users"
                    stripe
                    style="width: 100%"
                    :max-height="tableHeight">

                <el-table-column
                        prop="userNickname"
                        label="用户昵称"
                        fit>
                </el-table-column>

                <el-table-column
                        prop="userCreattime"
                        label="创建日期"
                        fit>
                </el-table-column>

                <el-table-column
                        fixed="right"
                        label="操作"
                        width="180">
                    <template slot-scope="scope">
                        <el-button
                                @click.native.prevent="editArticle(scope.row.userId)"
                                type="text"
                                size="small">
                            重设密码
                        </el-button>
                        <el-button
                                @click.native.prevent="deleteTag(scope.row.userId)"
                                type="text"
                                size="small">
                            移除
                        </el-button>
                        <el-button
                                @click.native.prevent="banUser(scope.row.userId)"
                                type="text"
                                size="small">
                            <div v-if="scope.row.uerAbled==0">禁用</div>
                            <div v-if="scope.row.uerAbled==1">解封</div>

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
        name: "AdminUser",
        data () {
            return {
                users: [

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
        },
        computed: {
            tableHeight () {
                return window.innerHeight - 320
            }
        },
        methods: {
            handleCurrentChange(page) {
                // var _this = this
                // this.$axios.get('/article/' + this.pageSize + '/' + page).then(resp => {
                //     if (resp && resp.data.code === 200) {
                //         _this.articles = resp.data.result.content
                //         _this.total = resp.data.result.totalElements
                //     }
                // })
                this.pageNum=page;
                let _this = this;

                this.$axios.get('/user/list?pageSize='+_this.pageSize+'&pageNum='+_this.pageNum).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.users=resp.data.result.list;
                        _this.total=resp.data.result.total;
                        console.log(resp.data.result.list);
                    }
                })

            },
            editArticle(tagId) {
                // this.$router.push(
                //     {
                //         name: 'Editor',
                //         params: {
                //             article: article
                //         }
                //     }
                // )
                this.$prompt('请输入新的密码', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    // inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
                    // inputErrorMessage: '邮箱格式不正确'
                }).then(({ value }) => {
                    let newPassword = value;

                    let _this = this;
                    _this.$axios.post('/user/update',{
                        userId:tagId,
                        userPassword:newPassword

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
            deleteTag(id) {
                let _this =this;
                this.$axios.get('/user/delete/'+id).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        this.$router.go(0);
                    }
                })
            },
            loadUsers()
            {
                let _this =this
                this.$axios.get('/user/list?pageSize='+_this.pageSize+'&pageNum=1').then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        _this.users=resp.data.result.list;
                        _this.total=resp.data.result.total;
                        console.log(resp.data.result.list);
                    }
                })
            },
            addTag()
            {
                this.dialogFormVisible=false;
                let _this = this;
                let uid = this.$store.state.uid;
                _this.$axios.post('/user/add',{
                    userUsername:_this.form.userUsername,
                    userPassword:_this.form.userPassword,
                    userNickname:_this.form.userNickname,
                }).then(resp => {
                    if (resp && resp.data.code === 200) {
                        let data = resp.data.result
                        // _this.$store.commit('login', data)
                        console.log(data);
                        this.$router.go(0);
                    }else {
                        console.log(resp);
                    }
                })
            },
            banUser(id){
                this.$axios.get('/user/change/'+id).then(resp => {
                    if (resp && resp.data.code === 200) {
                        // _this.books = resp.data.result
                        this.$router.go(0);
                    }
                })

            }
        },
        mounted(){
            this.loadUsers()
        }
    }
</script>

<style scoped>

</style>
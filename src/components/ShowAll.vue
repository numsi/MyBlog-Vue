<template>

    <!--<div class="brotherOne">-->
        <!--<h5>我是接收方组件，下面是接收到的信息</h5>-->
        <!--<h5>{{name}}</h5>-->
        <!--<h5>blog_kind:{{blog_kind}}</h5>-->
        <!--<h5>blog_tag:{{blog_tag}}</h5>-->
        <!--<h5>user_name:{{user_name}}</h5>-->
    <!--</div>-->
    <div style="margin-top: 40px">
        <!--<el-button @click="addArticle()">添加文章</el-button>-->
        <div class="articles-area">
            <el-card style="text-align: left">
                <div v-for="blog in blogs" :key="blog.blog_id">
                    <div style="float:left;width:85%;height: 150px;">
                        <router-link class="article-link" :to="{path:'jotter/article',query:{id: blog.blog_id}}"><span style="font-size: 20px"><strong>{{blog.blog_title}}</strong></span></router-link>
                        <el-divider content-position="left">{{blog.blog_creattime}}</el-divider>
                        <router-link class="article-link" :to="{path:'jotter/article',query:{id: blog.id}}"><p>{{blog.blog_abstract}}</p></router-link>

                    </div>
                    <el-image
                            style="margin:18px 0 0 30px;width:100px;height: 100px"
                            :src="blog.blog_cover"
                            fit="cover"></el-image>
                    <el-divider></el-divider>
                    <span>
                    <router-link to="">{{blog.blog_author}}</router-link>
                        <!--阅读数-->
                    <i class="iconfont" style="margin-left: 10px">&#xe6a0;
                      <span style="font-size:12px;margin-left:1px;">{{blog.blog_views}}</span>
                    </i>
                        <!--回复数-->
                        <i class="iconfont" style="margin-left: 10px">&#xe6df;
                      <span style="font-size:12px;margin-left:3px;">{{blog.blog_views}}</span>
                    </i>
                        <!--点赞数-->
                        <i class="iconfont" style="margin-left: 10px">&#xe8ad;
                      <span style="font-size:12px;margin-left:3px;">{{blog.blog_views}}</span>
                    </i>
                    </span>
                    <el-divider></el-divider>
                </div>
            </el-card>
        </div>
        <!--<el-pagination-->
                <!--background-->
                <!--layout="total, prev, pager, next, jumper"-->
                <!--@current-change="handleCurrentChange"-->
                <!--:page-size="pageSize"-->
                <!--:total="total">-->
        <!--</el-pagination>-->
        <!--<el-pagination background-->
                       <!--@size-change="handleSizeChange"-->
                       <!--@current-change="handleCurrentChange"-->
                       <!--:current-page="1"-->
                       <!--:page-sizes="[5, 10]"-->
                       <!--:page-size="10"-->
                       <!--layout="total, sizes, prev, pager, next, jumper"-->
                       <!--:total="blogs.length">-->
        <!--</el-pagination>-->
    </div>

</template>

<script>
    export default {
        name: "ShowAll",
        props:{
            user_name:''
        },
        data() {
            return {
                name: "1111",
                blog_kind:'',
                blog_tag:'',
                blogs: [
                    {
                        blog_id:'1',
                        blog_title:'凉风有兴1',
                        blog_creattime:'2020-01-13 21:14:27',
                        blog_updatetime:'2020-01-13 21:14:27',
                        blog_author:'test',
                        blog_content_html:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。虽然我风流倜傥玉树临风，但我还是有聪明的头脑和强健的臂腕。',
                        blog_content_md:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。虽然我风流倜傥玉树临风，但我还是有聪明的头脑和强健的臂腕。',
                        blog_views:'0',
                        blog_abstract:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。',
                        blog_cover:'https://i.loli.net/2020/01/16/d2ZlKI1WRE4p7XB.png',

                    },
                    {
                        blog_id:'2',
                        blog_title:'凉风有兴2',
                        blog_creattime:'2020-01-13 21:14:27',
                        blog_updatetime:'2020-01-13 21:14:27',
                        blog_author:'test',
                        blog_content_html:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。虽然我风流倜傥玉树临风，但我还是有聪明的头脑和强健的臂腕。',
                        blog_content_md:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。虽然我风流倜傥玉树临风，但我还是有聪明的头脑和强健的臂腕。',
                        blog_views:'0',
                        blog_abstract:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。',
                        blog_cover:'https://i.loli.net/2020/01/16/d2ZlKI1WRE4p7XB.png',

                    },
                    {
                        blog_id:'3',
                        blog_title:'凉风有兴3',
                        blog_creattime:'2020-01-13 21:14:27',
                        blog_updatetime:'2020-01-13 21:14:27',
                        blog_author:'test',
                        blog_content_html:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。虽然我风流倜傥玉树临风，但我还是有聪明的头脑和强健的臂腕。',
                        blog_content_md:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。虽然我风流倜傥玉树临风，但我还是有聪明的头脑和强健的臂腕。',
                        blog_views:'0',
                        blog_abstract:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。',
                        blog_cover:'https://i.loli.net/2020/01/16/d2ZlKI1WRE4p7XB.png',

                    },
                    {
                        blog_id:'4',
                        blog_title:'凉风有兴4',
                        blog_creattime:'2020-01-13 21:14:27',
                        blog_updatetime:'2020-01-13 21:14:27',
                        blog_author:'test',
                        blog_content_html:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。虽然我风流倜傥玉树临风，但我还是有聪明的头脑和强健的臂腕。',
                        blog_content_md:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。虽然我风流倜傥玉树临风，但我还是有聪明的头脑和强健的臂腕。',
                        blog_views:'0',
                        blog_abstract:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。',
                        blog_cover:'https://i.loli.net/2020/01/16/d2ZlKI1WRE4p7XB.png',

                    },
                    {
                        blog_id:'5',
                        blog_title:'凉风有兴5',
                        blog_creattime:'2020-01-13 21:14:27',
                        blog_updatetime:'2020-01-13 21:14:27',
                        blog_author:'test',
                        blog_content_html:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。虽然我风流倜傥玉树临风，但我还是有聪明的头脑和强健的臂腕。',
                        blog_content_md:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。虽然我风流倜傥玉树临风，但我还是有聪明的头脑和强健的臂腕。',
                        blog_views:'0',
                        blog_abstract:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。',
                        blog_cover:'https://i.loli.net/2020/01/16/d2ZlKI1WRE4p7XB.png',

                    },
                    {
                        blog_id:'6',
                        blog_title:'凉风有兴6',
                        blog_creattime:'2020-01-13 21:14:27',
                        blog_updatetime:'2020-01-13 21:14:27',
                        blog_author:'test',
                        blog_content_html:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。虽然我风流倜傥玉树临风，但我还是有聪明的头脑和强健的臂腕。',
                        blog_content_md:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。虽然我风流倜傥玉树临风，但我还是有聪明的头脑和强健的臂腕。',
                        blog_views:'0',
                        blog_abstract:'凉风有兴，秋月无边，而我思乡的情绪好比度日如年。',
                        blog_cover:'https://i.loli.net/2020/01/16/d2ZlKI1WRE4p7XB.png',

                    }
                ],
                // pageTotal: 0,
                // currentPage:1, //默认第一页
                // pagesize: 10  //当前显示页数

            }
        },
        mounted() {
            let self = this;
            this.bus.$on("blog_kind", function(item) { self.blog_kind = item; })
            this.bus.$on("blog_tag", function(item) { self.blog_tag = item; })
            this.bus.$on("user_name", function(item) { self.user_name = item; })
        },
        created(){
            this.name="222"
        },
        methods: {
            // handleSizeChange(val) {
            //     console.log(`每页 ${val} 条`);
            //     this.pagesize = val;
            // },
            // handleCurrentChange(val) {
            //     console.log(`当前页: ${val}`);
            //     this.currentPage = val;
            // }
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
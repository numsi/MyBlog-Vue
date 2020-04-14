<template>
    <div>
        <show-article>
        </show-article>
        <comment></comment>
        <to-top></to-top>

    </div>
</template>

<script>
    import ShowArticle from '../../components/ShowArticle'   //显示文章组件
    import Comment from '../../components/Comment'   //评论组件
    import ToTop from '../../components/ToTop' //回到顶端
    export default {
        name: "ArticleDetails",
        components:{
            ShowArticle,
            Comment,
            ToTop
        },


    }
</script>

<style scoped>

</style>
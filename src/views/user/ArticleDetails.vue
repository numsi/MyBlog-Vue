<template>
    <div>
        <show-article>
        </show-article>
        <comment></comment>
    </div>
</template>

<script>
    import ShowArticle from '../../components/ShowArticle'   //显示文章组件
    import Comment from '../../components/Comment'   //评论组件
    export default {
        name: "ArticleDetails",
        components:{
            ShowArticle,
            Comment
        }

    }
</script>

<style scoped>

</style>
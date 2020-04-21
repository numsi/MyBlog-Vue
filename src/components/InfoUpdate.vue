<template>

    <el-form ref="form" :model="form" label-width="80px" style="">
        <el-form-item label="用户昵称">
            <el-input v-model="form.name" style="width:200px;"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱">

            <el-input v-model="form.name" style="width:200px;">></el-input>

        </el-form-item>
        <el-form-item label="用户生日">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="用户生日" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
        </el-form-item>

        <el-form-item label="用户性别">
            <el-radio-group v-model="form.resource">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="个人简介">
            <el-input type="textarea" v-model="form.desc" style="width:250px;">></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">立即修改</el-button>
            <el-button>取消</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "InfoUpdate",
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>

</style>
<!-- 测试postcss-aspect-ratio-mini处理容器宽高比页面 -->
<template>
    <div class="container">
        <h1 style="text-align:center">图片固定宽高比</h1>
        <div class="container-1">
            <div class="aspectratio w-16-9">
                <img :src="imgSrc" alt="" class="aspectratio-content">
            </div>
        </div>
    </div>
    
    
</template>

<script>
export default {
    data(){
        return{
            imgSrc:"https://headpictu.oss-cn-shanghai.aliyuncs.com/headpic/c.png"
        }
    }
}
</script>

<style>
.container-1{
    display: flex;
    justify-content: space-around;
    margin:10px auto;
}
.aspectratio { 
    position: relative; 
}
.aspectratio::before {
     content: ''; 
     display: block; 
     width: 1px; 
     margin-left: -1px; 
     height: 0; 
} 
.aspectratio-content{ 
    position: absolute; 
    top: 0; left: 0; right: 0; bottom: 0;
    width: 100%; height: 100%; 
}
.w-16-9{
    aspect-ratio: '16:9';
}
.w-16-9{
    width: 300px;
}


</style>

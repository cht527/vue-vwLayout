<template>
    <div class="modal-layer" v-if="visible" >
        <div :class="['modal-container',position=='footer'?'modal-set-footer':'']">
            <slot name="title"></slot>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name:"Modal",
    data(){
        return{

        }
    },
    props:{
        position:{
            type:String,
            default:'middle'
        },
        visible:{
            type:Boolean
        }
    },

}
</script>

<style scoped>
.modal-layer{
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background:rgba(0, 0, 0, 0.6);
    z-index: 9;
}
.modal-container{
    position: absolute;
    top: 40%;
    left: 50%;
    width: 90%;
    transform: translate(-50%,-50%);
    background-color: #fff;
    z-index: 99;

}
.modal-set-footer{
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    transform: none;
    background-color: #fff;
    overflow: scroll !important;
}
</style>

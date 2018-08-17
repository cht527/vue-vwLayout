<template>
    <div :class="typeBoxClass">
        <span :class="typeIconClass">{{iconText}}</span>
        <slot></slot>
    </div>
</template>

<script>
 const typeMap = {
    success: 'success',
    info: 'info',
    warning: 'warning',
    error: 'error'
};
export default {
    name:'remindMessage',
    props:{
        type:String
    },
    computed: {
      typeBoxClass(){
        return this.type?`message-box-${ typeMap[this.type] } box`: 'message-box-info box';
      },
      typeIconClass() {
        return this.type?`message-icon-${ typeMap[this.type] } icon`: 'message-icon-info icon';
      },
      iconText(){
          switch(this.type){
              case 'success':
                return '√';
                break;
              case 'warning':
                return '!';
                break;
              case 'error':
                return '×';
                break;
              default:
                return 'i'
          }
      }
    },
}
</script>

<style scoped>
.box{
    width: 690px;
    height: 100px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    border-radius: 4px;
    font-size: 26px;
    margin: 10px auto;
}
.icon{
    display: inline-block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    color:#fff;

}
.message-box-info{
    border:1px solid #909399;
    background-color: #EDF2FC;
    color: #909399;
}
.message-box-error{
    border:1px solid #F78B8B;
    background-color: #FEF0F0;
    color: #F78B8B;
}
.message-box-warning{
    border:1px solid #FE8700;
    background-color: #FFFAF5;
    color: #aaa;
}
.message-box-success{
    border:1px solid #67C23A;
    background-color: #F0F9EB;
    color: #67C23A;
}
.message-icon-warning{
    background-color: #FE8700;
}
.message-icon-success{
    background-color: #67C23A
}
.message-icon-info{
    background-color: #909399
}
.message-icon-error{
    background-color: #F78B8B;
}
</style>

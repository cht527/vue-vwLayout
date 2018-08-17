<template>
    <div 
      @click="handleClick" 
      :class="[
      buttonSize ? 'sticky-footer-btn-' + buttonSize : 'sticky-footer-btn',
      {
        'is-disabled': buttonDisabled,
        'is-loading': loading,
      }
    ]"
     >
     <i class="icon-jiazaizhong loading-btn" v-if="loading"></i>
     <slot></slot>
    </div>
</template>

<script>
export default {
  name:'stickyBtn',
  props:{
    size: String,
    loading: Boolean,
    disabled: Boolean,
  },
  computed: {
    buttonSize() {
      return this.size ;
    },
    buttonDisabled() {
      return this.disabled;
    }
  },
  methods:{
    handleClick(){
      this.$emit('handleClick');
    }
  }
}
</script>

<style>
  .sticky-footer-btn{
    display: inline-block;
    width: 700px;
    height: 80px;
    line-height: 80px;
    background: #FE8700;
    font-size: 32px;
    color: #FFFFFF;
    text-align: center;
    border-radius: 4px;
  }
  .is-disabled{
    cursor: not-allowed;
    background-color: #f3d19e;
    border-color: #f3d19e;
  }
  .loading-btn{
    animation: load 3s ease-in 0 infinite;
  }
  @keyframes load {
    from {rotate:0deg;}
    to {rotate:360deg;}
  }
</style>

import Vue from 'vue';

export default (()=>{
  Vue.directive('focus', {
    inserted(el,{value}) {
      !!value && el.focus()
    },
    update(el, {value, oldValue}){
      value !== oldValue && Vue.nextTick(()=> el.focus())
    }
  });
})()

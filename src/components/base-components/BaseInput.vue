<template>
    <label class="input-wrapper" :class="{'has-error': error}">
        <span class="input-name">
            <slot></slot>
        </span>
        <input :type="type"
               v-bind="$attrs"
               @input="e => $emit('input', e.target.value)"
               @keyup.enter="$emit('onEnter')">
        <i class="error-text" v-show="error">{{error}}</i>
    </label>
</template>

<script>
    export default {
        name: "BaseInput",
        inheritAttrs: false,
        data(){
            return {
                currentInputType: this.type,
                passwordIsVisible: false
            }
        },
        props:{
            error: {
                type: String,
                default: ''
            },
            type: {
                type: String,
                default: 'text'
            },
        },

    }
</script>

<style lang="scss" scoped>
    .input-wrapper{
        color: #424242;
        font-weight: bold;
        font-size: 14px;
        position: relative;
        display: block;
        margin-bottom: 30px;

        &.has-error {
            input {
                border-bottom: 1px solid #e53e11;
                &::placeholder {
                    color:  #e53e11;
                }
            }
        }
    }
    .input-name {
        display: block;
    }
    input {
        border: none;
        border-bottom: 1px solid #afc7da;
        outline: 0;
        box-shadow: none;
        height: 40px;
        width: 100%;
        margin: 10px 0 4px;
        padding: 0;
        color: rgba(66, 66, 66, 0.8);
        font-weight: 500;
        font-size: 16px;
        box-sizing: border-box;
        &::placeholder{
            color: #89a7c1;
        }
        &:focus {
            outline: none;
        }
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }

        &[type=number] {
            -moz-appearance: textfield;
        }
    }

    .error-text {
        color: #e53e11;
        font-size: 12px;
        position: absolute;
        bottom: -15px;
        left: 0;
    }
</style>

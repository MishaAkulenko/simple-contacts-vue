<template>
    <div class="warning-wrapper" :class="{active: active}">
        <span v-show="!active"  class="material-icons btn remove-btn" @click="showWarningMessage" title="Удалить">cancel</span>
        <div v-show="active" class="warning-body flex-center">
            <b class="message">{{message}}</b>
            <span class="material-icons btn confirm-btn" @click="confirm" title="Подтвердить">check</span>
            <span class="material-icons btn cancel-btn" @click="cancel" title="Отменить">close</span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ConfirmActionWarningComponent",
        props:{
            message: String
        },
        data(){
            return {
                active: false
            }
        },
        methods:{
            showWarningMessage(){
                this.active = true;
            },
            confirm(){
                this.$emit('confirm')
            },
            cancel(){
                this.active = false;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .warning-wrapper {
        position: absolute;
        top: 50%;
        right: 5px;
        transform: translateY(-50%);
        z-index: 10;

        &.active {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            transform: none;
        }
        .warning-body {
            width: 100%;
            height: 100%;
            background: #fbfcf3;
        }
    }
    .warning-body {
        .btn {
            padding-left: 10px;
        }
    }
    .message {
        display: block;
    }
</style>

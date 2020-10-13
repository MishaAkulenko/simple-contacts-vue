<template>
    <button class="btn flex-center" @click.prevent="handleClick">
        <slot name="icon"></slot>
        <span class="btn-text">
            <slot></slot>
        </span>
    </button>
</template>

<script>
    export default {
        name: 'BaseButton',
        methods: {
            handleClick(e){
                this.$emit('click', e);
            },
        },
    };
</script>

<style lang="scss" scoped>
    .btn {
        border-radius: 4px;
        padding: 0 30px;
        font-size: 14px;
        font-weight: bold;
        outline: 0;
        height: 50px;
        box-shadow: none;
        border: 1px solid rgba(77, 193, 187, 0.32);
        color: #424242;
        display: flex;
        background: transparent;
        cursor: pointer;
        min-width: 250px;
        &:hover {
            background: rgba(77, 193, 187, 0.14);
        }
        @media (max-width: 768px) {
            cursor: default;
            height: 40px;
            padding: 0 20px;
            &:hover {
                background: transparent;
            }
        }
        @media (max-width: 480px) {
           width: 100%;
            font-size: 12px;
        }

        &:focus {
            outline: none;
        }
    }
</style>

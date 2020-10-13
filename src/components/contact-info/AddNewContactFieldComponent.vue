<template>
    <div class="selector-wrapper flex">
        <div class="flex title" @click="toggleOpenState">
            <span class="material-icons">add</span> Добавить поле
        </div>
        <ul class="list" v-show="open">
            <li v-for="item in list"
                :key="item.value"
                @click="() => addNewField(item.model)">
                {{item.name}}
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapMutations} from 'vuex'

    export default {
        name: "BaseSelector",
        props:{
            list: Array,
            contactInfo: Object,
        },
        data(){
            return {
                open: false
            }
        },
        methods:{
            ...mapMutations(['ADD_INFO_FIELD']),
            addNewField(model){
                this.open = false;

                this.ADD_INFO_FIELD({
                    id: this.contactInfo.id,
                    fieldName: model
                })
            },
            toggleOpenState(){
                this.open =!this.open
            }
        }
    }
</script>

<style lang="scss" scoped>
    .selector-wrapper {
        position: relative;
        @media (min-width: 768px) {
            cursor: pointer;
        }
        .title{
            font-size: 16px;
            margin-left: 5px;
            align-items: center;
            .material-icons {
                font-size: 16px;
            }
        }

        .list {
            position: absolute;
            top: 25px;
            left: 0;
            background: #fff;
            border: 1px solid rgba(77, 193, 187, 0.32);
            width: 130px;
            border-radius: 2px;
            li {
                padding: 5px;
                width: 100%;
                &:hover {
                    background: #afc7da;
                }
            }
        }
    }
</style>

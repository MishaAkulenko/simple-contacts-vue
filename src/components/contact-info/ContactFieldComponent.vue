<template>
    <li class="contact-field-wrapper">
        <BaseInput :type="fieldParams.type"
                   :placeholder="fieldParams.placeholder"
                   :disabled="!edit"
                   v-model="fieldValue"
                   v-focus="edit"
                   @onEnter="confirmChanges">
            {{fieldParams.name}}
        </BaseInput>
        <span v-if="!edit" class="material-icons btn edit-btn" @click="editField">edit</span>
        <span v-else class="material-icons btn confirm-btn" @click="confirmChanges" title="Подтвердить">check</span>
        <ConfirmActionWarningComponent
                @confirm="removeField"
                v-show="!fieldParams.required"
                :message="removeContactMessage">
        </ConfirmActionWarningComponent>
    </li>
</template>

<script>
    import {mapMutations} from "vuex";
    import ConfirmActionWarningComponent from '../../components/ConfirmActionWarningComponent.vue'
    import {MESSAGES} from "@/const";

    export default {
        name: "ContactFieldComponent",
        components:{
            ConfirmActionWarningComponent
        },
        props:{
            fieldParams: Object,
            contactInfo: Object,
        },
        data(){
            return {
                edit: false,
                warning: false,
                fieldValue: this.contactInfo[this.fieldParams.model]
            }
        },
        computed:{
            removeContactMessage(){
                return MESSAGES.removeWarn
            }
        },
        methods:{
            ...mapMutations(['REMOVE_INFO_FIELD']),
            editField(){
                this.edit = true;
            },
            confirmChanges(){
                this.$emit('confirm', {
                    [this.fieldParams.model]: this.fieldValue
                })
            },
            removeField(){
                this.REMOVE_INFO_FIELD({
                    id: this.contactInfo.id,
                    fieldName: this.fieldParams.model
                })
            },
        }
    }
</script>

<style lang="scss" scoped>
    .contact-field-wrapper {
        position: relative;
    }
    ::v-deep input {
        padding: 5px;
        max-width: calc(100% - 40px);
        &:disabled {
            background: transparent;
            border-bottom: 1px solid transparent;
        }
    }
    .btn {
        font-size: 16px;
        cursor: pointer;
        position: absolute;
        right: 15px;
        top: 36px;
        z-index: 10;
        &.edit-btn{
            &:hover{
                color: dodgerblue;
            }
        }
        &.confirm-btn{
            font-size: 18px;
        }
    }
    ::v-deep .warning-wrapper {
        transform: none;
        top: 36px;
        right: -5px;
        .remove-btn {
            font-size: 16px;
        }
    }

</style>

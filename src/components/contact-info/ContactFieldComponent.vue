<template>
    <li class="contact-field-wrapper">
        <BaseInput :type="fieldParams.type"
                   :placeholder="fieldParams.placeholder"
                   v-model="fieldValue"
                   v-focus="true"
                   @onEnter="confirmChanges">
            {{fieldParams.name}}
        </BaseInput>
        <span class="material-icons btn confirm-btn"
              v-show="hasChanges"
              @click="confirmChanges"
              title="Подтвердить">
            check
        </span>
        <ConfirmActionWarningComponent
                class="undo-editing-warning"
                v-show="hasChanges"
                @confirm="undoChanges"
                :message="undoChangesWarning">
        </ConfirmActionWarningComponent>
        <ConfirmActionWarningComponent
                class="remove-field-warning"
                @confirm="removeField"
                v-show="!fieldParams.required"
                :message="removeContactMessage">
        </ConfirmActionWarningComponent>
    </li>
</template>

<script>
    import {mapMutations, mapGetters} from "vuex";
    import {MESSAGES} from "@/const";
    import ConfirmActionWarningComponent from '../../components/ConfirmActionWarningComponent.vue'

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
                warning: false,
                fieldValue: ''
            }
        },
        created(){
            this.fieldValue = this.savedOnStoreFieldValue;
        },
        computed:{
            ...mapGetters({
                getFieldValueOfContact: 'getFieldValueOfContact'
            }),
            removeContactMessage(){
                return MESSAGES.removeWarn
            },
            undoChangesWarning(){
                return MESSAGES.undoChangesWarning
            },
            savedOnStoreFieldValue(){
                return this.getFieldValueOfContact(this.contactInfo.id, this.fieldParams.model)
            },
            hasChanges(){
                return this.savedOnStoreFieldValue !== this.fieldValue;
            }
        },
        methods:{
            ...mapMutations(['REMOVE_INFO_FIELD', 'EDIT_INFO_FIELD']),
            undoChanges(){
                this.fieldValue = this.savedOnStoreFieldValue;
            },
            confirmChanges(){
                this.EDIT_INFO_FIELD({
                    id: this.contactInfo.id,
                    fieldName: this.fieldParams.model,
                    newValue: this.fieldValue
                });
            },
            removeField(){
                this.REMOVE_INFO_FIELD({
                    id: this.contactInfo.id,
                    fieldName: this.fieldParams.model
                })
            },
        },
        watch:{
            savedOnStoreFieldValue(val){
                this.fieldValue = val;
            }
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
        right: 20px;
        z-index: 10;
        font-weight: bolder;

        &.confirm-btn{
            top: 30px;
            font-size: 18px;
        }
    }
    ::v-deep .remove-field-warning, ::v-deep.undo-editing-warning {
        transform: none;
        top: 36px;
        right: 0;
        .remove-btn {
            font-size: 16px;
        }
    }
    ::v-deep .undo-editing-warning {
        top: 45px;
        right: 20px;
    }
</style>

<template>
    <div class="new-contact-wrapper">
        <span v-show="edit" class="material-icons cancel-btn" @click="clearFields" title="Отменить">cancel</span>
        <form>
            <div class="fields" v-if="edit">
                <BaseInput v-for="(field, index) in fields"
                           :key="field.model"
                           :type="field.type"
                           :error="errors[field.model]"
                           :placeholder="field.placeholder"
                           v-model="contact[field.model]"
                           v-focus="index === 0"
                           @onEnter="validateForm">
                </BaseInput>
            </div>
            <BaseButton v-if="!edit" @click="showEditFormForContact">
                <template v-slot:icon>
                    <span class="material-icons">playlist_add</span>
                </template>
                Добавить контакт
            </BaseButton>
            <BaseButton v-else @click="validateForm">
                <template v-slot:icon>
                    <span class="material-icons">playlist_add_check</span>
                </template>
                Создать контакт
            </BaseButton>
        </form>
    </div>
</template>

<script>
    import {ERRORS, CONTACT_FIELDS} from "@/const";
    import {mapMutations} from 'vuex'

    export default {
        name: "CreateNewContactComponent",
        data(){
            return {
                edit: false,
                fields:[],
                contact:{
                    contactName: '',
                    contactPhone: '',
                },
                errors:{
                    contactName: '',
                    contactPhone: '',
                }
            }
        },
        created(){
            this.fields = CONTACT_FIELDS.filter((field) => field.required);
        },
        methods:{
            ...mapMutations(['ADD_NEW_CONTACT']),
            showEditFormForContact(){
                this.edit = true;
            },
            validateForm(){
                this.clearErrors();
                let hasError = false;

                Object.entries(this.contact).forEach(([prop, value]) =>{
                    if (!value.length){
                        this.errors[prop] = ERRORS.emptyField;
                        hasError = true;
                    }
                });

                !hasError && this.addNewContact();
            },
            addNewContact(){
                const {contactName, contactPhone} = this.contact;
                this.ADD_NEW_CONTACT({
                    contactName,
                    contactPhone,
                });
                this.clearFields();
            },
            clearFields(){
                this.edit = false;
                this.clearErrors();
                this.clearForm();
            },
            clearErrors(){
                Object.keys(this.errors).forEach(key => this.errors[key] = '')
            },
            clearForm(){
                Object.keys(this.contact).forEach(key => this.contact[key] = '')
            },
        }
    }
</script>

<style lang="scss" scoped>
    .new-contact-wrapper {
        position: relative;
    }
    .cancel-btn {
        position: absolute;
        top: -5px;
        right: 5px;
        z-index: 2;
        cursor: pointer;
        &:hover {
            color: #e53e11;
        }
    }
</style>

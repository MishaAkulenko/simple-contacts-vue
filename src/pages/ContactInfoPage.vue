<template>
    <main class="contact-info-wrapper">
        <h1 class="text-ellipsis">{{currentContactInfo.contactName | capitalize}}</h1>
        <UndoLastStateChangeBtnComponent :contactId="currentContactInfo.id"></UndoLastStateChangeBtnComponent>
        <div class="contact-info-fields">
            <form>
                <ul>
                    <ContactField v-for="field in fields"
                                  :key="field.model"
                                  :fieldParams="field"
                                  :contactInfo="currentContactInfo">
                    </ContactField>
                </ul>
            </form>
            <AddNewContactFieldComponent
                    v-show="fieldsAvailToAdding.length"
                    :contactInfo="currentContactInfo"
                    :list="fieldsAvailToAdding">
            </AddNewContactFieldComponent>
        </div>
    </main>
</template>

<script>
    import {mapState} from 'vuex'
    import {CONTACT_FIELDS} from "@/const";
    import ContactField from '../components/contact-info/ContactFieldComponent.vue'
    import AddNewContactFieldComponent from '../components/contact-info/AddNewContactFieldComponent.vue'
    import UndoLastStateChangeBtnComponent from '../components/contact-info/UndoLastStateChangeBtnComponent.vue'

    export default {
        name: "ContactInfoPage",
        components:{
            ContactField,
            AddNewContactFieldComponent,
            UndoLastStateChangeBtnComponent,
        },
        computed:{
            ...mapState({
                contactsList: state => state.contactsList
            }),
            currentContactInfo(){
                return this.contactsList.find((contact)=>{
                    return contact.id === Number(this.$route.params.contactId)
                })
            },
            contactExistingFieldsNames(){
                return Object.keys(this.currentContactInfo)
            },
            fields(){
                return CONTACT_FIELDS.filter((field)=>{
                    return this.contactExistingFieldsNames.includes(field.model)
                })
            },
            fieldsAvailToAdding(){
                return CONTACT_FIELDS.filter((field)=>{
                    return !this.contactExistingFieldsNames.includes(field.model)
                })
            },
        },
    }
</script>

<style lang="scss" scoped>
    .contact-info-wrapper {
        max-width: 500px;
        padding: 50px 5px;
        margin: 0 auto;
        @media (max-width: 480px) {
            padding: 10px 5px;
        }
    }
    .contact-info-fields {
        border: 1px solid rgba(77, 193, 187, 0.32);
        border-radius: 5px;
        padding: 15px;
    }
</style>


<template>
    <main class="container">
        <h1>Список ваших контактов</h1>
        <ul>
            <li class="warning-message" v-show="!hasSavedContacts">У вас пока нету контактов</li>
            <li v-for="contact in contactsList" :key="contact.id">
                <ContactListItemComponent :contactInfo="contact"></ContactListItemComponent>
            </li>
            <li>
                <CreateNewContactComponent></CreateNewContactComponent>
            </li>
        </ul>
    </main>
</template>

<script>
    import {mapState} from 'vuex'
    import CreateNewContactComponent from '../components/contacts-list/CreateNewContactComponent.vue'
    import ContactListItemComponent from '../components/contacts-list/ContactListItemComponent.vue'

    export default {
        name: "ContactsListPage",
        components:{
            CreateNewContactComponent,
            ContactListItemComponent,
        },
        computed:{
            ...mapState({
                contactsList: state => state.contactsList
            }),
            hasSavedContacts(){
                return this.contactsList.length
            }
        }
    }
</script>

<style lang="scss" scoped>
    ul {
        li {
            margin-bottom:  15px;
        }
    }
    .warning-message {
        margin-bottom: 30px;
        @media (max-width: 450px) {
            margin-bottom: 20px;
        }
    }
</style>

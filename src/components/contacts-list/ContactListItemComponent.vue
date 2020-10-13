<template>
    <div class="contact-wrapper">
        <router-link :to="`${routes.contact}/${contactInfo.id}`">
            <div class="name text-ellipsis "><b>{{contactInfo.contactName | capitalize}}</b></div>
            <div class="phone">+3 {{contactInfo.contactPhone}}</div>
        </router-link>
        <ConfirmActionWarningComponent :message="removeContactMessage" @confirm="removeContact"></ConfirmActionWarningComponent>
    </div>
</template>

<script>
    import {ROUTER_PATHS, MESSAGES} from "@/const";
    import {mapMutations} from 'vuex'
    import ConfirmActionWarningComponent from '../ConfirmActionWarningComponent.vue'

    export default {
        name: "ContactListItemComponent",
        components:{
            ConfirmActionWarningComponent,
        },
        props:{
           contactInfo: Object
        },
        computed:{
            routes(){
                return ROUTER_PATHS
            },
            removeContactMessage(){
                return MESSAGES.removeWarn
            }
        },
        methods:{
            ...mapMutations(['REMOVE_CONTACT']),
            removeContact(){
                this.REMOVE_CONTACT({
                    id: this.contactInfo.id
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .contact-wrapper {
        border: 1px solid rgba(77, 193, 187, 0.32);
        border-radius: 4px;
        padding: 10px;
        position: relative;
        overflow: hidden;
        &:hover {
            background: rgba(66, 66, 66, 0.02);
        }
        .name {
            margin-bottom: 10px;
            font-size: 18px;
            width: calc(100% - 15px);
        }
    }
</style>

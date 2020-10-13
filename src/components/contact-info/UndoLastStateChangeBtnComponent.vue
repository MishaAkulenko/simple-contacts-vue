<template>
    <div class="wrapper">
        <span v-show="canUndo" class="material-icons btn edit-btn" @click="undoChanges" title="Отменить действие">undo</span>
    </div>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

    export default {
        name: "UndoLastStateChangeBtnComponent",
        props:{
            contactId: Number
        },
        data() {
            return {
                mutationHistory: [],
                beginContactState: null
            }
        },
        created() {
            this.beginContactState = {
                ...this.getContactById(this.contactId)
            };
            this.$store.subscribe(mutation => {
                if (mutation.type !== 'RESET_CONTACT_STATE') {
                    this.mutationHistory.push(mutation);
                }
            })
        },
        computed:{
            ...mapGetters({
                getContactById: 'getContactById',
            }),
            canUndo(){
                return this.mutationHistory.length
            }
        },
        methods: {
            ...mapMutations(['RESET_CONTACT_STATE']),
            undoChanges(){
                this.mutationHistory.pop();
                this.RESET_CONTACT_STATE({
                    ...this.beginContactState
                });
                this.mutationHistory.forEach(mutation => {
                    this.$store.commit(`${mutation.type}`, mutation.payload);
                    this.mutationHistory.pop();
                });
            }
        },
    }
</script>

<style lang="scss" scoped>
    .wrapper {
        height: 28px;
        text-align: right;
    }
</style>

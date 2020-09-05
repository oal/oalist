<template>
    <div>
        <portal to="toolbar">
            <v-layout align-center>
                <v-toolbar-title v-text="list.name"/>
                <v-spacer/>
                <v-btn icon @click="edit = !edit">
                    <v-icon>mdi-cog</v-icon>
                </v-btn>
            </v-layout>
        </portal>

        <v-container class="grey lighten-4" v-if="edit">
            <v-layout align-center>
                <v-flex>
                    <v-text-field solo v-model="editName" hide-details/>
                </v-flex>
                <v-spacer/>
                <v-flex shrink>
                    <v-btn large color="primary" @click="saveList" :disabled="!editName.length">Save</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
export default {
    async asyncData(ctx) {
        let list = await ctx.$api.getList(ctx.params.id);
        console.log(list, ctx.params.id)
        return {
            list
        }
    },
    data() {
        return {
            edit: false,
            editName: ''
        }
    },
    methods: {
        async saveList() {
            await this.$api.saveList({...this.list, name: this.editName});
            this.list = await this.$api.getList(this.list.id);
            this.edit = false;
        }
    },
    watch: {
        '$route.params.id'() {
            console.log('ID CHANGED')
        },
        edit(state) {
            if (state) this.editName = this.list.name;
        }
    }
}
</script>

<style scoped>

</style>

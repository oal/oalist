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

        <v-list>
            <ListItem :value="item" v-for="item in items" :key="item.id"></ListItem>
        </v-list>

        <v-btn fab fixed bottom left :color="showChecked ? 'green' : 'secondary'" dark
               @click="showChecked = !showChecked">
            <v-icon v-if="showChecked">mdi-eye-check</v-icon>
            <v-icon v-else>mdi-eye-off</v-icon>
        </v-btn>

        <v-btn fab fixed bottom right color="primary" @click="createItem">
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </div>
</template>

<script>
import ListItem from "~/components/ListItem.vue";

export default {
    components: {
        ListItem
    },
    async asyncData(ctx) {
        let id = ctx.params.id;
        let list = await ctx.$api.getList(id);
        console.log(list, id)
        return {
            list
        }
    },
    data() {
        return {
            items: [],
            edit: false,
            editName: '',
            showChecked: false
        }
    },

    created() {
        this.loadItems();
    },

    methods: {
        async loadItems() {
            this.items = await this.$api.getListItems(this.list.id, this.showChecked);
        },
        async saveList() {
            await this.$api.saveList({...this.list, name: this.editName});
            this.list = await this.$api.getList(this.list.id);
            this.edit = false;
        },

        async createItem() {
            let listId = this.list.id;
            await this.$api.saveListItem({listId: listId, text: '' + Math.random(), isChecked: false});
            this.items = await this.$api.getListItems(listId)
        }
    },

    watch: {
        '$route.params.id'() {
            console.log('ID CHANGED')
        },
        edit(state) {
            if (state) this.editName = this.list.name;
        },
        showChecked() {
            this.loadItems();
        }
    }
}
</script>

<style scoped>

</style>

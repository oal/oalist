<template>
    <div>
        <portal to="toolbar">
            <v-layout align-center>
                <v-toolbar-title v-text="list.name"/>
                <v-spacer/>
                <v-btn icon @click="edit = !edit" :color="edit ? 'primary' : null">
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
                    <v-btn large color="primary" @click="saveList" :disabled="!editName.length">Rename</v-btn>
                </v-flex>
            </v-layout>
        </v-container>
        <NewListItem :list-id="list.id" v-else/>

        <v-list>
            <ListItem :value="item" v-for="item in items" :key="item.id" @checked="onItemChecked(item)"></ListItem>
        </v-list>

        <v-btn fab fixed bottom right :color="showChecked ? 'green' : 'secondary'" dark
               @click="showChecked = !showChecked">
            <v-icon v-if="showChecked">mdi-eye-check</v-icon>
            <v-icon v-else>mdi-eye-off</v-icon>
        </v-btn>
    </div>
</template>

<script>
import NewListItem from "@/components/NewListItem.vue";
import ListItem from "~/components/ListItem.vue";

export default {
    components: {
        NewListItem,
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
            showChecked: false,

            addItemText: null
        }
    },

    created() {
        this.loadItems();
        this.$api.changes.on('items.create', this.addItem);
    },

    beforeDestroy() {
        this.$api.changes.off('items.create', this.addItem);
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
        addItem(item) {
            this.items.splice(0, 0, item);
        },
        onItemChecked(item) {
            if (this.showChecked) return;
            let idx = this.items.indexOf(item);
            if (idx === -1) return;

            setTimeout(() => {
                this.items.splice(idx, 1);
            }, 50)
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

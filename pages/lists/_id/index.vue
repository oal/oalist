<template>
    <div>
        <portal to="toolbar">
            <v-layout align-center>
                <v-icon color="primary" class="mr-2">{{ list.icon }}</v-icon>
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
                    <v-text-field solo v-model="editName" hide-details :prepend-inner-icon="list.icon"
                                  @click:prepend-inner="showIconSelector = !showIconSelector" class="mr-3"/>
                </v-flex>
                <v-flex shrink>
                    <v-btn large color="primary" @click="saveListName" :disabled="!editName.length">Rename</v-btn>
                </v-flex>
            </v-layout>
            <div>
                <IconSelect v-if="showIconSelector" class="pt-3" v-model="list.icon"></IconSelect>
            </div>
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
import IconSelect from "@/components/IconSelect.vue";

export default {
    components: {
        NewListItem,
        IconSelect,
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
            showIconSelector: false,

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
        async saveListName() {
            await this.saveList({name: this.editName});
            this.edit = false;
        },

        async saveList(diffs = {}) {
            await this.$api.saveList({...this.list, ...diffs});
            this.list = await this.$api.getList(this.list.id);
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
        },
        'list.icon'() {
            this.saveList();
        }
    }
}
</script>

<style scoped>
</style>

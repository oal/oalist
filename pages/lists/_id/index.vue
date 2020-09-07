<template>
    <div>
        <portal to="toolbar">
            <v-layout align-center>
                <v-icon :style="listColorStyle" class="mr-2">{{ list.icon }}</v-icon>
                <v-toolbar-title v-text="list.name"/>
                <v-spacer/>

                <v-dialog v-model="edit" width="500">
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn icon @click="edit = !edit" :color="edit ? 'primary' : null" v-on="on">
                            <v-icon>mdi-cog</v-icon>
                        </v-btn>
                    </template>

                    <v-card class="grey lighten-4">
                        <v-layout align-center class="pt-3 pr-3">
                            <v-card-title class="headline py-0">
                                List settings
                            </v-card-title>

                            <v-spacer/>

                            <v-btn color="secondary" icon @click="edit = false">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </v-layout>
                        <ListEdit v-model="list" v-if="edit" @save="edit=false"/>
                    </v-card>
                </v-dialog>
            </v-layout>
        </portal>


        <NewListItem :list-id="list.id"/>

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
import ListEdit from "~/components/ListEdit.vue";

export default {
    components: {
        ListEdit,
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
        showChecked() {
            this.loadItems();
        }
    },

    computed: {
        listColorStyle() {
            return this.list.color ? `color: ${this.list.color}` : null;
        }
    }
}
</script>


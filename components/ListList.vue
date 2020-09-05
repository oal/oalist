<template>
    <v-list>
        <v-list-item v-for="(item, i) in lists" :key="i" :to="{name: 'lists-id', params: {id: item.id}}" router exact>
            <v-list-item-action>
                <v-icon>list</v-icon>
            </v-list-item-action>
            <v-list-item-content>
                <v-list-item-title v-text="item.name"/>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>
<script>
export default {
    name: 'ListList',

    data() {
        return {
            lists: []
        }
    },
    created() {
        this.loadData();

        this.$api.changes.on('lists', this.loadData);
    },

    beforeDestroy() {
        this.$api.changes.off('lists', this.loadData);
    },

    methods: {
        async loadData() {
            this.lists = await this.$api.getLists();
        }
    }
}
</script>

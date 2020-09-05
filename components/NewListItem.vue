<template>
    <v-container class="grey lighten-4">
        <v-layout align-center>
            <v-flex>
                <v-autocomplete
                    v-model="text"
                    :search-input.sync="search"
                    :items="items"
                    color="white"
                    hide-no-data
                    hide-selected
                    item-text="text"
                    item-value="text"
                    solo
                    no-filter
                    :append-icon="null"
                    @keypress.enter.stop="addItem(null)"
                    hide-details/>
            </v-flex>
            <v-flex shrink class="pl-5 pr-3">
                <v-btn icon color="white" :class="canAddItem ? 'green' : null" @click="addItem(null)"
                       :disabled="!canAddItem">
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: {
        listId: String
    },

    data() {
        return {
            text: '',
            search: '',

            items: []
        }
    },

    methods: {
        async addItem(text = null) {
            let value = text ?? this.search;
            if (!value) return;

            await this.$api.saveListItem({
                listId: this.listId,
                text: value
            });
            setTimeout(() => {
                this.text = '';
                this.search = '';
                this.items = [];
            }, 10);
        },

        addAutocomplete() {
            this.text = this.search;
            this.addItem();
        }
    },

    watch: {
        async search() {
            if (!this.search) {
                this.items = [];
                return;
            }
            console.log('Search', this.search);
            this.items = await this.$api.searchListItems(this.listId, this.search)
        },
        text() {
            if (!this.text) return;
            this.addItem(this.text);
        }
    },

    computed: {
        canAddItem() {
            return !!this.text || !!this.search;
        }
    }
}
</script>

<style scoped>

</style>

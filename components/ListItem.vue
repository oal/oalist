<template>
    <v-list-item>
        <template v-slot:default="{ active }">
            <v-list-item-action>
                <v-checkbox v-model="value.isChecked" color="primary"/>
            </v-list-item-action>

            <v-list-item-content>
                <v-list-item-title>{{ value.text }}</v-list-item-title>
            </v-list-item-content>
        </template>
    </v-list-item>
</template>

<script>
import {IListItem} from '~/store/types';

export default {
    props: {
        value: {
            type: IListItem,
            required: true
        }
    },

    methods: {
        async save() {
            await this.$api.saveListItem(this.value);
            console.log('Change')
        }
    },

    watch: {
        value: {
            handler() {
                this.save();
            },
            deep: true
        }
    }
}
</script>

<style scoped>

</style>

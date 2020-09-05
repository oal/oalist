<template>
    <transition name="fade" appear>
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
    </transition>
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

    data() {
        return {
            search: ''
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
        },
        'value.isChecked'(state) {
            if (state) this.$emit('checked');
        }
    }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: opacity .1s;
}

.fade-enter, .fade-leave-to {
    opacity: 0;
}
</style>

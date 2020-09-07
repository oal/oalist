<template>
    <v-container>
        <v-layout align-center>
            <v-flex>
                <v-text-field solo v-model="editName" hide-details class="mr-2"/>
            </v-flex>
            <v-flex shrink>
                <v-btn large color="primary" @click="saveListName" :disabled="!editName.length">Rename</v-btn>
            </v-flex>
        </v-layout>
        <div>
            <v-card class="pa-3 my-2">
                <IconSelect v-model="value.icon" @input="saveList"></IconSelect>
            </v-card>
            <v-color-picker :value="value.color" @update:color="onColorChange" show-swatches hide-canvas
                            hide-inputs mode="hexa" width="100%" class="elevation-2"/>
        </div>
    </v-container>
</template>
<script>
import IconSelect from "@/components/IconSelect.vue";

export default {
    components: {IconSelect},
    props: {
        value: Object,
    },

    data() {
        return {
            editName: this.value.name
        }
    },

    methods: {
        async saveListName() {
            await this.saveList({name: this.editName});
        },

        async saveList(diffs = {}) {
            await this.$api.saveList({...this.value, ...diffs});
            let list = await this.$api.getList(this.value.id);
            this.$emit('input', list);
        },

        onColorChange(event) {
            this.saveList({color: event.hex});
        }
    }
}
</script>

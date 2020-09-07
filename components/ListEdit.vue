<template>
    <v-container>
        <v-text-field solo v-model="editName" placeholder="List title" hide-details/>
        <div class="mb-3">
            <v-card class="pa-3 my-2">
                <IconSelect v-model="value.icon"></IconSelect>
            </v-card>
            <v-color-picker :value="value.color" @update:color="onColorChange" show-swatches hide-canvas
                            hide-inputs mode="hexa" width="100%" class="elevation-2"/>
        </div>

        <v-btn large color="primary" @click="save" :disabled="!editName" v-text="value.id ? 'Save' : 'Create'"/>
    </v-container>
</template>
<script>
import IconSelect from "@/components/IconSelect.vue";

export default {
    components: {IconSelect},
    props: {
        value: {
            type: Object,
            default: () => {
                return {
                    icon: 'mdi-notebook-check'
                }
            }
        },
    },

    data() {
        return {
            editName: this.value.name
        }
    },

    methods: {
        async save() {
            let alreadyExists = !!this.value.id;

            let listData = {...this.value, name: this.editName};
            if (!alreadyExists) {
                let listId = await this.$api.createList(listData);
                await this.$router.push({name: 'lists-id', params: {id: listId}})
            } else {
                let listId = await this.$api.saveList(listData);
                let list = await this.$api.getList(listId);
                this.$emit('input', list);
            }

            this.$emit('save');
        },
        onColorChange(event) {
            this.value.color = event.hex;
        }
    }
}
</script>

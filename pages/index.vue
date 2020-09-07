<template>
    <v-layout class="blue-grey lighten-4" style="min-height: 100%;">
        <portal to="toolbar">
            <v-layout align-center>
                <v-toolbar-title>Create list</v-toolbar-title>
                <v-spacer/>
            </v-layout>
        </portal>

        <ListEdit/>
    </v-layout>
</template>

<script>
import ListEdit from "~/components/ListEdit.vue";

export default {
    components: {
        ListEdit
    }
}
</script>

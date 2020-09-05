<template>
    <v-layout column justify-center align-center>
        <v-flex xs12 sm8 md6>
            <v-text-field v-model="newList"/>
            <v-btn @click="createList">Add list</v-btn>
        </v-flex>
    </v-layout>
</template>

<script>
export default {
    data() {
        return {
            newList: ''
        }
    },

    methods: {
        async createList() {
            let id = await this.$api.createList(this.newList);
            await this.$router.push({name: 'lists-id', params: {id}})
        }
    },
}
</script>

<template>
    <v-layout>
        <v-flex class="text-center">
            {{ icon }}
            <IconSelect v-model="icon"/>
        </v-flex>
    </v-layout>
</template>


<script>
export default {
    data() {
        return {
            icon: null
        }
    },
}
</script>

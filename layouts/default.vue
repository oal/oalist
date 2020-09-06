<template>
    <v-app dark>
        <v-navigation-drawer v-model="drawer" fixed app>
            <div class="menu-wrapper">
                <ListList/>

                <v-spacer/>

                <v-list>
                    <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
                        <v-list-item-action>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-action>
                        <v-list-item-content>
                            <v-list-item-title v-text="item.title"/>
                        </v-list-item-content>
                    </v-list-item>
                </v-list>
            </div>
        </v-navigation-drawer>
        <v-app-bar fixed app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"/>
            <portal-target name="toolbar" class="flex"></portal-target>
        </v-app-bar>
        <v-main>
            <nuxt/>
        </v-main>
    </v-app>
</template>
<script>
import ListList from "~/components/ListList.vue";

export default {
    components: {ListList},
    data() {
        return {
            lists: [],
            drawer: false,
            items: [
                {
                    icon: 'mdi-playlist-plus',
                    title: 'Create list',
                    to: '/'
                },
                {
                    icon: 'mdi-cog-box',
                    title: 'Settings',
                    to: '/inspire'
                }
            ],
            title: 'oalist'
        }
    }
}
</script>

<style scoped>
.menu-wrapper {
    display: flex;
    min-height: 100%;
    flex-direction: column;
}
</style>

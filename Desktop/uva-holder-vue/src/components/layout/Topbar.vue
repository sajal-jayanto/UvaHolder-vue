<template>
    <v-app-bar app class="blue white--text">
        <v-spacer></v-spacer>
        <v-menu bottom left >
            <template v-slot:activator="{ on, attrs }">
            <v-btn dark icon v-bind="attrs" v-on="on">
                <v-icon>mdi-dots-vertical</v-icon>
            </v-btn>
            </template>

            <v-list>
                <v-list-item v-for="(item, i) in items" :key="i">
                <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>
export default {
    name : 'Topbar'
}
</script>
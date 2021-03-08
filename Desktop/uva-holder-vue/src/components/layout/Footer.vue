<template>
    <v-footer app class="blue white--text text-center" >
        <v-card-text class="py-2 ">
            {{ new Date().getFullYear() }} — <strong>Vuetify</strong>
        </v-card-text>
    </v-footer>
</template>

<script>
export default {
    name : 'Footer'
}
</script>
<template>
    
    <v-app>
        <Sidebar />
        <Topbar />
        <v-main>
            <v-container fluid>
                <slot/>
            </v-container>
        </v-main>
        <Footer />

    </v-app>

</template>

<script>

import Sidebar from '../../components/layout/Sidebar';
import Footer from '../../components/layout/Footer';
import Topbar from '../../components/layout/Topbar';


export default {
    name: 'Layout',
    components: {
        Sidebar,
        Footer,
        Topbar
    },
}
</script>

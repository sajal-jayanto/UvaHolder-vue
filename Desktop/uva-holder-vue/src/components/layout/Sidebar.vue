<template>
    <v-navigation-drawer app>
        <v-card height="100vh" width="256" class="mx-auto">
            <v-navigation-drawer permanent>
                <v-list-item>
                    <v-list-item-content>
                        <v-list-item-title class="title">
                            Uva Holder
                        </v-list-item-title>
                        <v-list-item-subtitle>
                            Jayanto Mondal
                        </v-list-item-subtitle>
                    </v-list-item-content>
                </v-list-item>

                <v-divider></v-divider>

                <v-list dense nav >
                    <v-list-item v-for="item in items" :key="item.title" router :to="item.route">
                        <v-list-item-icon>
                            <v-icon>{{ item.icon }}</v-icon>
                        </v-list-item-icon>

                        <v-list-item-content>
                            <v-list-item-title>
                                
                                {{ item.title }}

                            </v-list-item-title>
                        </v-list-item-content>

                    </v-list-item>
            
                </v-list>
            </v-navigation-drawer>
        </v-card>
    </v-navigation-drawer>
</template>

<script>

export default {
    
    name : 'Sidebar',
    
    data() {
        return {
            items: [
                { title: 'Dashboard', icon: 'mdi-view-dashboard' , route : '/' },
                { title: 'Live Submissions', icon: 'mdi-image' , route : '/live-subissions'},
                { title: 'Problems', icon: 'mdi-help-box' , route : '/live-subissions'},
            ],
            right: null,
        }
    }
}
</script>
<template>
    <Layout>
        <div class="card">
            <div class="card-header">
               Submissions
            </div>
            
            <div class="space-top">
                <v-data-table :headers="headers" :items="desserts" class="elevation-1">
                    <template v-slot:item.verdict="{item}">
                        <v-chip
                            :color="getColor(item.verdict)"
                            dark
                        >
                            {{ item.verdict }}
                        </v-chip>
                    </template>
                </v-data-table>
            </div>
        </div>
    </Layout>    
    
</template>


<script>
import Layout from '../../views/pages/Layout'
import http from '../../util/axios.config'
import { userSubmissionDataDecodeAsTable } from '../../util/apiDataDecoder'

export default ({
    
    name : 'Submissions',
    loding : true,
    components :{
        Layout
    },
    data () {
        return {
        
            headers: [
                { text: 'ID',value: 'submissionId',},
                { text: 'Problem', value: 'numberWithName' },
                { text: 'Verdict', value: 'verdict' },
                { text: 'Language ', value: 'language' },
                { text: 'Time', value: 'runtime' },
                { text: 'Best', value: 'bestRunTime' },
                { text: 'Rank' , value : 'rank' },
                { text: 'Submission Time', value: 'submissionTime' },
            ],
            desserts: [],
        }
    },

    beforeMount(){
        this.fatchSubmissionsData(200);
    },

    methods : {

        getColor (verdict) {
            switch(verdict){
                case 'Accepted':
                    return '#228B22';

                case 'PresentationE':
                    return '#666600';

                case 'Wrong answer':
                    return '#FF0000';

                case 'Time limit':
                    return '#0000FF';

                case 'Memory limit':
                    return '#0000AA';

                case 'Compile error':
                    return '#AAAA00';
                
                case 'Runtime error':
                    return '#00CED1'
                
                case 'Output limit':
                    return '#000000'
                
                default :
                    return '#000000'; 
                    
            }
        },

        async fatchSubmissionsData(amount){

            const userId = localStorage.getItem("userId");
            const res = await http.get(`subs-user-last/${userId}/${amount}`);
            const data = await userSubmissionDataDecodeAsTable(res.data);
            this.desserts = [ ...data.submissions ] ;
        }
    }
});
</script>

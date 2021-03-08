<template>
    <Layout>
        <div class="card">
            <div class="card-header">
               Live Submissions
            </div>
            <div class="space-top">
                <v-data-table :headers="headers" :items="desserts" class="elevation-1">
                    
                    <template v-slot:item.verdict="{ item }">
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
import { 

    findProblemByProblemId , 
    getRandomInt , 
    getLanguage , 
    getVerdict,
    timeConverter

} from '../../util/apiDataDecoder'


export default {
    name: 'LiveSubmissionsPage',
    components :{
        Layout
    },

    data () {
        return {
            
            globalPollId : 0,
            randomInt : getRandomInt(Number.MAX_SAFE_INTEGER),
            headers: [
                { text: 'ID',value: 'submissionsId',},
                { text: 'Problem', value: 'numberWithName' },
                { text: 'User (User Name)', value: 'userName' },
                { text: 'Verdict', value: 'verdict' },
                { text: 'Language ', value: 'language' },
                { text: 'Time', value: 'runtime' },
                { text: 'Best', value: 'bestRuntime' },
                { text: 'Rank' , value : 'rank' },
                { text: 'Submission Time', value: 'submissionTime' },
            ],
            desserts: [],
        }
    },

    watch:{
        async randomInt(){
            this.randomInt = await this.fatchLiveSubmissionsData(this.globalPollId);
        }
    },

    async beforeMount(){
        this.randomInt = await this.fatchLiveSubmissionsData(0);
    },
    
    methods: {
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

        async fatchLiveSubmissionsData(pullId){

            try{
                
                const problemsList = JSON.parse(localStorage.getItem("problemsList"));

                const res = await http.get(`poll/${pullId}` , { timeout: 60000 });
                const data = res.data;

                let liveData = this.desserts;
                let len = data.length;
                this.globalPollId = pullId;

                if(len >= 1){

                    this.globalPollId = data[len - 1].id;

                    for(let sub of data){

                        let pos = -1 , low = 0, high = liveData.length - 1;

                        while(low <= high){    
                            
                            if(sub.msg.sid == liveData[low].key) { pos = low ; break; }
                            low++;
                        }
                        let position = findProblemByProblemId(sub.msg.pid);

                        let updateSubmission = {
                                
                            key : sub.msg.sid,
                            submissionsId : sub.msg.sid,
                            numberWithName : `${problemsList[position][1]} - ${problemsList[position][2]}`,
                            userName : `${sub.msg.name}(${sub.msg.uname})`,
                            verdict : getVerdict(sub.msg.ver),
                            language : getLanguage(sub.msg.lan),
                            runtime : (sub.msg.run / 1000).toFixed(3),
                            bestRuntime : (problemsList[position][4] / 1000).toFixed(3),
                            rank : sub.msg.rank !== -1 ? sub.msg.rank : '-',
                            submissionTime : timeConverter(sub.msg.sbt)
                        }

                        if(pos === -1){

                            liveData.unshift(updateSubmission);
                            if(liveData.length >= 100) liveData.pop();
                        }
                        else liveData[pos] = updateSubmission;
                    }
                }
                this.desserts = [ ...liveData ];
                return getRandomInt(Number.MAX_SAFE_INTEGER);
            }
            catch(error){

                return 0;
            }
        }
    },
}
</script>


<style>
.space-top{
    margin-top: 1%;
}
</style>
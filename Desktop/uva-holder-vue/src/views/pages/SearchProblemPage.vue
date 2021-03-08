<template>
    <Layout>
        <div class="card">
            <div class="navbar navbar-light bg-light p-3">
                <a class="navbar-brand"> Search Problem </a>
                <div class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Problem Number" aria-label="Search" v-model="problemNumber" >
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit" @click="fatchProblemData()">Search</button>
                </div>
            </div>
        </div>
        <div  v-show="shownow">
            
            <div class="alert alert-primary m-3" role="alert">
                {{problemNumber}} {{ " - " + problemName}}
            </div>
            
            <div class="col-md-12">
                <div id="chart">
                    <apexchart type="bar" height="300" :options="barChartOptions" :series="barChartData"></apexchart>
                </div>
            </div>
            
            <div class="container">
                <div class="row">
                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                Your Submissions
                            </div>
                            
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

                    <div class="col-md-12">
                        <div class="card">
                            <div class="card-header">
                                Your Submissions
                            </div>
                            
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
                    
                </div>
            
            </div>

            
        </div>
    </Layout>
</template>

<script>
import Layout from '../../views/pages/Layout'
import VueApexCharts from 'vue-apexcharts'
import http from '../../util/axios.config'
import { userSubmissionDataDecodeAsTable } from '../../util/apiDataDecoder'

export default ({
    name : "SearchProblemPage",
    components : {
        apexchart: VueApexCharts,
        Layout 
    },
    data: () => ({
        
        problemNumber : '',
        problemName : '',
        shownow : false,
        barChartData : [{ data: [] }],
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

        barChartOptions: {
            chart: {
                height: 350,
                type: 'bar',
            },
            title: {
                text: 'Product Trends by Month',
                align: 'left'
            },
            plotOptions: { 
                bar: { 
                    borderRadius: 6, 
                    columnWidth: '45%', 
                    distributed: true,
                }
            },
            dataLabels: {
              enabled: false
            },
            xaxis: {
                categories: ["AC" , "PE" , "WA" , "TLE" , "ML" , "CE" , "RE" , "OL"],
                labels: { style: { fontSize: '12px' } }
            }
        },
    }),

    

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

        async fatchProblemData(){

            try{
                
                this.barChartData[0].data = [];
                let res = await http.get(`p/num/${this.problemNumber}`);
                let data = res.data;

                this.barChartData[0].data.push(data.ac);
                this.barChartData[0].data.push(data.pe);
                this.barChartData[0].data.push(data.wa);
                this.barChartData[0].data.push(data.tle);
                this.barChartData[0].data.push(data.mle);
                this.barChartData[0].data.push(data.ce);
                this.barChartData[0].data.push(data.re);
                this.barChartData[0].data.push(data.ole);

                this.problemName = data.title;

                const userId = localStorage.getItem("userId");
                res = await http.get(`subs-nums/${userId}/${this.problemNumber}/0`)
                data = await userSubmissionDataDecodeAsTable(res.data[userId]);
                this.desserts = [ ...data.submissions ];

                this.shownow = true;

            }
            catch(error){
                console.log(error);
            }
        }
    }
})
</script>

<template>
    <Layout>
        <v-card
      flat
      tile
    >
      <v-window
        v-model="onboarding"
        vertical
      >
        <v-window-item
          v-for="n in length"
          :key="`card-${n}`"
        >
          <v-card
            color="grey"
            height="300"
          >
            <v-row
              class="fill-height"
              align="center"
              justify="center"
            >
              <h1
                style="font-size: 5rem;"
                class="white--text"
              >
                Slide {{ n }}
              </h1>
            </v-row>
          </v-card>
        </v-window-item>
      </v-window>
  
      <v-card-actions class="justify-space-between">
        <v-btn
          text
          @click="prev"
        >
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
        <v-item-group
          v-model="onboarding"
          class="text-center"
          mandatory
        >
          <v-item
            v-for="n in length"
            :key="`btn-${n}`"
            v-slot="{ active, toggle }"
          >
            <v-btn
              :input-value="active"
              icon
              @click="toggle"
            >
              <v-icon>mdi-record</v-icon>
            </v-btn>
          </v-item>
        </v-item-group>
        <v-btn
          text
          @click="next"
        >
          <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>
    
    
    <div class="container">
        <div class="row">
            <div class="col-md-5 ">
                <div id="chart">
                    <apexchart type="bar" :options="barChartOptions" :series="barChartData"></apexchart>
                </div>
            </div>
            <div class="col-md-5 offset-md-1">
                <div id="chart">
                    <apexchart type="line" :options="lineChartOptions" :series="lineChartData"></apexchart>
                </div>
            </div>
        </div>
        
    </div>

    
    </Layout>
    
</template>


<script>
// import HelloWorld  from '../../components/HelloWorld'
import Layout from '../../views/pages/Layout'
import VueApexCharts from 'vue-apexcharts'
import { userSubmissionDataDecode } from '../../util/apiDataDecoder'
import http from '../../util/axios.config'

export default {
    
    components :{
        apexchart: VueApexCharts,
        Layout
    },
    data: () => ({
        length: 5,
        onboarding: 0,
        barChartData : [{ data: [] }],
        lineChartData : [{ data: [] }],

        lineChartOptions: {
            chart: {
                height: 350,
                type: 'line',
                zoom: { enabled: false }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'stepline'
            },
            title: {
                text: 'Product Trends by Month',
                align: 'left'
            }, 
            markers: {
              hover: {
                sizeOffset: 4
              }
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], 
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ["2012" , "2013" , "2014" , "2015" , "2016" , "2017" , "2018" ,"2019" , "2020" , "2021"],
            }
        },


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

    beforeMount(){
        this.fatchSubmissionsData(); 
    },

    methods: {
        next () {
            this.onboarding = this.onboarding + 1 === this.length ? 0: this.onboarding + 1
        },
        prev () {
            this.onboarding = this.onboarding - 1 < 0 ? this.length - 1 : this.onboarding - 1
        },

        async fatchSubmissionsData(){

            const userId = localStorage.getItem("userId");
            const res = await http.get(`subs-user/${userId}`);
            const data = await userSubmissionDataDecode(res.data);

            for(let count in data.verdictCount){
                this.barChartData[0].data.push(data.verdictCount[count]);
            }
            
            for(let solve of data.eachYearSolveCount){
                this.lineChartData[0].data.push(solve.solved);
            }
        }
    },
}
</script>

<style scoped>

</style>



<template>

    <div class="container-fluid no-padding no-margin">
        <div class="row no-gutters">
            <div class="col-lg-8 col-md-8"> 
                <div class="bgstyle"> </div>
            </div>
            <div class="col-lg-4 col-md-4">
               
                <div v-show="isError" class="alert alert-danger m-3" role="alert">
                    <h5 class="alert-heading">{{ErrorMsg}}</h5>
                </div>

                <div class="login-user-input">
                    
                    <h1 class="text-color">Uva Holder</h1>
                    <div class="input-group mt-3">
                        <input type="text" v-model="userName" class="form-control" placeholder="User Name">
                    </div>
                    <button type="button" @click="submitFrom()" class="btn btn-primary btn-lg btn-block">Login</button>
                    
                </div>
            </div>
        </div> 
    </div>
        
</template>

<script>

import http from '../../util/axios.config';

export default {
    
    name: 'Login',
    data() {
        return {
            isError : false,
            ErrorMsg : "",
            userName : "",
            userId : null,
        }
    },
    
    methods : {
        async submitFrom(){
            
            try{

                if(this.userName !== ""){
                    
                    const res = await http.get(`uname2uid/${this.userName}`);
                    if(res.data == 0){

                        this.ErrorMsg = "Wrong User Name";
                        this.isError = true;
                        setTimeout(() => { this.isError = false; } , 2000);
                    }
                    else {

                        this.userId = res.data;
                        
                        const problemRes = await http.get(`p`);

                        localStorage.setItem("problemsList" , JSON.stringify(problemRes.data));
                        localStorage.setItem("userName" , this.userName);
                        localStorage.setItem("userId" , this.userId);
                        
                        this.$router.push({path: '/'});
                    }
                }
                else{

                    this.ErrorMsg = "User Name can't be blank";
                    this.isError = true;
                    setTimeout(() => { this.isError = false; } , 2000);
                }
                
            }
            catch(error){
                
                this.ErrorMsg = "Somethings wrong in server";
                this.isError = true;
                setTimeout(() => { this.isError = false; } , 2000);

                console.log(error);
            }
        }
    }

}
</script>

<style scoped>
.bgstyle  {
    background-image: url("C:\\Users\\Jayanto\\Desktop\\bcakground.png");
    height: 100vh;
    width: "100%";
    background-position: top center;
    background-size: cover;
    background-repeat: no-repeat;
    position:'relative';
    left :'-2px'

}
.text-color{
    color: tomato;
}

.no-padding {
    padding: 0;
} 

.no-margin {
    margin: 0;
}

.login-user-input {
  padding: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 30%;
  color: white;
}

.login-user-input button {
  font-size: 15px;
  margin-top: 10px;
}


</style>

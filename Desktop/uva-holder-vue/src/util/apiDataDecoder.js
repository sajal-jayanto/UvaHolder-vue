export const userSubmissionDataDecode = ( data ) => {
    
    return new Promise(resolve => {
        
        const paylodData = {

            name  : data.name,
            uname : data.uname, 
            verdictCount : {    
                AC  : 0, WA  : 0, TLE : 0, RE  : 0,
                CE  : 0, ML  : 0, PE  : 0, OL  : 0
            },
            totalSolve : 0,
            eachYearSolveCount : []
        }

        let minYear = 300000;
        let maxYear = 0;
        let curretYear = new Date().getFullYear();
        let solveCounts = {};
        let uniqueSolveProblemList = new Set();

        for(const sub of data.subs) {

            switch(sub[2]){
                case 90: 
                    paylodData.verdictCount.AC++;
                    break;
                case 70: 
                    paylodData.verdictCount.WA++; 
                    break; 
                case 50: 
                    paylodData.verdictCount.TLE++; 
                    break;
                case 40: 
                    paylodData.verdictCount.RE++; 
                    break;
                case 30: 
                    paylodData.verdictCount.CE++; 
                    break; 
                case 60: 
                    paylodData.verdictCount.ML++; 
                    break; 
                case 80:  
                    paylodData.verdictCount.PE++; 
                    break; 
                case 45: 
                    paylodData.verdictCount.OL++; 
                    break; 
                default : 
                    break; 
            }

            let yearTheProblemSubmited = new Date(sub[4] * 1000).getFullYear();

            minYear = Math.min(minYear , yearTheProblemSubmited);
            maxYear = Math.max(maxYear , yearTheProblemSubmited);

            if(sub[2] === 90 && !uniqueSolveProblemList.has(sub[1])){

                solveCounts[yearTheProblemSubmited] !== undefined ? 
                solveCounts[yearTheProblemSubmited]++ : 
                solveCounts[yearTheProblemSubmited] = 1;
                
                uniqueSolveProblemList.add(sub[1]);
            }  
        }
        paylodData.totalSolve = uniqueSolveProblemList.size;

        solveCounts[minYear - 1] = 0;

        while(maxYear < curretYear) {
            maxYear++;
            solveCounts[maxYear] = 0;
        }
        
        for(const key in solveCounts){
            paylodData.eachYearSolveCount.push({key : key , solved : solveCounts[key]});
        }
        
        for(let i = 1 ; i < paylodData.eachYearSolveCount.length ; ++i){
            paylodData.eachYearSolveCount[i].solved += paylodData.eachYearSolveCount[i - 1].solved;
        }

        resolve(paylodData);
    })

}

export const userSubmissionDataDecodeAsTable = ( data ) => {

    return new Promise(resolve => {
        
        const deCodeData = {
            name : data.name,
            uname : data.uname,
            submissions : []
        };

        const problemsList = JSON.parse(localStorage.getItem("problemsList"));
        
        for(const sub of data.subs) {
            let position = findProblemByProblemId(sub[1]);

            const submisson = {
                submissionId : sub[0],
                numberWithName : `${problemsList[position][1]} - ${problemsList[position][2]}`,
                verdict : getVerdict(sub[2]),
                language : getLanguage(sub[5]),
                runtime : (sub[3] / 1000).toFixed(3),
                bestRunTime : (problemsList[position][4] / 1000).toFixed(3),
                rank : sub[6] !== -1 ? sub[6] : '-',
                submissionTime : timeConverter(sub[4])
            }

            deCodeData.submissions.push(submisson);
        }

        deCodeData.submissions.sort((a , b) => {
            if(a.submissionId > b.submissionId) return -1;
            return 1;
        })


        resolve(deCodeData);
    })

} 



export const findProblemByProblemId = (problemId) => {

    const problemsList = JSON.parse(localStorage.getItem("problemsList"));

    let low = 0  , high = problemsList.length , mid = 0;
    
    while(low <= high){

        mid = (low + high) >> 1;

        if(problemsList[mid][0] === problemId) return mid;
        else if(problemsList[mid][0] < problemId)low = mid + 1;
        else high = mid - 1;
    }
    
    return 0;
}

export const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}


export const getLanguage = (languageId) => {

    switch(languageId) {

        case 1: return "ANSI C";  
        case 2: return "Java";
        case 3: return "C++"; 
        case 4: return "Pascal"; 
        case 5: return "C++11"; 
        case 6: return "Python"; 
        default : return "--------"; 
    }
}


export const timeConverter = (timestamp) => {
        
    let a = new Date(timestamp * 1000);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time = year + '-' + month + '-' + date + ' ' + hour + ':' + min + ':' + sec ;
    
    return time;
};


export const getVerdict = (verdictId) => {

    switch(verdictId) {

        case 10: return "Submission error";  
        case 15: return "Can't be judged";
        case 0: return "In queue"; 
        case 30: return "Compile error"; 
        case 35: return "Restricted function"; 
        case 40: return "Runtime error"; 
        case 45: return "Output limit"; 
        case 50: return "Time limit"; 
        case 60: return "Memory limit"; 
        case 70: return "Wrong answer"; 
        case 80: return "PresentationE"; 
        case 90: return "Accepted"; 
        default : return "--------"; 
    }

};
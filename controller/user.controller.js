const {
    connect
} = require('../config/db.config');
const csv = require('csvtojson');


class UsersController {
    db = {}
    ageDistribution={'20':0,'40':0,'60':0,'70':0}
    constructor() {
        this.db = connect();

    }

    createUser = async (user) => {
        let data = {};
        try {
            console.log(user)
            data = await this.db.users.create(user)
        } catch (err) {
            console.error('Error::' + err);
        }
        // return data;
    }


    convertCSV = (req, res) => {
        console.log('hello')
        let csvFilePath = process.env.CSVPATH;

        console.log('csvFilePath', csvFilePath)
        csv()
            .fromFile(csvFilePath)
            .then(jsonObj => {
                JSON.stringify(jsonObj);
                jsonObj.map(user => {
                    
                    user.name=user.name.firstName+" "+user.name.lastName;
                    user.additional_info={gender:user.gender};
                    this.createUser(user)
                })

            })
        res.send(200);
    }
    getUser=async(req,res)=>{
        try{
            const totalRecord=await this.db.users.count();
            const ageWiseRecord=await this.db.users.count({group:['age']});
           console.log(ageWiseRecord)
           ageWiseRecord.forEach(data=>{
            this.calculateAge(parseInt(totalRecord),(data));
            console.log(this.ageDistribution)
           })

           
        }catch(e){
            console.error('Error',e);
        }
        // console.log(this.ageDistribution)
        res.render('index', {title: 'Distribution List',data:this.ageDistribution});
    }
    calculateAge=(total,data)=>{
       console.log(data);
       let age=parseFloat(data.age);
       let count=parseInt(data.count);
       
        switch(true){
            case(age<20):
            console.log('20',age);
              this.ageDistribution['20']=Math.round((count*100)/total);
              break;
            case(age>=20 && age<40):
            console.log('40',age);
            this.ageDistribution['40']=Math.round((count*100)/total);
            break;
            case(age>=40 && age<60):
            console.log('60',age);
            this.ageDistribution['60']=Math.round((count*100)/total);
            break;
            default:
                console.log(age);
            this.ageDistribution['70']=Math.round((count*100)/total);
        }
    }
}
module.exports.uc = new UsersController();
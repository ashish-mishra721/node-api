const mongoose = require('mongoose');

const userSechema =  mongoose.Schema (
    {​​​​​​​​
first_name: {​​​​​​​​
type:String,
required:true
        }​​​​​​​​,
last_name: {​​​​​​​​
type:String,
required:true
        }​​​​​​​​,
email_id:
        {​​​​​​​​
type:String,
require:true
        }​​​​​​​​,
contact_no:
        {​​​​​​​​
type:Number,
require:true
        }​​​​​​​​,
password: {​​​​​​​​
type:String,
require:true
        }​​​​​​​​,
date:{​​​​​​​​
type:Date,
default:Date.now
        }​​​​​​​​
    }​​​​​​​​
)

module.exports = mongoose.model('Users', userSechema);

const mongoose = require('mongoose');

const userSechema =  mongoose.Schema (
    {
        first_name:{
          type: String,
          required: true
        },
        last_name:{
          type: String,
          required: true
        },
        email_id:{
          type: String,
          required: true
        },
        contact_number:{
          type: Number,
          required: true
        },
        password:{
          type: String,
          required: true
        },
        gender:{
          type: String,
          required: true
        },
        date:{
          type:date,
          default:Date.now
        }
      }
)

module.exports = mongoose.model('Users', userSechema);

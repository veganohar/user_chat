const url = 'http://localhost:3000/'
module.exports = {
  secret: "vinayak_chat_db-secret-key",
  mailTransporter:{
    port: 465,              
    host: "smtp.gmail.com",
       auth: {
            user: 'dummym431@gmail.com',
            pass: 'dummymail4321'
         }
    },
    url:url
};
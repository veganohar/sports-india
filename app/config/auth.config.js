const url = "http://localhost:3000"
module.exports = {
  secret: "sportsindia-secret-key",
  mailTransporter:{
    port: 465,              
    host: "smtp.gmail.com",
       auth: {
            user: 'manoharsuthra@gmail.com',
            pass: 'screccse573',
         },
    // secure: true,
    },
    url:url
};
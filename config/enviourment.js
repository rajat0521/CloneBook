const development={
    name:'development',
    asset_path: './assets',
    session_cookie_key:'blahsomething',
    db:'myFirstDatabase',
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'rajatbarwal_2k19pe049@dtu.ac.in',
            pass: '2k19pe049032002'
        }
    },
    google_client_id:"686308977571-rf5j452nvbef3ft4si2b6jej86ubo206.apps.googleusercontent.com",
    google_client_secret:"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",
    google_call_back_url:"http://localhost:8000/users/auth/google/callback",
    jwt_secret:'codeial'
    
}

const production={
    name: process.env.CODEIAL_ENVIOURMENT,
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp:{
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id: process.env.GOOGLE_CLIENT_ID,
    google_client_secret: process.env.GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET
}


module.exports= eval(process.env.CODEIAL_ENVIOURMENT)== undefined ? development : eval(process.env.CODEIAL_ENVIOURMENT);
// module.exports=production;
const {MongoClient} = require('mongodb');

async function main(){
    const url='mongodb+srv://rajat_2103:rajatbarwal@cluster0.gincy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    const client=new MongoClient(url);

    try{
        await client.connect();
    }catch(e){
        console.log(e);
    }finally{
        await client.close();
    }
   
}

main().catch(console.error);
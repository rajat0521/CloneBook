module.exports.mainPage = async function(req, res){
    try{
        return res.render('mainPage', {
            title: "CloneBook"
        });
    }catch(error){
        console.log("Error is : ", error);
        return;
    }
}
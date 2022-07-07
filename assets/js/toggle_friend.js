class ToggleFriend{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.toggleFriend();
    }


    toggleFriend(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            //prevent default i.e. a tag from diong get request
            let self = this;
            console.log('selffffffffff in friend',self);
            // this is a new way of writing ajax which we have studied, it looks like the same as promises
            $.ajax({
                //here we are setting a tag to send post request
                type: 'POST',
                url: $(self).attr('href'),
            })
            //this means if it will successfully complete the post request of a tag then it will run the .done function else will run fail function
            .done(function(data) {
                //if there is already friendship then make it Remove friend else make it add friend
                if (data.data.isFriends == false){
                    $(self).text(`Add Friend`);
                    
                }else{
                    $(self).text(`Remove Friend`);
                }    

            })
            .fail(function(errData) {
                console.log('error in completing the request',errData);
            });
        
        });
    }
}


function toggleButtonFunction(){
    var x = document.getElementById("toggle-friend-button");
    if (x.innerHTML === "Remove Friend") {
        x.innerHTML = "Add Friend";
      } 
}
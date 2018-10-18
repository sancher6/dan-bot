$(document).ready(function(){
    const Url = 'https://cat-fact.herokuapp.com/facts';
    $('.btn').click(function(){
        $.ajax({
            url: Url, 
            type:"GET", 
            success: function(result){
                console.log(result)
            },
            error:function(error){
                console.log(`Error ${error}`)
            }
        })
    })
})
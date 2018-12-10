// Show comment box when "write review" button clicked
var xxx = 0;
$('#add-comment').on('click', function () {
    $("#add-comment-box").slideDown("slow");
    $('#add-comment').fadeOut();
})

$('#add-comment-box form div i').mouseover((e) => {
    reflashRate($(e.currentTarget).attr('id'));
})
$('#add-comment-box form div i').mouseout((e) => {
    console.log(xxx);
    reflashRate(xxx);
})
$('#add-comment-box form div i').on('click', (e) => {
    xxx = $(e.currentTarget).attr('id');
})

$('#heart').on('click', (e) => {
    changeBookMark();
})

function changeBookMark(){
    
}

function reflashRate(rate){
    for (var i = 1; i <= rate ; i++) {
        $(`#add-comment-box form div i#${i}`).removeClass( "far fa-star" );
        $(`#add-comment-box form div i#${i}`).removeClass( "fas fa-star" );
        $(`#add-comment-box form div i#${i}`).addClass( "fas fa-star" );
    }
    for (var x = 5; x > rate ; x--) {
        $(`#add-comment-box form div i#${x}`).removeClass( "far fa-star" );
        $(`#add-comment-box form div i#${x}`).removeClass( "fas fa-star" );
        $(`#add-comment-box form div i#${x}`).addClass( "far fa-star" );
    }
}








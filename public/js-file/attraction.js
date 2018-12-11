
// set comment box have 1 rate(star) when page loaded
var rates = 1;
$(() => {
    reflashRate(rates);
})


// Show comment box when "write review" button clicked
$('#add-comment').on('click', function () {
    $("#add-comment-box").slideDown("slow");
    $('#add-comment').fadeOut();
})

// reflashRate in mouse event on star in comment box
$('#add-comment-box form div i').mouseover((e) => {
    reflashRate($(e.currentTarget).attr('id'));
})
$('#add-comment-box form div i').mouseout((e) => {
    reflashRate(rates);
})
$('#add-comment-box form div i').on('click', (e) => {
    rates = $(e.currentTarget).attr('id');
})



$('#heart').on('click', (e) => {
    changeBookMark();
})

function changeBookMark() {

}

function reflashRate(rate) {
    $("#rate").html(rate);
    for (var i = 1; i <= rate; i++) {
        $(`#add-comment-box form div i#${i}`).removeClass("far fa-star");
        $(`#add-comment-box form div i#${i}`).removeClass("fas fa-star");
        $(`#add-comment-box form div i#${i}`).addClass("fas fa-star");
    }
    for (var x = 5; x > rate; x--) {
        $(`#add-comment-box form div i#${x}`).removeClass("far fa-star");
        $(`#add-comment-box form div i#${x}`).removeClass("fas fa-star");
        $(`#add-comment-box form div i#${x}`).addClass("far fa-star");
    }
}
// google map function seting(require)









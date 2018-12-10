// Show comment box when "write review" button clicked
var rates = 1;
$(() => {
    reflashRate(rates);
})



$('#add-comment').on('click', function () {
    $("#add-comment-box").slideDown("slow");
    $('#add-comment').fadeOut();
})

$('#add-comment-box form div i').mouseover((e) => {
    reflashRate($(e.currentTarget).attr('id'));
})
$('#add-comment-box form div i').mouseout((e) => {
    //console.log(rates);
    reflashRate(rates);
})
$('#add-comment-box form div i').on('click', (e) => {
    rates = $(e.currentTarget).attr('id');
})

$('#heart').on('click', (e) => {
    changeBookMark();
})

$('#addComment').on('click', (e) => {
    changeBookMark();
})
$("#submit-comment").on('click', (e) => {

});

// $("addComment").submit(function (e) {
//     e.preventDefault();
//     $("#rate").val(rates);
//     console.log($("#rate").attr("value"));
//     this.submit();
// })

function changeBookMark() {

}

function returnRate() {
    $(`#add-comment-box form div i#${i}`) = rates;
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








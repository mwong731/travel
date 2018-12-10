// Show comment box when "write review" button clicked
$('#add-comment').on('click', function () {
    $("#add-comment-box").slideDown("slow");
    $('#add-comment').fadeOut();
})

$('#add-comment-box form div i').mouseover((e) => {
    for (let i = 1; i >=0 ; i++) {
        $(`#add-comment-box form div i#`)
    }
    $(e.currentTarget).attr('id');

})
$('#add-comment-box form div i').mouseout((e) => {
    alert("mouseout");
})
$('#add-comment-box form div i').on('click', (e) => {

})








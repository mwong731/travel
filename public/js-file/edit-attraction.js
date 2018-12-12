$(document).on('change', '#edit-attraction-photo', function(e){
    $(e.target).parent().find("img").attr("src", URL.createObjectURL(e.target.files[0]));
});

$(document).on('click', '#add-image', function(e){
    $('#photo-upload-form').append(attraction("", ""));
});

const attraction = (src, id) => {
    return `
    <div id="edit-form-right">
        <img class="d-block carousel-image" src=${window.location.origin}${src}>
        <input type="file" class="form-control-file" id="edit-attraction-photo">
        <button class="btn-lg btn-primary" id="delete-attraction" onClick="">Delete <i class="fas fa-paper-plane"></i></button>
    </div>`
}




$(() => {

    $.get(`/api/attraction-image/1`).then((data) => {
        data.forEach((value, index) => {
            $('#photo-upload-form').append(attraction(value.image, value.id));
        });
    });

    const attraction = (src, id) => {
        return `
        <div id="edit-form-right">
            <img class="d-block carousel-image" src=${window.location.origin}${src}>
            <input type="file" data-xxx="" class="form-control-file" id="edit-attraction-photo">
            <button class="btn-lg btn-primary" id="submit-attraction" onClick="">Delete <i class="fas fa-paper-plane"></i></button>
        </div>`
    }
})

$(".form-control-file").change((e) => {
    console.log($(e.target).parent().find("img").attr("src", URL.createObjectURL(e.target.files[0])));
})


var formArray = {
    updateData: {}, 
    deleteImage: [], 
    insertImage: []
}
var addImageDivIndex = 1;



// add new image in new btn 
$(document).on('click', '#add-image', function (e) {
    $('#edit-form-right').append(newAttraction(addImageDivIndex));
    addImageDivIndex++;
});

// click delete btn in old attraction div
$(document).on('click', '#delete-old-attraction', function (e) {
    //need modify when melody finish her work
    if ($(e.target).parent().find("button#delete-old-attraction").html() == 'Save') {
        $(e.target).parent().find("button#delete-old-attraction").html('Delete');
        //formArray.deleteImage.push()
    } else {
        $(e.target).parent().find("button#delete-old-attraction").html('Save');
        //
    }

});

// handle event in current attraction field (image not include)
$(document).on('change', '#edit-attraction-city', function (e) {
    formArray.updateData.cityid = $(e.target).val();
});

$(document).on('change', '#edit-attraction-type', function (e) {
    formArray.updateData.type = $(e.target).val();
});

$(document).on('change', '#edit-attraction-name', function (e) {
    formArray.updateData.name = $(e.target).val();
});

$(document).on('change', '#edit-attraction-description', function (e) {
    formArray.updateData.description = $(e.target).val();
});

$(document).on('change', '#edit-attraction-latitude', function (e) {
    formArray.updateData.latitude = $(e.target).val();
});

$(document).on('change', '#edit-attraction-longitude', function (e) {
    formArray.updateData.longitude = $(e.target).val();
});

/* handle event in add new attraction image div */
$(document).on('change', '#add-attraction-photo-input', function (e) {
    formArray.insertImage.push($(e.target).data("id"));
    var parentTarget = $(e.target).parent();
    if (e.target.files[0]) {
        parentTarget.find("img").attr("src", URL.createObjectURL(e.target.files[0]));
        parentTarget.find("input#isChange").val("true");
    } else {
        parentTarget.find("img").attr("src", parentTarget.find(".currentImg").val());
        parentTarget.find("input#isChange").val("false");
    }
});
// image clicked in add new attraction img
$(document).on('click', '#add-attraction-photo', function (e) {
    $(e.target).parent().find("input#add-attraction-photo-input").click();
});
// button clicked in delete new attraction button
$(document).on('click', '#delete-new-attraction', function (e) {
    $(e.target).parent().remove();
});





const attraction = (value) => {
    return `
    <div id="attraction-photo-div">
        <img id=${value.id} class="d-block carousel-image" src=${window.location.origin}${value.image}>
        <button class="btn-lg btn-primary" id="delete-old-attraction" onClick="">Delete</button>
        <input id="isChange" style="display:none" value="false">
        <input class="defauleImg" style="display:none" value=${window.location.origin}${value.image}>
    </div>
    `
}

const newAttraction = (id) => {
    return `
    <div id="new-attraction-photo-div">
        <img class="d-block carousel-image" id="add-attraction-photo" src="/assets/male-profile.png">
        <input data-id="${id}" style="display:none" type="file" class="form-control-file" id="add-attraction-photo-input">
        <button class="btn-lg btn-primary" id="delete-new-attraction" >X</button> 
        <input id="isChange" style="display:none" value="false">
        <input class="currentImg" style="display:none">
        </div>
    `
}






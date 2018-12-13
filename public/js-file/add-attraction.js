var formArray = {
    insertImage: []
}
var addImageDivIndex = 1;

// add new image in new btn 
$(document).on('click', '#add-image', function (e) {
    $('#add-form-right').append(newAttraction(addImageDivIndex));
    addImageDivIndex++;
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
    //console.log(formArray.insertImage.length);
    var parentTarget = $(e.target).parent();
    if (e.target.files[0]) {
        parentTarget.find("img").attr("src", URL.createObjectURL(e.target.files[0]));
        parentTarget.find("input#isChange").val("true");
        // insert image into array
        insertImageInFormArray($(e.target).data("id"), e.target.files[0]);
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
    // console.log($(e.target).parent().find("#add-attraction-photo-input").data("id"));
    deleteImageInFormArray($(e.target).parent().find("#add-attraction-photo-input").data("id"));
    $(e.target).parent().remove();
});
// Submit btn
$(document).on('click', '#submit-attraction', function (e) {
    // console.log($(e.target).parent().find("#add-attraction-photo-input").data("id"));
    addAttraction();
    //window.location.replace("http://stackoverflow.com");
});

//delete image in formArray.insertImage
function deleteImageInFormArray(id) {
    if (formArray.insertImage.length > 0) {
        for (let i = 0; i < formArray.insertImage.length; i++) {
            if (formArray.insertImage[i].id == id) {
                console.log("delete have record in formArray");
                formArray.insertImage.splice(i, 1);
                break;
            }
        }
    }
}
//add image in formArray.insertImage
function insertImageInFormArray(id, file) {
    if (formArray.insertImage.length > 0) {
        let haveRecord = false;
        for (let i = 0; i < formArray.insertImage.length; i++) {
            if (formArray.insertImage[i].id == id) {
                console.log("have record in formArray");
                formArray.insertImage[i].file = file;
                break;
            } else if ((i == formArray.insertImage.length - 1) && (haveRecord == false)) {
                console.log("no record in formArray");
                formArray.insertImage.push({ id: id, file: file });
                break;
            }
        }
    } else {
        console.log("array is empty");
        formArray.insertImage.push({ id: id, file: file });
    }
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






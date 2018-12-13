var formArray = {
    updateData: {},
    deleteImage: [],
    insertImage: []
}
var addImageDivIndex = 1;

// add new image in new btn 
$(document).on('click', '#add-image', function (e) {
    $('#add-form-right').append(newAttraction(addImageDivIndex));
    addImageDivIndex++;
});

// click delete btn in old attraction div
$(document).on('click', '#delete-old-attraction', function (e) {
    //console.log('xxxxx');
    //need modify when melody finish her work
    if ($(e.target).parent().find("#delete-old-attraction").html() == 'Delete') {
        //console.log('xxxxxDelete');
        $(e.target).parent().find("#delete-old-attraction").html('Undo');
        //console.log($(e.target).parent().find("img").attr("id"));
        insertFormArrayDeleteImage($(e.target).parent().find("img").attr("id"));
        //formArray.deleteImage.push($(e.target).parent().find("img").attr("id"));
    } else if($(e.target).parent().find("#delete-old-attraction").html() == 'Undo') {
        //console.log('xxxxxUndo');
        $(e.target).parent().find("#delete-old-attraction").html('Delete');
        deleteFormArrayDeleteImage($(e.target).parent().find("img").attr("id"));
        //formArray.deleteImage.push($(e.target).parent().find("img").attr("id"));
    }
});
// delete image id that will be delete in formArray.deleteImage
function deleteFormArrayDeleteImage(id){
    for (let i = 0; i < formArray.deleteImage.length; i++) {
        if (formArray.deleteImage[i].id == id) {
            console.log("delete: have record in formArray");
            formArray.deleteImage.splice(i, 1);
            break;
        } else if ((i == formArray.deleteImage.length - 1) && (haveRecord == false)) {
            console.log("delete: no record in formArray");
            break;
        }
    }
}

// add image id that will be delete in formArray.deleteImage
function insertFormArrayDeleteImage(id){
    // modifying
    if (formArray.deleteImage.length > 0) {
        let haveRecord = false;
        for (let i = 0; i < formArray.deleteImage.length; i++) {
            if (formArray.deleteImage[i].id == id) {
                console.log("delete: have record in formArray");
                break;
            } else if ((i == formArray.deleteImage.length - 1) && (haveRecord == false)) {
                console.log("delete: no record in formArray");
                formArray.deleteImage.push({ id: id});
                break;
            }
        }
    } else {
        console.log("delete: array is empty");
        formArray.deleteImage.push({ id: id });
    }
}

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
        // insert image into array
        insertImageInFormArray($(e.target).data("id"), e.target.files[0]);
    } else {
        parentTarget.find("img").attr("src", parentTarget.find(".currentImg").val());
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
    updateAttraction();
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






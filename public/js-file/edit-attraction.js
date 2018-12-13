var formArray = {
    updateData: {},
    deleteImage: [],
    insertImage: []
}
var addImageDivIndex = 1;

// add new image in new btn 
$(document).on('click', '#add-image', function (e) {
    $('#edit-form-right').append(newAttraction(addImageDivIndex));
    $(`#add-attraction-photo-input${addImageDivIndex}`).click();
    addImageDivIndex++;
});

// click delete btn in old attraction div
$(document).on('click', '.delete-old-attraction', function (e) {
    //console.log('xxxxx');
    //need modify when melody finish her work
    let img_id=$(e.target).parent().find("img").attr("id")
    console.log("img",img_id);

    insertFormArrayDeleteImage($(e.target).parent().find("img").attr("id"));
    $(`#attraction-photo-div${img_id}`).slideUp()



    /*if ($(e.target).parent().find("#delete-old-attraction").html() == 'Delete') {
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
        
    }*/
});
// delete image id that will be delete in formArray.deleteImage
function deleteFormArrayDeleteImage(id){
    for (let i = 0; i < formArray.deleteImage.length; i++) {
        if (formArray.deleteImage[i].id == id) {
            console.log("delete: have record in formArray");
            formArray.deleteImage.splice(i, 1);
            break;
        } else if ((i == formArray.deleteImage.length - 1) && (haveRecord == false)) {
            console.log("delete: no record in formArray", formArray);
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
                console.log("delete: no record in formArray", formArray);
                formArray.deleteImage.push({ id: id});
                break;
            }
        }
    } else {
        console.log("delete: array is empty", formArray);
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
$(document).on('change', '.upload-new-image', function (e) {
    //console.log(formArray.insertImage.length);
    var parentTarget = $(e.target).parent();
    if (e.target.files[0]) {
        let url=URL.createObjectURL(e.target.files[0]);
        parentTarget.append(`<img class="edit-upload-image img-fluid" src="${url}"/> <i class="fas fa-times delete-new-attraction edit-remove-button" ></i>`);
        //parentTarget.find("img").attr("src", URL.createObjectURL(e.target.files[0]));
        parentTarget.find("input#isChange").val("true");
        // insert image into array
        insertImageInFormArray($(e.target).data("id"), e.target.files[0]);
        console.log("112",formArray)
    } else {
        parentTarget.find("img").attr("src", parentTarget.find(".currentImg").val());
    }
});
// image clicked in add new attraction img
// $(document).on('click', '#add-image', function (e) {
//     $(e.target).parent().find(`#add-attraction-photo-input${addImageDivIndex}`).click();
// });
// button clicked in delete new attraction button
$(document).on('click', '.delete-new-attraction', function (e) {
    // console.log($(e.target).parent().find("#add-attraction-photo-input").data("id"));
    var parentTarget = $(e.target).parent();
    console.log( parentTarget.find(".form-control-file").attr('data-id'))
    deleteImageInFormArray(parentTarget.find(".form-control-file").attr('data-id'));
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
    <div id="attraction-photo-div${value.id}" class="col-6">
        <img id=${value.id} class="edit-upload-image img-fluid " src=${window.location.origin}${value.image}>
        <i class="fas fa-times delete-old-attraction edit-remove-button" ></i>
        <input id="isChange" style="display:none" value="false">
        <input class="defauleImg" style="display:none" value=${window.location.origin}${value.image}>
    </div>
    `
}

const newAttraction = (id) => {
    return `
    <div id="new-attraction-photo-div" class="col-6">
        <input data-id="${id}"  style="display:none" type="file" class="form-control-file upload-new-image" id="add-attraction-photo-input${id}">
        <input id="isChange" style="display:none" value="false">
        <input class="currentImg" style="display:none">
        </div>
    `
}






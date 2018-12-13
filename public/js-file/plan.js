let dayAndTime = '';
let attractionId = 0;
let attractionIcon = '';
let attractionName = '';
let currentAttraction = {};
let attractionArr = [];

$('#plan-day-number').change(function () {
    $('#plan-box').html('');
    if ($('#plan-day-number').val() != 'notChosen') {
        let days = $('#plan-day-number').val();
        for (var i = 0; i < days; i++) {
            $('#plan-box').append(
                `<div class='day-box'> 
                    <h5>Day ${i + 1}</h5>
                    <div class="plan-line-grey"></div>
                    <div class="row">
                        <div class="col-md-6 day-col"> 
                             <div class="day-night" ><i class="fas fa-sun"></i> Day</div> 
                             <div id="attraction-container-d-${i + 1}" class="row no-gutters plan-inside-row">  </div>
                             <button class="btn plan-button add-attraction" id="d-${i + 1}" onClick="getDayAndTime(this.id)"data-toggle="modal" data-target="#attractionModal"> Add attraction </button>
                        </div>
                        <div class="col-md-6">
                             <div class="day-night" ><i class="fas fa-moon"></i> Night</div>
                             <div id="attraction-container-n-${i + 1}" class="row no-gutters plan-inside-row"> </div>
                             <button class="btn plan-button add-attraction" id="n-${i + 1}" onClick="getDayAndTime(this.id)"data-toggle="modal" data-target="#attractionModal"> Add attraction </button>
                        </div>
                    <div>    
                </div>
            </div>`
            )
        }
    }
})

function getAttraction(cityName) {
    $.get(`/api/city/${cityName}`, function () { })
        .done(function (data) {
            //console.log(data)
            for (var i = 0; i < data.length; i++) {
                $('#plan-attraction').append(`
            <div class="col-4 img-col"><img class="plan-img" src="${data[i].icon}" id="image${data[i].id}" onClick="getAttractionId(${data[i].id},'${data[i].name}','${data[i].icon}')"/>
                <div class="plan-overlay">
                    <div class="profile-attraction-name">${data[i].name}</div>
                </div>
            </div>
            `)
            }
            //appendAttraction(data);
        })
        .fail(function () {
            console.log("Cannot get attraction");
        })
}

function getDayAndTime(id) {
    $('#plan-attraction-city').val('notChosen')
    dayAndTime = id;
}

function getAttractionId(id, name, iconURL) {
    $('.plan-img').css('border', '')
    $(`#image${id}`).css('border', '2px solid red')
    attractionId = id;
    attractionName = name
    attractionIcon = iconURL;
}

function saveAttraction() {
    if (attractionId == 0) {
        alert("You need to choose one attraction to add");
    } else {
        currentAttraction.attractionId = attractionId;
        currentAttraction.day = dayAndTime.split('-')[1];
        if (dayAndTime.split('-')[0] == 'n') {
            currentAttraction.time = 'night'
        } else {
            currentAttraction.time = 'day'
        };
        currentAttraction.id = dayAndTime + '-' + attractionId;

        console.log(currentAttraction.id);

        if (attractionArr.some(e => {
            /*return e.attractionId == currentAttraction.attractionId && e.day == currentAttraction.day && e.time == currentAttraction.time*/
            return e.id == currentAttraction.id
        })) {
            alert('This attraction is already added.')
        } else {

            $('#attraction-container-' + dayAndTime).append(`
        <div id="attraction-${dayAndTime}-${attractionId}"class="col-4 img-col"><img class="plan-img" src="${attractionIcon}"/>
            <div class="plan-overlay">
                <div class="profile-attraction-name">${attractionName}</div>
            </div>
            <div id="remove-${dayAndTime}-${attractionId}" class="remove-button" onClick='remove(this.id)'>
                    <div class="remove-symbol"><i class="fas fa-times"></i></div>
                </div>
        </div>
        `)

            attractionArr.push(currentAttraction);
            console.log(attractionArr);
            currentAttraction = {};
            attractionId = 0;
            attractionIcon = '';
            attractionName = '';
        }
    }

}

function submit() {
    alert("Your plan has been saved.");
    axios({
        method: 'post',
        url: '/plan',
        data: { planname: $('#planname').val(),plandays:$('#plan-day-number').val(), attractionArr: attractionArr }
    }).then(function (message) {
        console.log(message);
        window.location.replace(window.location.origin + '/profile');

    })
}

function remove(buttonId) {

    let id = buttonId.split('-').slice(1).join('-')
    console.log('remove-' + id);
    $('#attraction-' + id).remove();

    let pos = attractionArr.map(function (e) { return e.id; }).indexOf(id);
    if (pos > -1) {
        attractionArr.splice(pos, 1);
    }

    console.log(attractionArr);

}

$('#plan-attraction-city').change(function () {
    $('#plan-attraction').html('');
    if ($('#plan-attraction-city').val() != 'notChosen') {
        let cityName = $('#plan-attraction-city').val();
        getAttraction(cityName);
    }
})

$(document).on('hidden.bs.modal', function () {
    $('#plan-attraction').html('');
    attractionId = 0;
    attractionName = '';
    attractionIcon = '';
    dayAndTime = '';
    console.log(attractionId, attractionName, attractionIcon, dayAndTime);
})

$('#plan-day-number').val('notChosen')
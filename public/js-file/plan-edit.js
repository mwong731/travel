let data = [];
let attractionArr = [];
let dayAndTime = '';
let attractionId = 0;
let attractionIcon = '';
let attractionName = '';
let currentAttraction = {};

data = JSON.parse($('#data').html());
attractionArr = data[0];

attractionArr.forEach((e) => {
    e.divId = e.time + '-' + e.day + '-' + e.attractionid;
})



attractionArr.forEach((e) => {
    
    let id = e.attractionid;
    let day = e.day;
    let time = e.time;
    getAttraction(id, time, day);
})

function constructFrame() {
    let days = data[1][0].days;
    for (var i = 0; i < days; i++) {
        $('#plan-box').append(
            `<div class='day-box'> 
                <h5>Day ${i + 1}</h5>
                <div class="plan-line-grey"></div>
                <div class="row">
                    <div class="col-md-6 day-col"> 
                         <div class="day-night" ><i class="fas fa-sun"></i> Day</div> 
                         <div id="attraction-container-day-${i + 1}" class="row no-gutters plan-inside-row">  </div>
                         <button class="btn plan-button add-attraction" id="day-${i + 1}" onClick="getDayAndTime(this.id)"data-toggle="modal" data-target="#attractionModal"> Add attraction </button>
                    </div>
                    <div class="col-md-6">
                         <div class="day-night" ><i class="fas fa-moon"></i> Night</div>
                         <div id="attraction-container-night-${i + 1}" class="row no-gutters plan-inside-row"> </div>
                         <button class="btn plan-button add-attraction" id="night-${i + 1}" onClick="getDayAndTime(this.id)"data-toggle="modal" data-target="#attractionModal"> Add attraction </button>
                    </div>
                <div>    
            </div>
        </div>`
        )
    }

}

$(constructFrame());

function getAttraction(id, time, day) {
    $.get('/api/attraction/' + id)
        .done(function (data) {
            
            let attractionData = data[0][0];
            $('#attraction-container-' + time + '-' + day).append(`
        <div id="attraction-${time}-${day}-${id}" class="col-6 col-md-4 img-col">
            <img class="plan-added-img" src="${attractionData.icon}" id="image${attractionData.id}" />
            <div class="plan-overlay">
                <div class="profile-attraction-name">${attractionData.name}</div>
            </div>
            <div id="remove-${time}-${day}-${id}" class="remove-button" onClick='remove(this.id)'>
                <div class="remove-symbol"><i class="fas fa-times"></i></div>
            </div>
        </div>
            `)
        })
        .fail(function () {
            console.log("Cannot get attraction");
        })
}

function getAttractionOption(cityName) {
    $.get(`/api/city/${cityName}`, function () { })
        .done(function (data) {
           
            for (var i = 0; i < data.length; i++) {
                $('#plan-attraction').append(`
        <div class="col-4 img-col"><img class="plan-img" src="${data[i].icon}" id="image${data[i].id}" onClick="getAttractionId(${data[i].id},'${data[i].name}','${data[i].icon}')"/>
            <div class="plan-overlay">
                <div class="profile-attraction-name">${data[i].name}</div>
            </div>
        </div>
        `)
            }
        })
        .fail(function () {
            console.log("Cannot get attraction");
        })
}

$('#plan-attraction-city').change(function () {
    $('#plan-attraction').html('');
    if ($('#plan-attraction-city').val() != 'notChosen') {
        let cityName = $('#plan-attraction-city').val();
        getAttractionOption(cityName);
    }
})

function submit() {
    alert("Your plan has been saved.");
    axios({
        method: 'post',
        url: '/plan/'+ window.location.href.split('/')[4],
        data: {attractionArr: attractionArr }
    }).then(function (message) {
        console.log(message);
        window.location.replace(window.location.origin + '/profile');

    })
}

function remove(buttonId) {
    let id = buttonId.split('-').slice(1).join('-')
    

    let pos = attractionArr.map(function (e) { return e.divId; }).indexOf(id);
    if (pos > -1) {
        attractionArr.splice(pos, 1);
    }

   
    $('#attraction-' + id).remove();
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
        currentAttraction.attractionid = attractionId;
        currentAttraction.day = dayAndTime.split('-')[1];
        currentAttraction.time = dayAndTime.split('-')[0];
        currentAttraction.divId = dayAndTime + '-' + attractionId;

        if (attractionArr.some(e => {
            return e.divId == currentAttraction.divId
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
            currentAttraction = {};
            attractionId = 0;
            attractionIcon = '';
            attractionName = '';
        }
    }

}

$(document).on('hidden.bs.modal', function () {
    $('#plan-attraction').html('');
    attractionId = 0;
    attractionName = '';
    attractionIcon = '';
    dayAndTime = '';
    
})


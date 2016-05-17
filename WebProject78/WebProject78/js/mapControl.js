var img = $('#room1');

var selectedSeat = [null, null];

var arraySeats = {};

// rendering options for the 1st selection state
var selected1opts = {
        fillColor: '00ff00',
        stroke: true,
        strokeColor: '000000',
        strokeWidth: 2
};

// rendering options for the 2nd selection state
var selected2opts = {
        fillColor: 'ff0000',
        stroke: true,
        strokeColor: '00ff00',
        strokeWidth: 1
};

//Array for easy access to the rendering options
var renderOpts = [selected1opts, selected2opts];

var captions = {
    1: ['Seat number 1'],
    2: ['Seat number 2'],
    3: ['Seat number 3'],
    4: ['Seat number 4'],
    5: ['Seat number 5'],
    6: ['Seat number 6'],
    7: ['Seat number 7'],
    8: ['Seat number 8'],
    9: ['Seat number 9'],
    10: ['Seat number 10'],
    11: ['Seat number 11'],
    12: ['Seat number 12'],
    13: ['Seat number 13'],
    14: ['Seat number 14']
}

img.mapster({
    mapKey: 'seat',
    //mapValue: 'state',
    isSelectable: false,

    onGetList: getSeatList,

    onClick: onSeatClick

    /*onClick: function(data) {
        $('#seatText').text(captions[data['key']]);
    },
    render_highlight: { fillColor: '000000', fade: false }*/
    /*onMouseover: function (data) {
        $('#seatText').text(captions[data['key']]);
    },*/
    /*onMouseout: function (data) {
        $('#seatText').text('');
    }*/
});

function getSeatList(data) {
    for (var i = 0; i < data.length; i++) {
        //arraySeats[data.key] = data.value;
        arraySeats[data.key] = 0;
    }
}

function onSeatClick(data) {
    /**
     * 1. Set previous selected to it's main status
     * 2. Store the currently selected seat and it's main status.
     * 3. Update the appearance of the selected seat.
     */

    if (selectedSeat[1] != null) {
        img.mapster('set', false, selectedSeat[0], renderOpts[selectedSeat[1]]);
    }

    selectedSeat[0] = data.key;
    selectedSeat[1] = data.value;
    
    img.mapster('set', true, data.key, renderOpts[1]);
    /*if (selectedSeat[1] != 0) {
        img.mapster('set', true, selectedSeat[0], renderOpts[selectedSeat[1]]);
    }*/

    if (selectedSeat[1] != null) {
        // now set the area state using the correct options
        img.mapster('set', true, data.key, selectedSeat[1]);
    }
}

function reserveSeat() {
    var selectedSeat = img.mapster('get');

    img.mapster('set_options', {
        areas: [
            {
                key: selectedSeat,
                staticState: true,
                fillColor: 'ff000c'
            }
        ]
    });

    document.getElementById('seatText').innerHTML = "Reserved seat: " + selectedSeat;
}

//Method for checking seats every 10 seconds.
//setInterval(checkAllSeatStatus, 10000);

function checkAllSeatStatus() {
    //TODO: Get all visible seats and use checkSeatStatus on them.
    alert("Checking seats!");
}

function checkSeatStatus(keySeat) {
    //TODO: Add a method to check the seat in the database and update it if it changed.
}
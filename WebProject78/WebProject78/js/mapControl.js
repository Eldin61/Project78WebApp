var img = $('#room1');

//stores the key and state of the selected seat.
var selectedSeat = [null, null];

//stores the state of a seat to the seats key. Like a map.
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

// rendering options for the selected selection state
var selectedopts = {
    stroke: true,
    strokeColor: 'ff69b4',
    strokeWidth: 1
};

//Array for easy access to the rendering options. More can be added.
//0 is selected, 1 is free & 2 is reserved.
var renderOpts = [selectedopts, selected1opts, selected2opts];

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

//
/*for (var i = 1; i <= 14; i++) {
    arraySeats[i] = Math.round(Math.random()) + 1;
    console.log("Setup seat #" + i + " " + arraySeats[i]);
    img.mapster("set", true, i, renderOpts[arraySeats[i]]);
}*/

img.mapster({
    mapKey: 'seat',
    mapValue: 'seatState',
    isSelectable: false,

    //When the map is finished setting up this function is called to give all the seats a random state
    //TODO: Automatically goes through all the seats and grabs the state from the DB.
    //TODO: Update the seat image to the correct status.
    onConfigured: function () {
        for (var i = 1; i <= 14; i++) {
            var id = Math.round(Math.random()) + 1;
            arraySeats[i] = id;
            console.log("Setup seaty id:" + id + " #" + i + " " + arraySeats[i]);
            //img.mapster("set", true, arraySeats[i], renderOpts[arraySeats[i]]);
        }
    },
    
    onClick: onSeatClick
});

for (var i = 1; i <= 14; i++) {
    console.log("Setup seator #" + i + " " + arraySeats[i]);
    img.mapster("set", true, arraySeats[i], renderOpts[arraySeats[i]]);
}

function onSeatClick(data) {
    // 1. Set previous selected to it's main status
    if (selectedSeat[0] != null) {
        img.mapster("set", false, selectedSeat[0]);
        if (selectedSeat[1] != null) {
            img.mapster("set", true, selectedSeat[0], renderOpts[selectedSeat[1]]);
        }
    }

    // 2. Store the currently selected seat and it's main status.
    selectedSeat[0] = data.key;
    selectedSeat[1] = arraySeats[selectedSeat[0]] || null;

    console.log("Selected seat: " + selectedSeat[0] + ", state: " + selectedSeat[1]);

    // 3. Update the appearance of the selected seat.
    img.mapster('set', false, selectedSeat[0], renderOpts[selectedSeat[1]]);
    img.mapster('set', true, selectedSeat[0], renderOpts[0]);
}

function reserveSeat() {
    if (selectedSeat[0] == null) {
        return false;
    }
    //var selectedSeat = img.mapster('get');
    img.mapster("set", false, selectedSeat[0]);

    /*img.mapster('set_options', {
        areas: [
            {
                key: selectedSeat[0],
                options: renderOpts[2]
                //staticState: true,
                //fillColor: 'ff000c'
            }
        ]
    });*/

    //TODO: Update change to DB.
    arraySeats[selectedSeat[0]] = 2;

    //updates changes to selectedSeat
    selectedSeat[1] = 2;

    console.log(selectedSeat);

    //TODO: Maybe Deselect the seat.

    img.mapster('set', true, selectedSeat[0], renderOpts[selectedSeat[1]]);

    document.getElementById('seatText').innerHTML = "Reserved seat: " + selectedSeat[0];
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
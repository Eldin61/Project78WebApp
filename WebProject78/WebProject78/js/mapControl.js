var img = $('#room1');

function Seat(number, state) {
    this.number = number;
    //may only be "free", "reserved", "taken"
    this.state = state;
    this.userID = null;
}

Seat.prototype.getStateNr = function () {
    console.log(this);
    if (this.state === "free")
        return 1;
    else if (this.state === "reserved")
        return 2;
    else if (this.state === "taken")
        return 3;
    else 
        return 0;
}

//stores the key, state and occupant of the selected seat.
var selectedSeat = new Seat();

//stores the state of a seat to the seats key. Like a map.
var arraySeats = {};

// rendering options for the selected selection state
var selectedopts = {
    stroke: true,
    strokeColor: 'ff69b4',
    strokeWidth: 1
};

// rendering options for the free state
var freeopts = {
    fillColor: '00ff00',
    stroke: true,
    strokeColor: '000000',
    strokeWidth: 2
};

// rendering options for the reserved state
var reservedopts = {
    fillColor: 'ffa500',
    stroke: true,
    strokeColor: '00ff00',
    strokeWidth: 1
};

// rendering options for the taken state
var takenopts = {
    fillColor: 'ff0000',
    stroke: true,
    strokeColor: 'ff0000',
    strokeWidth: 1
};

//Array for easy access to the rendering options. More can be added.
//0 is selected, 1 is free & 2 is reserved.
var renderOpts = [selectedopts, freeopts, reservedopts, takenopts];

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
    //mapValue: 'seatState',
    isSelectable: false,
    highlight: false,
    showToolTip: true,
    sortList: true,

    //When the map is finished setting up this function is called to give all the seats a random state
    //TODO: Automatically goes through all the seats and grabs the state from the DB.
    onConfigured: function () {
        for (var i = 1; i <= 14; i++) {
            var id = Math.round(Math.random()) + 1;
            arraySeats[i] = new Seat(i, "taken");
            console.log("Setup seat id:" + i + " status:" + arraySeats[i].getStateNr());
            img.mapster("set", true, String(i), renderOpts[arraySeats[i].getStateNr()]);
        }
    },

    /*onGetList: function(data) {
        console.log("List!");
        for (var seat in data) {
            seat
        }
    },*/
    
    onClick: onSeatClick
});

function onSeatClick(data) {
    if (selectedSeat.number !== data.key) {
        // 1. Set previous selected to it's main status
        if (selectedSeat.number != null) {
            img.mapster("set", false, selectedSeat.number);
            if (selectedSeat.state != null) {
                img.mapster("set", true, selectedSeat.number, renderOpts[selectedSeat.getStateNr()]);
            }
        }

        console.log("bla " + data.key);

        // 2. Store the currently selected seat and it's main status.
        selectedSeat.number = data.key;
        console.log($.grep(arraySeats, function (e, i) { return e.number == data.key; })[0]);
        selectedSeat.state = $.grep(arraySeats, function (e, i) { return e.number == data.key; })[0]; //arraySeats.[selectedSeat.number] || null;

        console.log("Selected seat: " + selectedSeat.number + ", state: " + selectedSeat.state);

        // 3. Update the appearance of the selected seat.
        img.mapster('set', false, selectedSeat.number);//, renderOpts[selectedSeat[1]]);
        img.mapster('set', true, selectedSeat.number, renderOpts[0]);
    } else {
        img.mapster("set", false, selectedSeat.number);
        img.mapster("set", true, selectedSeat.number, renderOpts[selectedSeat.getStateNr]);
        selectedSeat = new Seat();
    }
}

function reserveSeat() {
    if (selectedSeat.number == null) {
        return false;
    }
    //var selectedSeat = img.mapster('get');
    img.mapster("set", false, selectedSeat.number);

    //TODO: Update change to DB.
    arraySeats[selectedSeat.number].state = "reserved";

    //updates changes to selectedSeat
    selectedSeat.state = "reserved";

    console.log(selectedSeat);


    img.mapster('set', true, selectedSeat.number, renderOpts[selectedSeat.getStateNr()]);

    document.getElementById('seatText').innerHTML = "Reserved seat: " + selectedSeat.number;
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
var img = $('#room1');
var CLIENT_ID = '534651979725-0b4pnajijvgshq3k20j1vfu9muba86ka.apps.googleusercontent.com';
var SCOPES = ["https://www.googleapis.com/auth/calendar"];

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
var arraySeats = [];

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
        //var dbSeats = 

        for (var i = 0; i <= 14; i++) {
            //test code for alternating seat state.
            /*var state = 0;

            switch (i % 3) {
                case 0:
                    state = "taken";
                    break;
                case 1:
                    state = "free";
                    break;
                case 2:
                    state = "reserved";
                    break;
                default:
            }

            arraySeats[i] = new Seat(i, state);*/

            arraySeats[i] = new Seat(i, "free");
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

    if (selectedSeat.number != data.key) {
        // 1. Set previous selected to it's main status
        if (selectedSeat.number != null) {
            img.mapster("set", false, selectedSeat.number);
            if (selectedSeat.state != null) {
                img.mapster("set", true, selectedSeat.number, renderOpts[selectedSeat.getStateNr()]);
            }
        }

        // 2. Store the currently selected seat and it's main status.
        selectedSeat.number = data.key;
        //console.log($.grep(arraySeats, function (e) { return  e.number == data.key})[0]);
        selectedSeat.state = $.grep(arraySeats, function (e) { return e.number == data.key; })[0].state;

        console.log("Selected seat: " + selectedSeat.number + ", state: " + selectedSeat.state);

        // 3. Update the appearance of the selected seat.
        img.mapster('set', false, selectedSeat.number);//, renderOpts[selectedSeat[1]]);
        img.mapster('set', true, selectedSeat.number, renderOpts[0]);
    } else {
        console.log("nr: " + selectedSeat.number + "stateNr: " + selectedSeat.getStateNr());
        img.mapster("set", false, selectedSeat.number);
        img.mapster("set", true, selectedSeat.number, renderOpts[selectedSeat.getStateNr()]);
        selectedSeat = new Seat();
    }
}

var chairId = null;
/**
     * Check if current user has authorized this application.
     */
    function checkAuth() {
        gapi.auth.authorize(
          {
              'client_id': CLIENT_ID,
              'scope': SCOPES.join(' '),
              'immediate': true
          }, handleAuthResult);
    }

    /**
     * Handle response from authorization server.
     *
     * @param {Object} authResult Authorization result.
     */
    function handleAuthResult(authResult) {       
            loadCalendarApi();       
    }

    /**
     * Initiate auth flow in response to user clicking authorize button.
     *
     * @param {Event} event Button click event.
     */
    function handleCalendarInsert(chair) {
        chairId = chair;
        gapi.auth.authorize(
          { client_id: CLIENT_ID, scope: SCOPES, immediate: false },
          handleAuthResult);
        return false;
    }

    /**
     * Load Google Calendar client library. List upcoming events
     * once client library is loaded.
     */
    function loadCalendarApi() {
        gapi.client.load('calendar', 'v3', createEvent);
    }
    

    /**
     * Print the summary and start datetime/date of the next ten events in
     * the authorized user's calendar. If no events are found an
     * appropriate message is printed.
     */
    function createEvent() {        
       
        var event = {
            'summary': 'Google I/O 2015',
            'location': '800 Howard St., San Francisco, CA 94103',
            'description': 'A chance to hear more about Google\'s developer products.',
            'start': {
                'dateTime': '2015-05-28T09:00:00-07:00',
                'timeZone': 'America/Los_Angeles'
            },
            'end': {
                'dateTime': '2015-05-28T09:00:00-08:00',
                'timeZone': 'America/Los_Angeles'
            }
            
        };

        var request = gapi.client.calendar.events.insert({
            'calendarId': 'primary',
            'resource': event
        });

        request.execute(function (event) {
            console.log('Event created.');
        });
    }

    /**
     * Append a pre element to the body containing the given message
     * as its text node.
     *
     * @param {string} message Text to be placed in pre element.
     */
    function appendPre(message) {
        var pre = document.getElementById('output');
        var textContent = document.createTextNode(message + '\n');
        pre.appendChild(textContent);
    }
    


function reserveSeat() {    
    if (selectedSeat.number == null || selectedSeat.state !== "free") {
        document.getElementById('seatText').innerHTML = "Select a free seat.";
        return false;
    }
    handleCalendarInsert(selectedSeat.number);
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

function checkAllSeatStatus() {
    //TODO: Get all visible seats and use checkSeatStatus on them.
    alert("Checking seats!");
}

function checkSeatStatus(keySeat) {
    
    //TODO: Add a method to check the seat in the database and update it if it changed.
}

/*function httpGetAsync(url, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            callback(xmlHttp.responseText);
        }
        xmlHttp.open("GET", url, true);
        xmlHttp.send(null);
    }
}*/

$(document)
    .ready(function () {
        //console.log(document.getElementById("TakenSeatsData").innerText);
        var array = jQuery.parseJSON(document.getElementById("TakenSeatsData").innerText);
        console.log(array);
        console.log(array[0].T);
        for (var i = 0; i < array.length; i++) {
            if (array[i].B == 1) {
                img.mapster("set", false, array[i].A);
                arraySeats[array[i].A].state = "taken";
                console.log(arraySeats[array[i].A]);
                img.mapster('set', true, array[i].A, renderOpts[arraySeats[array[i].A].getStateNr()]);
            }
            console.log(array[i]);
        }


    });

//QTip2 for map area 
/*$(document).ready(function () {
    $('area').each(function() {
        $(this).qtip({
            content: {
                text: $(this).next('.seatToolTip')
            },
            position: {
                my: 'left center',
                at: 'right center'
            }
        });
    });
});*/
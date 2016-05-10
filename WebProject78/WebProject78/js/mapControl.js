var img = $('#room1');

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
    singleSelect: true,
    onMouseover: function (data) {
        $('#seatText').text(captions[data['key']]);
    },
    onMouseout: function (data) {
        $('#seatText').text('');
    }
});

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
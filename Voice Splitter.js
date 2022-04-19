//-----------------------------------------------------------------------------
// Voice splitter
//-----------------------------------------------------------------------------

// global array of active notes for record keeping
var activeNotes = [];

var lastPlayedNotePitch;

var activeNotesNum = 0;

var voiceNum = 0;

var intervalForSeparating = 4;

function HandleMIDI(event) {
    if (event instanceof NoteOn) {

        var interval = Math.abs(lastPlayedNotePitch - event.pitch);

        if (interval > intervalForSeparating) {
            if (activeNotesNum == 0) {
                if (voiceNum == 0) {
                    event.send();
                } else {
                    // do nothing;
                }
            } else {
                if (voiceNum == 0) {
                    // do nothing;
                } else {
                    event.send();
                }
            }
        } else {
            if (voiceNum == 0) {
                event.send();
            } else {
                // do nothing;
            }
        }

        lastPlayedNotePitch = event.pitch;
        activeNotesNum = activeNotesNum + 1;

    } else if (event instanceof NoteOff) {

        event.send();

        activeNotesNum = activeNotesNum - 1;
    }
}

// function processEvent(event, voiceNum) {
//     if (activeNotesNum == 0) {
//         if (voiceNum == 0) {
//             event.send();
//         } else {
//             // do nothing;
//         }
//     } else {
//         if (voiceNum == 0) {
//             // do nothing;
//         } else {
//             event.send();
//         }
//     }
// }
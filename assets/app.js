// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyDRTArBwYDYGRb8DykEGjsghGjGPhlUiEM",
    authDomain: "train-scheduler-7fe4e.firebaseapp.com",
    databaseURL: "https://train-scheduler-7fe4e.firebaseio.com",
    projectId: "train-scheduler-7fe4e",
    storageBucket: "train-scheduler-7fe4e.appspot.com",
    messagingSenderId: "79907476557",
    appId: "1:79907476557:web:3693132e5b2404a3ef7804",
    measurementId: "G-26YYSD3Q40"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

$("#submit").on("click", function () {

    var trainInput = $("#trainNameInput").val().trim();
    var destInput = $("#destinationInput").val().trim();
    var timeInput = $("#trainTimeInput").val().trim();
    var freqInput = $("#frequencyInput").val().trim();


    console.log(trainInput);
    console.log(destInput);
    console.log(timeInput);
    console.log(freqInput);

    database.ref().push({

        trainInput: trainInput,
        destInput: destInput,
        timeInput: timeInput,
        freqInput: freqInput,
    });


});

database.ref().on("child_added", function (snap) {

    var sval = snap.val();

    console.log(snap.val());
    console.log(snap.val().trainInput);
    console.log(snap.val().destInput);
    console.log(snap.val().timeInput);
    console.log(snap.val().freqInput);
    console.log("--------------");

    var newTableRow = $("<tr>").append(
        $("<td>").text(sval.trainInput),
        $("<td>").text(sval.destInput),
        $("<td>").text(sval.freqInput),
    );

    $("tbody").append(newTableRow);

    var trainFreq = sval.freqInput;

    var firstTrainTime = sval.timeInput;
    
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);
    
    var currentTime = moment().format("HH:mm");

    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + timeDiff);

    var timeRemain = timeDiff % trainFreq;
    console.log(timeRemain);

    var tMinutesTillTrain = trainFreq - timeRemain;


    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    var newTDNextTrain = $("<td>").text(nextTrain);
    newTableRow.append(newTDNextTrain);
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("HH:mm"));

    var newTDMinutes = $("<td>").text(tMinutesTillTrain);
    newTableRow.append(newTDMinutes);

   
        //Going to play around with If statement, so only certain things can be entered in text fields.
    // if (timeInput !== format("HH:mm")){
    //     alert("Current field needs to be entered in Military Time!")
    // } else if (freqInput === NaN) {
    //     alert("Enter a Number")
    // }
});





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
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");


    var timeRemain = timeDiff % trainFreq;


    var tMinutesTillTrain = trainFreq - timeRemain;


    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    $("<td>").text(moment(nextTrain).format("HH:mm"));
    var newTDNextTrain = $("<td>").text(moment(nextTrain).format("HH:mm"));
    newTableRow.append(newTDNextTrain);


    var newTDMinutes = $("<td>").text(tMinutesTillTrain);
    newTableRow.append(newTDMinutes);

    newTableRow.addClass("text-center");

    var removeTrain = $("<button>");

      removeTrain.attr("data-to-do", newTableRow);
      removeTrain.addClass("checkbox");
      removeTrain.text("x");

      // Append the button to the to do item
      newTableRow = newTableRow.append(removeTrain);

      $(document.body).on("click", ".checkbox", function() {
        var removeRow = $(this).attr("data-to-do");
        $(newTableRow).remove();

      });


    //Going to play around with If statement, so only certain things can be entered in text fields.
    // if (timeInput !== format("HH:mm")){
    //     alert("Current field needs to be entered in Military Time!")
    // } else if (freqInput === NaN) {
    //     alert("Enter a Number")
    // }
});






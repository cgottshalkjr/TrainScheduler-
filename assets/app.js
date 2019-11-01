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

//On click function that is is grabbing info from our input fields and saving that information to firebase with ref.push
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

//on child added used for when we get the info back from firebase
database.ref().on("child_added", function (snap) {

    //setting a variable for the value of our snap
    var sval = snap.val();

    console.log(snap.val());
    console.log(snap.val().trainInput);
    console.log(snap.val().destInput);
    console.log(snap.val().timeInput);
    console.log(snap.val().freqInput);
    console.log("--------------");

    //table row appending the initial data that will be displayed from user input
    var newTableRow = $("<tr>").append(

        $("<td>").text(sval.trainInput),
        $("<td>").text(sval.destInput),
        $("<td>").text(sval.freqInput),
    );

    //appending that row to the tbody that we left blank in html table
    $("tbody").append(newTableRow);

    //variable for user input train frequency
    var trainFreq = sval.freqInput;

    //the user input of first train time 
    var firstTrainTime = sval.timeInput;

    //converting first train time into military hours
    var firstTimeConverted = moment(firstTrainTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    //converting current time to military hours and setting it to a variable
    var currentTime = moment().format("HH:mm");
    console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

    //getting the time difference 
    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");

    //varibale setting the remainder between user input of frequency and first time and current time
    var timeRemain = timeDiff % trainFreq;

    //setting a variable that is getting the difference between time remaining and frequency
    var minutesTillTrain = trainFreq - timeRemain;

    //variable for the next train 
    var nextTrain = moment().add(minutesTillTrain, "minutes");
    //next train being saved into table data and append to new row
    var newTDNextTrain = $("<td>").text(moment(nextTrain).format("HH:mm"));
    newTableRow.append(newTDNextTrain);

    //how many minutes until the next train arrives
    var newTDMinutes = $("<td>").text(minutesTillTrain);
    newTableRow.append(newTDMinutes);
    //adding centered text to row elements
    newTableRow.addClass("text-center");

    //starting to set button to remove rows
    var removeTrain = $("<button>");

    removeTrain.attr("data-to-do", newTableRow);
    removeTrain.addClass("checkbox");
    removeTrain.text("x");

    // Append the button
    newTableRow = newTableRow.append(removeTrain);

    $(document.body).on("click", ".checkbox", function () {
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






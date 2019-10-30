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

    database.ref.on("child_added", function(snap){

        console.log(snap.val());
        console.log(snap.val().trainInput);
        console.log(snap.val().destInput);
        console.log(snap.val().timeInput);
        console.log(snap.val().freqInput);


    });

});



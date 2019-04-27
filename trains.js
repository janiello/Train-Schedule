// Initialize Firebase
var config = {
    apiKey: "AIzaSyBAjfqtxyIqRfBoO2MQFbUObHtpL-lGxk8",
    authDomain: "train-schedule-98957.firebaseapp.com",
    databaseURL: "https://train-schedule-98957.firebaseio.com",
    projectId: "train-schedule-98957",
    storageBucket: "train-schedule-98957.appspot.com",
    messagingSenderId: "426358396482"
  };

firebase.initializeApp(config);

var database = firebase.database();
// Button click event to submit new train schedule
$("#submit").on("click", function(event) {
    event.preventDefault();
    // Grab input from text fields where user will enter new train info
    var trainName = $("#name-input").val().trim();
    var destination = $("#destination-input").val().trim();
    var firstTrain = $("#original-input").val().trim();
    var frequency = $("#frequency-input").val().trim();
    // Create an object to temporarily store new info
    var newSchedule = {
        name: trainName,
        destination: destination,
        first: firstTrain,
        frequency: frequency
    };
    // Push the new object to the database for actual storage
    database.ref().push(newSchedule);
    // Clear text from input fields from the previous entry
    $("#name-input").val("");
    $("#destination-input").val("");
    $("#original-input").val("");
    $("#frequency-input").val("");
});
// Function that continually reads firebase and console logs all data requested
database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val());
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().first);
    console.log(childSnapshot.val().frequency);
    // Append the above information to the table in the html by programmaticly creating row elements
    $("#all-train-schedules").append("<tr class='new-train'><td class='train-name'> " + childSnapshot.val().name + 
    " </td><td class='train-destination'> " + childSnapshot.val().destination +  
    " </td><td class='train-frequency' " + childSnapshot.val().frequency + 
    " </td></tr>");
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
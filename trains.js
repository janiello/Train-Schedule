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
// Grab input from text fields where user will enter new train info. These will be initial values
var trainName = $("#name-input").val().trim();
var destination = $("#destination-input").val().trim();
var firstTrain = $("#original-input").val().trim();
var frequency = $("#frequency-input").val().trim();
// Convert our time input to realtime
var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
console.log(firstTrainConverted);
// Set the current time in real life (this seems like magic. Technology, man.)
var currentTime = moment();
console.log("Current time: " + moment(currentTime).format("HH:mm"));
// Calculate the difference in time between when the first train left and now
var diffTime = moment().diff(moment(firstTrainConverted), "minutes");
console.log("How long has it been since the first train left? " + diffTime);
// Calculate the remainder of time by dividing the difference in time by the frequency of trains
var remainder = diffTime % frequency;
console.log(remainder);
// Button click event to submit new train schedule
$("#submit").on("click", function(event) {
    event.preventDefault();
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
    // Append the above information to the table in the html by programmaticly creating row elements
    $("#all-train-schedules").append("<tr class='new-train'><td class='train-name'> " + childSnapshot.val().name + 
    " </td><td class='train-destination'> " + childSnapshot.val().destination +  
    " </td><td class='train-frequency' " + childSnapshot.val().frequency + 
    " </td></tr>");
}, function (errorObject) {
    console.log("Errors handled: " + errorObject.code);
});
var config = {
  apiKey: "AIzaSyBs646z5wUS8Pq_vg5098TB6ch9jEV2wH0",
  authDomain: "train-scheduler-b9898.firebaseapp.com",
  databaseURL: "https://train-scheduler-b9898.firebaseio.com",
  projectId: "train-scheduler-b9898",
  storageBucket: "train-scheduler-b9898.appspot.com",
  messagingSenderId: "231611321866"
};
firebase.initializeApp(config);

var database = firebase.database();

//variables
var trainName = "";
var destination = "";
var firstTime = "";
var timeFormat = "HH:mm";
var frequency = 0;
var nextArrival = "";
var minutesAway = 0;

//adding train info click handler
$("#submit").on("click", function (event) {
  event.preventDefault();

  
  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTime = $("#firstTime").val().trim();
  frequency = $("#frequency").val().trim();

  var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var tRemainder = diffTime % frequency;
  console.log(tRemainder);

  var minutesAway = frequency - tRemainder;
  console.log("MINUTES TILL TRAIN: " + minutesAway);

  var nextArrival = moment().add(minutesAway, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextArrival).format("hh:mm"));

  nextArrival = moment(nextArrival).format("hh:mm").toString();

  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
    minutesAway: minutesAway,
    nextArrival: nextArrival
  });
});

database.ref().on("value", function(snapshot){
  console.log(snapshot.val());

  database.ref().on("child_added", function(childSnapshot){

    console.log(childSnapshot.val());
    console.log(childSnapshot.val().trainName);
    $("tbody").empty();
    var row = $("<tr>");
      row.append(`<td>${childSnapshot.val().trainName}</td>`);
      row.append(`<td>${childSnapshot.val().destination}</td>`);
      row.append(`<td>${childSnapshot.val().frequency}</td>`);
      row.append(`<td>${childSnapshot.val().nextArrival}</td>`);
      row.append(`<td>${childSnapshot.val().minutesAway}</td>`);
    $("tbody").append(row);
  });

});





//figure why it displays twice
//prevent non-numeric characters in time inputs
//comment code
//clear out inputs after submit
//add to portfolio
//firebase
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

  //pulling from input
  trainName = $("#trainName").val().trim();
  destination = $("#destination").val().trim();
  firstTime = $("#firstTime").val().trim();
  frequency = $("#frequency").val().trim();

  //calculating next arrival
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

  //pushing to firebase
  database.ref().push({
    trainName: trainName,
    destination: destination,
    firstTime: firstTime,
    frequency: frequency,
    minutesAway: minutesAway,
    nextArrival: nextArrival
  });
});

//pulling from firebase to display to HTML
  database.ref().on("child_added", function(snapshot){

      console.log(snapshot.val());

    var row = $("<tr>");
      row.append(`<td>${snapshot.val().trainName}</td>`);
      row.append(`<td>${snapshot.val().destination}</td>`);
      row.append(`<td>${snapshot.val().frequency}</td>`);
      row.append(`<td>${snapshot.val().nextArrival}</td>`);
      row.append(`<td>${snapshot.val().minutesAway}</td>`);
    $("tbody").append(row);
  });







//prevent non-numeric characters in time inputs
//clear out inputs after submit {this fucks up everything for some frickin' reason so I gave up}

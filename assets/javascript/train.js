// Initialize Firebase
var config = {
    apiKey: "AIzaSyBQc0d7-psEMUwa28-bGEv2tfy3IheeHZc",
    authDomain: "codingclassproject-149d5.firebaseapp.com",
    databaseURL: "https://codingclassproject-149d5.firebaseio.com",
    projectId: "codingclassproject-149d5",
    storageBucket: "codingclassproject-149d5.appspot.com",
    messagingSenderId: "120942714178"
  };

    firebase.initializeApp(config);

    // Create a variable to reference the database.
    var database = firebase.database();

    var train = "";
    var destination = "";
    var time = "";
    var frequency = "";
    var nextArrival = "";
    var minutesAway = "";

    // Capture Button Click
    $("#add-train").on("click", function(event) {
        event.preventDefault();

        // Grabbed values from text boxes
        train = $("#train-input").val().trim();
        destination = $("#destination-input").val().trim();
        time = $("#time-input").val().trim();
        frequency = $("#frequency-input").val().trim();

      // Code for handling the push
      database.ref("trains").push({
        train: train,
        destination: destination,
        time: time,
        frequency: frequency,
        dateAdded: firebase.database.ServerValue.TIMESTAMP
      });


      $("#train-input").val("");
      $("#destination-input").val("");
      $("#time-input").val("");
      $("#frequency-input").val("");

    });

    database.ref("trains").on("child_added", function(snapshot) { 

        train = snapshot.val().train;
        destination = snapshot.val().destination;
        time = snapshot.val().time;
        frequency = snapshot.val().frequency;

        
        var start = moment(time, "HH:mm");
        var firstTrainTime = start.format("LT");
        var rightNow = moment().format("LT");
        var minutes = moment().diff(start, "minutes");
        var x = String(minutes);
     
        if (x <= 0) {
          nextArrival = firstTrainTime;
          minutesAway = minutes;
        } else {
          var y = x;
          while (y >= 0) {
            var newTime = start.add(frequency, "m");
            minutes = moment().diff(newTime, "minutes");
            y = String(minutes);
            minutesAway = minutes;
            nextArrival = newTime.format("LT");
          }
        }

        var tableRow = $("<tr>");
        tableRow.append("<td>" + train + "</td>");
        tableRow.append("<td>" + destination + "</td>");
        tableRow.append("<td>" + frequency + "</td>");
        tableRow.append("<td>" + nextArrival + "</td>");
        tableRow.append("<td>" + -minutesAway + "</td>");
        


        $(".table").append(tableRow);

    });

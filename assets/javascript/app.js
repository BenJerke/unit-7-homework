var firebaseConfig = {
    apiKey: "AIzaSyA92ob23zmwlR36JZetkw-Hfm2Hi3mGdc8",
    authDomain: "unit-7-homework-1ea23.firebaseapp.com",
    databaseURL: "https://unit-7-homework-1ea23.firebaseio.com",
    projectId: "unit-7-homework-1ea23",
    storageBucket: "unit-7-homework-1ea23.appspot.com",
    messagingSenderId: "326033603137",
    appId: "1:326033603137:web:fbb3d243533d6ae76924c0",
    measurementId: "G-CDYQNTTSGD"
  };

firebase.initializeApp(firebaseConfig);

var database = firebase.database();


//get data from firebase and populate table on load

database.ref().on('value', function(snapshot) {

  snapshot.forEach(function (childSnapshot) {

      //break down snapshot into usable format
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      console.log(childKey);
      console.log(childData);

      var freq = childData.trnFreq;
      var firstArrival = childData.trnFirst;
      console.log(freq)
      console.log(firstArrival)
       
    //this is where i'm currently stuck. i know what i need to do, but i can't figure out how to translate it. 
    //i need to add frequencies to the train's first arrival until that time is greater than the current time. this gives me the next train.
    //then i need to subtract the current time from that time. this gives me minutes away. 
    //problem is i can't figure out how to construct the loop i need. the iterator is abstracted. the conditions are going to be complicated. 

      var arrTrainTimes = [];
      for(i=0; i<24; i++){
        var times = moment(firstArrival).add(freq).format("HH:mm")
        arrTrainTimes.push(times)
      }
      console.log(arrTrainTimes);



      
      //populate table with snapshot data
      $("tbody").append(((($("<tr>").append($("<td>").text(childData.trnName))).append($("<td>").text(childData.trnDest)).append($("<td>").text(childData.trnFreq))).append($("<td>").text("math is hard"))).append($("<td>").text('minutes away')));

  });


 

});















  $("#add-train-btn").on("click", function(event) {
      // Don't refresh the page!
      event.preventDefault();

      // Capture User Inputs and store them into variables
      var trainName = $("#train-name-input").val()

      var trainDestination = $("#destination-input").val()

      var trainFirstArrival = $("#first-arrival-input").val()

      var trainFrequency = $("#frequency-input").val()


      console.log(trainName);
      console.log(trainDestination);
      console.log(trainFirstArrival);
      console.log(trainFrequency);


      // output all of the new information into table rows appended to the main table
      $("tbody").append(((($("<tr>").append($("<td>").text(trainName))).append($("<td>").text(trainDestination)).append($("<td>").text(trainFrequency))).append($("<td>").text("next arrival"))).append($("<td>").text('minutes away')));

   
      
      //adding data to firebase
      database.ref().push({
        trnName: trainName,
        trnDest: trainDestination,
        trnFirst: trainFirstArrival,
        trnFreq: trainFrequency,

      });

    $("#train-name-input").val("")
    $("#destination-input").val("")
    $("#first-arrival-input").val("")
    $("#frequency-input").val("")
    

    });

// basic functionalities
var btnConnect = document.getElementById("btn-connect");
var btnDisconnect = document.getElementById("btn-disconnect");

//disconnect
btnDisconnect.addEventListener("click", function (e) {
  e.preventDefault();
  let status = document.getElementById("inpStatus");
  status.value = "Disconnected!"
  client.end();
})

//connect
btnConnect.addEventListener("click", function (e) {
  e.preventDefault();

  let status = document.getElementById("inpStatus");
  console.log("working Connect Button");
  client = mqtt.connect(document.getElementById("inpAddress").value) // connect to broker

  client.on("connect", function () {
    console.log("Successfully connected");
    status.value = "Connected!"
  })

  client.on("message", function (topic, payload) { //triggered and display the message
    console.log([topic, payload].join(": "));
    //topic = mqtt/gen  >>> topic = gen
    $("#messageBody").append("<tr><td>" + topic + "</td><td>" + payload + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>");
  })
})

//hide and show the messages
document.getElementById("btn-messages").addEventListener("click", function (e) {
  e.preventDefault();
  $("#containerMess").show();
})
document.getElementById("btn-hide").addEventListener("click", function (e) {
  e.preventDefault();
  $("#containerMess").hide();
})

//publish
document.getElementById("btn-publish").addEventListener("click", function (e) {
  e.preventDefault();
  let topic = $("input[name=topic]").val();
  let payload = $("input[name=payload]").val();
  client.publish(topic, payload);
  $("#publishBody").append("<tr><td>" + topic + "</td><td>" + payload + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>");

})

//subscribe
document.getElementById("btn-subscribe").addEventListener("click", function (e) {
  e.preventDefault();
  let topic = $("input[name=subsTopic]").val();
  client.subscribe(topic);
  $("#subscribeBody").append("<tr><td>" + topic + "</td><td>" + moment().format('MMMM Do YYYY, h:mm:ss a') + "</td></tr>");

})

//unsubscribe
document.getElementById("btn-unsubscribe").addEventListener("click", function (e) {
  e.preventDefault();
  let topic = $("input[name=subsTopic]").val();
  client.unsubscribe(topic);
})


// // advance functionalities
// client = mqtt.connect("ws://broker.hivemq.com:8000/mqtt")
// client.subscribe("mqtt/demo", function (err){
//   if (err){
//     console.log(err);
//   } else {
//     console.log("subscribed")
//   }
// })

// client.on("connect", function(){
//     console.log("Successfully connected");
// })

// client.on("message", function (topic, payload) {
//   console.log([topic, payload].join(": "));
//   client.end();
// })

// client.publish("mqtt/demo", "hello world!", function(err){
//   if (err){
//     console.log(err)
//   } else {
//     console.log("published")
//   }
// })

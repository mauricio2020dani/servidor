//https://www.eclipse.org/paho/clients/js/

function hora(){
	h = document.getElementById("hselec").value;
console.log(h);
message = new Paho.MQTT.Message("H "+h)
message.destinationName="mdpilatuna.fie@unach.edu.ec/RASP";
client.send(message);
document.getElementById("ton").innerHTML=h;
}

function hora2(){
	h = document.getElementById("hselec2").value;
console.log(h);
message = new Paho.MQTT.Message("Q "+h)
message.destinationName="mdpilatuna.fie@unach.edu.ec/RASP";
client.send(message);
document.getElementById("toff").innerHTML=h;
}

function LED_On() {
	//alert("led on");
	console.log("led on");
	//document.getElementById("sensor").innerHTML="led on";
	message = new Paho.MQTT.Message("LED ON");
    	message.destinationName = "mdpilatuna.fie@unach.edu.ec/RASP";
    	client.send(message);
  
}
function LED_Off(){	
	//alert("led off");
	console.log("led off");
	message = new Paho.MQTT.Message("LED OFF");
    	message.destinationName = "mdpilatuna.fie@unach.edu.ec/RASP";
    	client.send(message);
	//document.getElementById("sensor").innerHTML="led off";
}

// Create a client instance
  //client = new Paho.MQTT.Client("postman.cloudmqtt.com", 14970);
  
  client = new Paho.MQTT.Client("maqiatto.com", 8883, "web_" + parseInt(Math.random() * 100, 10));

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;
  var options = {
   useSSL: false,
    userName: "mdpilatuna.fie@unach.edu.ec",
    password: "quitociudadhermosa",
    onSuccess:onConnect,
    onFailure:doFail
  }

  // connect the client
  client.connect(options);
   
  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("Conectado...");
	
    client.subscribe("mdpilatuna.fie@unach.edu.ec/WEB");
    message = new Paho.MQTT.Message("hola desde la web");
    message.destinationName = "mdpilatuna.fie@unach.edu.ec/RASP";
    client.send(message);
	
  }

  function doFail(e){
    console.log(e);
	
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("onConnectionLost:"+responseObject.errorMessage);
    }
  }

  // called when a message arrives
  function onMessageArrived(message) {
    console.log("onMessageArrived:"+message.payloadString);
	entrada=(message.payloadString).split(" ")[0];
	dato=(message.payloadString).split(" ")[1];
	  if (entrada==he){
	  document.getElementById("HORAACTUAL").innerHTML=dato;
	  }
		   else if (entrada==ha){
			   document.getElementById("sensor").innerHTML=dato;
	  }
  }

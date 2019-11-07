let mqtt = require("mqtt");

let client = mqtt.connect('mqtt://rpi-server:1883', {clientId: "randomCLielnt"});

client.subscribe("asd");
client.subscribe("cntd");
client.subscribe("warehouse/inputFinished");
client.subscribe("warehouse/outputFinished");
client.subscribe("warehouse/inputArrived");
client.subscribe("vissza");
client.subscribe("oda");

client.on('connect', () => {

    console.log("Connected to the broker...");

    client.publish("warehouse/inputArrived", "2 3");
    //client.publish("warehouse/output", "4 1 0");

    console.log("ODA");

});

//client.publish("warehouse/inputArrived", "2 4");


client.on("message", (token, data) =>{
    console.log("token: " + token + "    data: " + data);
});
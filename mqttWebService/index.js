let mqtt = require("mqtt");
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

let client = mqtt.connect('mqtt://rpi-server:1883', {clientId: "cucc"});

client.subscribe("warehouse");
client.subscribe("warehouse/inputArrived");
client.subscribe("warehouse/output");
client.subscribe("warehouse/outputFinished");
client.subscribe("oda");

client.on('connect', () => {

    console.log("Connected to the broker...");
    client.publish("mqttWebService/status", "connected");

});

client.on("message", (topic, payload) => {
    httpGetAsync("http://192.168.43.74/command/sendCommandWithoutMqtt/" + encodeURI(topic).replace("/", "(PER)") + "/" + encodeURI(payload).replace("/", "(PER)"), (res) => {
        console.log("response: " + res);
    });
    console.log("Fetching " + "http://192.168.43.74/command/sendCommandWithoutMqtt/" + encodeURI(topic).replace("/", "(PER)") + "/" + encodeURI(payload).replace("/", "(PER)" + "..."));
});

function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState === 4 && xmlHttp.status === 200)
            callback(xmlHttp.responseText);
    };
    xmlHttp.open("GET", theUrl, true); // true for asynchronous
    xmlHttp.send(null);
}
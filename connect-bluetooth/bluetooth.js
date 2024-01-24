// Article link
// * https://developer.chrome.com/docs/capabilities/bluetooth

const connectHandler = () => {
    debugger
    window.navigator.bluetooth.requestDevice({ acceptAllDevices: true, optionalServices: ['battery_service'] })
        .then(device => device.gatt.connect())
        .then(server => {
            return server.getPrimaryService('battery_service');
        })
        .then(service => {
            return service.getCharacteristic('battery_level');
        })
        .then(characteristic => {
            return characteristic.readValue();
        })
        .then(value => {
            console.log(`Battery percentage is ${value.getUint8(0)}`);
        })
        .catch(error => { console.error(error); });
}

const btn = document.getElementById("connectBtn");

btn.addEventListener("click", connectHandler)
export function generateUserId() {
    var timestamp = Date.now();
    var random = Math.floor(Math.random() * 1000000);
    var id = "".concat(timestamp).concat(random);
    return id.slice(0, 255); // limit the nubmer to 255 characters
}

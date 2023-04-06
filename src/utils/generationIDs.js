export function generateUserId() {
    const timestamp = Date.now();
    const random = Math.floor(Math.random() * 1000000);
    const id = `${timestamp}${random}`;
    return id.slice(0, 255); // limit the nubmer to 255 characters
}
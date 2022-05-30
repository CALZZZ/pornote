// Initialize button with user's preferred color
// let checkBox = document.getElementById("enable-dark-theme");

// chrome.storage.sync.get("color", ({ color }) => {
//     console.log("dark theme is " + color)
//     changeColor.style.backgroundColor = color;
// });

var checkbox = document.getElementById("enable-dark-theme");

checkbox.addEventListener('change', function() {
    if (this.checked) {
        alert("Checkbox is checked..");
    } else {
        alert("Checkbox is not checked..");
    }
});
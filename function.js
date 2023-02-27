var storyNum = 0
var storyList = ["story1", "story2"]
var narrator = localStorage.getItem("narrator")

function next() {
    if (storyList[storyNum] == storyList[storyList.length-1]) {
        storyNum = 0
    }
    else {
        storyNum++
    }
    loadText()
}
function last() {
    if (storyList[storyNum] == storyList[0]) {
        storyNum = storyList.length-1
    }
    else {
        storyNum--
    }
    loadText()
}

function loadText() {
    // fetch the contents of the text file
    fetch("storys/" + storyList[storyNum] + "text.txt")
      .then(response => response.text())
      .then(data => {
        // split the text into an array of paragraphs
        let paragraphs = data.split(/\n\s*\n/);
        // join the paragraphs with HTML <p> elements
        let html = paragraphs.map(p => `<p>${p}</p>`).join('');
        // wrap the entire text in a HTML div
        html = '<div>' + html + '</div>';
        // set the innerHTML of the div to the modified text
        document.querySelector(".text").innerHTML = html;
      });
    
    // sets audio
    document.querySelector("audio").src = "storys/" + storyList[storyNum] + "audio" + narrator + ".mp3";
}

function setNarrator(narratorName) {
    localStorage.setItem("narrator", narratorName)
    narrator = localStorage.getItem("narrator")
    loadText()
    console.log(localStorage.getItem("narrator"))
}

window.onload = function() {
    localStorage.setItem("narrator", "Rooban")
    loadText()
}
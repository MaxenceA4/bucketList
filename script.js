//on load
window.onload = function () {
    generateBucketList();
}

function generateBucketList() {
    url = 'https://api.api-ninjas.com/v1/bucketlist';
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.setRequestHeader('X-Api-Key', 'toBilqF5yIlXjlTwHFzpiA==MUcoupFCDzczqWjc');
    xhr.onload = function () {
        if (xhr.status === 200) {
            var output = JSON.parse(xhr.responseText);
            console.log(output);
            output = output['item'];
            console.log(output);
        }
        document.getElementById('output').innerHTML = output;
    }
    xhr.send();
}

function addToMyBucketList() {
    var myBucketList = document.getElementById('myBucketList');
    var outputted = document.getElementById('output').innerHTML;
    console.log(outputted);
    let openLi = '<li id="' + outputted + '">';
    let openP = '<p>';
    let closeP = '</p>';
    let closeLi = '</li>';
    let deleteButton = '<button onclick="deleteItem(\'' + outputted + '\')">X</button>';
    outputted = openLi + openP + outputted + closeP + deleteButton + closeLi;
    myBucketList.innerHTML += outputted;
    generateBucketList()
}

function deleteItem(theItem) {
    var item = document.getElementById(theItem);
    item.parentNode.removeChild(item);
}

function deleteAll() {
    var myBucketList = document.getElementById('myBucketList');
    myBucketList.innerHTML = '';
}


function downloadFile() {
    const myBucketList = document.getElementById('myBucketList');
    const items = myBucketList.querySelectorAll('li');
    let textToSave = '';

    items.forEach(function (item) {
        const text = item.querySelector('p').textContent;
        textToSave += '◦ ' + text + '\n';
    });

    const blob = new Blob([textToSave], {type: 'text/plain'});

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'My_Bucket_List.txt';
    link.click();

    URL.revokeObjectURL(url);
}

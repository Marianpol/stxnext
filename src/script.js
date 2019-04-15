const userInput = document.querySelector('input');
const searchButton = document.querySelector('button');
const searchResults = document.querySelector('div');



searchButton.addEventListener('click', function (event){
    let searchTitle = `https://www.googleapis.com/books/v1/volumes?q=intitle:${userInput.value}`;
    event.preventDefault();
    //getUrl(searchTitle);
    searchResults.innerHTML = drawTable(getUrl(searchTitle));
    
});

function getUrl(url){
    const request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    console.log(JSON.parse(request.responseText));
    return JSON.parse(request.responseText);
    
}

function drawTable(data){
    //console.log(data.items[2].volumeInfo.imageLinks.thumbnail);
    const thumbnail = data.items;
    let table = '<table border="1"';
	for (let book of thumbnail){
		table += `<tr><td><img src="${isAvailable(book.volumeInfo.imageLinks.thumbnail, "No Preview")}"></td>
		          <td>${book.volumeInfo.title}</td>
                  <td>${book.volumeInfo.description}</td></tr> `;   
    }
    
    table += '</table>';
    return table;
}
function isAvailable(elem, text){
    if(elem !== null){
        console.log(elem);
        return elem; 
    }
    else {
        console.log(text);
        return text;
    }
}

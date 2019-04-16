const userInput = document.querySelector('input');
const searchButton = document.querySelector('button');
const searchResults = document.querySelector('div');



searchButton.addEventListener('click', function (event){
    let searchTitle = `https://www.googleapis.com/books/v1/volumes?q=intitle:${userInput.value}`;
    event.preventDefault();
    searchResults.innerHTML = drawTable(getUrl(searchTitle));
    
});

function getUrl(url){
    const request = new XMLHttpRequest();
    request.open('GET', url, false);
    request.send();
    return JSON.parse(request.responseText);
    
}

function drawTable(data){
    const books = data.items;
    let table = '<table border="1"';
	for (let book of books){
		table += `<tr><td><img src="${isAvailable(book.volumeInfo.imageLinks, 'thumbnail')}" alt="No Preview"></td>
		          <td>${book.volumeInfo.title}</td>
                  <td>${isAvailable(book.volumeInfo.description, '' , "No description")}</td></tr> `;   
    }
    table += '</table>';
    return table;
}
function isAvailable(checkElem, addElem, text){
    if(checkElem){
        if(addElem){
            return checkElem[addElem];
        }
        return checkElem;
    }
    else {
        return text;
    }
}

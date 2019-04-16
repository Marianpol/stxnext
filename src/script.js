const userInput = document.querySelector('input');
const searchButton = document.querySelector('button');
const searchResults = document.querySelector('div');
let tmpUserInput= '';
let searchTitle = '';
let i = 0;
let totalItems = 0;

searchButton.addEventListener('click', function (event){
    tmpUserInput = userInput.value;
    userInput.value = "";
    searchTitle = `https://www.googleapis.com/books/v1/volumes?q=intitle:${tmpUserInput}`;
    event.preventDefault();
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
    const books = data.items;
    totalItems = data.totalItems;
    let table = '<table border="1"';
	for (let book of books){
		table += `<tr><td><img src="${isAvailable(book.volumeInfo.imageLinks, 'thumbnail')}" alt="No Preview"></td>
		          <td>${book.volumeInfo.title}</td>
                  <td>${isAvailable(book.volumeInfo.description, '' , "No description")}</td></tr> `;   
    }
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

window.onscroll = function(){
    let offset = document.documentElement.scrollTop + window.innerHeight;
    let height = document.documentElement.offsetHeight;
    let startIndex = 1+10*i;
    searchTitle = `https://www.googleapis.com/books/v1/volumes?q=intitle:${tmpUserInput}&startIndex=${startIndex}&maxResults=10`;

    if(startIndex < totalItems){
        if (offset >= height) {
            searchResults.innerHTML += drawTable(getUrl(searchTitle));
            i++; 
      }}
    
}

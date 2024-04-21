
let form = document.getElementById('dictform');

let wordInfo = document.getElementById('meaningforward')

form.addEventListener('submit', (e)=>{
   
   e.preventDefault();
  
   let word = document.getElementById('wordinput').value;
   
    getmeaning(word);

});
  
   const getmeaning = async(word)=>{
         
     try {
                  
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
   
  let data = await response.json();

 let paragraph = document.createElement('div');

 let list = document.createElement('ul');

 let meanings = data[0].meanings;

 meanings.forEach(meaning => {
    let listItem = document.createElement('li');
    listItem.innerHTML = `PartOfSpeech: <strong>${meaning.partOfSpeech}
    </strong>`;

    let definitions = meaning.definitions;

    let subList = document.createElement('ol');

    for(let definition of definitions ){
      let subListItem =  document.createElement('li');
      subListItem.innerHTML = `<em>${definition.definition}</em>`
      subList.appendChild(subListItem);
  }
     listItem.appendChild(subList);
     list.appendChild(listItem);
    
 });

 paragraph.innerHTML = `<h2>${data[0].word}</h2>`;

 wordInfo.innerHTML = '';

 wordInfo.appendChild(paragraph);

 wordInfo.appendChild(list);
 
     } catch (error) {
      console.log(error);
      wordInfo.innerHTML = `<p class='text-danger'>The word
      <strong>${word}</strong> is not found in the dictionary</p>`
     }
  

}




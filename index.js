//VARIABLES
var addCardToTheList = document.querySelectorAll('body > main > div > p > button')[0];

var tradeList = document.querySelectorAll('#incomplete-tasks')[0];




//FUNCIONES DECLARADAS
function getCardInfo(cardId) {
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if (this.readyState != 4) {
      return
    }

    if (this.status == 200) {
      var data = JSON.parse(this.responseText);

      // array vacio que tendra todos los cards
      var cards = [];

      // logica para cuando tengo el ID de card definido (quiero buscar por ID)
      if (cardId > 0) {
        var cardOriginal = data["card"];
        var cardFinal = {
          name: cardOriginal.name,
          rarity: cardOriginal.rarity,
          set: cardOriginal.set
        };

        cards.push(cardFinal);


        printHTML(cards); //Si hago data["cards"][0]["name"] accedo solo al nombre.
        // logica para buscar todos los cards (cuando no tengo ID definido)
      } else {

        for (var i = 0; i < data["cards"].length; i++) {

          let cardOriginal = data["cards"][i];
          let cardFinal = {
            name: cardOriginal.name,
            rarity: cardOriginal.rarity,
            set: cardOriginal.set
          };

          cards.push(cardFinal);
        }

        // printHTML(cards); //Si hago data["cards"][0]["name"] accedo solo al nombre.
      }
    }
  }
  if (cardId == undefined) {
    cardId = "";
  }
  xhr.open('GET', "https://api.magicthegathering.io/v1/cards/" + cardId);
  xhr.send();
}

//función que recibe un array de objectos de card con los atributos name, rarity y set
function printHTML(cards) {
  let tradeList = document.querySelectorAll('#incomplete-tasks')[0];//la zona donde se insertará la info
  tradeList.innerHTML = tradeList.innerHTML + `
  <p>${cards[0]['name']} , ${cards[0]['rarity']} , ${cards[0]['set']}</p>
  ` //para cada sección del array de objetos, tengo que poner cards [0] ['nombredelvalor']
  //console.log(cards[0])
}



//MAIN
addCardToTheList.addEventListener('click', function() {
  var inputText = document.querySelectorAll('#new-task')[0].value;
  getCardInfo(inputText) //llama a la función y la añade en inputText
});

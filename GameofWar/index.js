/* practice stuff, ignore this section from 1-14
console.log('1')

async function handleClick(){

await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")

console.log(2);
console.log(3);
console.log(4);

}
handleClick()
setTimeout(()=>console.log('done'),8000)*/
let card1 = document.getElementById('card1'), card2 = document.getElementById('card2'), remainingCards = document.getElementById('remaining-cards'), winner = document.getElementById('winner')
let deckId = '';
let cd1scr = 0, cd2scr = 0;
let cd1sp = document.getElementById('cd1scr'), cd2sp = document.getElementById('cd2scr')

function handleClick() {
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
        .then(res => res.json())
        .then(data => {
            remainingCards.textContent = `Remaining cards: ${data.remaining}`
            deckId = data.deck_id
            document.getElementById("draw-cards").disabled = false
            card1.src = ""
            card2.src = ""
            cd1scr = 0
            cd2scr = 0
            cd1sp.textContent = `-->score:${cd1scr}`
            cd2sp.textContent = `-->score:${cd2scr}`
            winner.textContent=`Game of War!`
        });
}

document.getElementById("new-deck").addEventListener("click", handleClick);

function winnerDetermine(card1, card2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9",
        "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    if (card1ValueIndex > card2ValueIndex) {
        cd1scr += 1
        cd1sp.textContent = `-->score:${cd1scr}`

    } else if (card1ValueIndex < card2ValueIndex) {
        cd2scr += 1
        cd2sp.textContent = `-->score:${cd2scr}`

    } else {
        winner.innerHTML = "<span>Is\'s a tie</span>"
    }

}

document.getElementById("draw-cards").addEventListener("click", () => {
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            card1.src = data.cards[0].image
            card2.src = data.cards[1].image
            remainingCards.textContent = `Remaining cards: ${data.remaining}`
            winnerDetermine(data.cards[0], data.cards[1])
            if (data.remaining === 0) {
                document.getElementById("draw-cards").disabled = true;

                if (cd1scr > cd2scr) {
                    winner.innerHTML = '<span>Winner is Candidate1</span>'

                }
                else {
                    winner.innerHTML = '<span>Winner is Candidate2</span>'

                }
            }

        })
})
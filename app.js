const logButton = (e) =>{
    console.log(e.target);
}

// finding the active element
custSection = document.querySelectorAll('.cust-buttons > *')
const redefineActiveElement = (e) =>{
    for(let element of custSection){
        element.classList.remove('active')
    }
    e.target.classList.add('active')
}


// customization options click events

// 1. Customization buttons
custButtons = document.querySelectorAll('.cust-buttons > button')
for(let custButton of custButtons){
    custButton.addEventListener('click', redefineActiveElement)
}

// 2. Color selector
pointerColorSelector = document.querySelector('.cust-buttons > input');
pointerColorSelector.addEventListener('change', redefineActiveElement)



const createDivs = function () {
    const numTiles = document.querySelector('#numTiles').value;
    const board = document.querySelector('.board')
    
    //craeting elements to append to board
    for(let i=0; i < numTiles**2; i++){
        const tile = document.createElement('div') 
        tile.style.cssText = `
            height: calc(100%/${numTiles});
            width: calc(100%/${numTiles});
        `
        board.append(tile)
    }
    board.style.cssText = `
        display: flex;
        flex-wrap: wrap;
    `
}

// On DOMContentLoaded, run createDivs once
document.addEventListener('DOMContentLoaded', createDivs)
//Scripts to for Etch-A-Sketch


function createGrid(num=16){
    // Create the grid of Divs
    // let size=document.querySelector('.sizeinput').value;
    let size=num*num;

    let container=document.querySelector('.container');

    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }

    // for (let j=1; j<=size;j++){
        for (let i=1;i<=size; i++){
            let square=container.appendChild(document.createElement('div'));
            square.className='square';
        }
    // }
    
    container.style.gridTemplateColumns=`repeat(${num},1fr)`; 
    container.style.gridTemplateRows=`repeat(${num},1fr)`;
          


    

    
    //Approach 1 - add event listeners to each squrare
    //works fine.
    // const squares=document.querySelectorAll('.square')
    
    // squares.forEach(square=>{square.addEventListener('mouseover',function(evt){
    //     square.classList.add('over');
    //     });
    // });

    // squares.forEach(square=>{square.addEventListener('mouseout',function(evt){
    //     square.classList.remove('over');
    //     });
    // });

}

createGrid(16);

function resetGrid(){
    let gridSize=parseInt(document.querySelector('.gridsize').value);
    createGrid(gridSize)
}


// grid input box, on changes verify entry and create grid
document.querySelector('.gridsize').addEventListener('change',function(evt){
    let min = this.min;
    let max = this.max;
    // here we perform the parsing instead of calling another function
    let value = parseInt(this.value);
    if (value>max) {
        this.value = max;
        } else if (value<min) {
            this.value = min;
        }
    
    createGrid(parseInt(this.value));
});

//2nd apprach add functions to revove/add style called from the windon event listeners
//works fine
// Setup our function to run on various events
var cellHighlight = function (event) {
    if(event.target.classList.contains('square')){
        
        event.target.classList.add('over');
        
        if (event.target.style.backgroundColor === "") {
            let hex = randomHexColor();
            event.target.style.backgroundColor = hex;
            
        } else{
            let styleString=event.target.style.filter;
            if (styleString===""){
                event.target.style.filter="brightness(90%)";
            } else{
                valuePosition=styleString.indexOf("%");
                currentBrightness=styleString.substr(valuePosition-2,2);
                newBrighness=parseInt(currentBrightness)-10;
                event.target.style.filter=`brightness(${newBrighness}%)`;

            }   
        }
    }
};

var cellRemoveHighlight = function (event) {
    if(event.target.classList.contains('over')){
        event.target.classList.remove('over');
    }
};


// // Add our event listeners
window.addEventListener('mouseover', cellHighlight, false);
window.addEventListener('mouseout', cellRemoveHighlight, false);



//another approach, similar to above
//works
// document.addEventListener('mouseover', function (event) {
//     if ( event.target.classList.contains( 'square' ) ) {
//         event.target.classList.add('over');
//     }
// }, false);

// document.addEventListener('mouseout', function (event) {
//     if ( event.target.classList.contains( 'over' ) ) {
//         event.target.classList.remove('over');
//     }
// }, false);


function randomInteger(max) {
    return Math.floor(Math.random()*(max + 1));
}

function randomRgbColor() {
    let r = randomInteger(255);
    let g = randomInteger(255);
    let b = randomInteger(255);
    return [r,g,b];
}

function randomHexColor() {
    let [r,g,b] =randomRgbColor();

    let hr = r.toString(16).padStart(2, '0');
    let hg = g.toString(16).padStart(2, '0');
    let hb = b.toString(16).padStart(2, '0');

    return "#" + hr + hg + hb;
}



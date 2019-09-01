const container = document.querySelector(".container");
let cells = setCells(16);
const clearBtn = document.querySelector(".clear");
const newGridBtn = document.querySelector(".newGrid");
const colorBtn = document.querySelector("[type='color']");
const penBtn = document.querySelector("[value='pen']");
const eraserBtn = document.querySelector("[value='eraser']");
const shadeBtn = document.querySelector("[value='shade']");
const rainbowBtn = document.querySelector("[value='rainbow']");
let penColor = "black";

updateCells();

clearBtn.addEventListener("click", clearCells);

colorBtn.addEventListener("change",()=>{
    penColor = colorBtn.value;
});

penBtn.addEventListener("click",()=>{
    penColor = "black";
});

eraserBtn.addEventListener("click",()=>{
    penColor = "white";
});

shadeBtn.addEventListener("click",()=>{
    penColor = "shade";
});

rainbowBtn.addEventListener("click",()=>{
    penColor = "rainbow";
});

newGridBtn.addEventListener("click", ()=>{
    let num = document.querySelector("[type='number']").value;
    cells.forEach((cell)=>{
        container.removeChild(cell);
    });
    cells = setCells(num);
    updateCells();
    let dim = 640/num;
    container.style.gridTemplate= "repeat("+ num + ","+ dim +"px) / repeat(" + num + ","+ dim +"px)";
});

function paint(e){
    if(penColor === "rainbow"){
        e.target.style = "";
        let ranR = Math.floor(Math.random()*255);
        let ranG = Math.floor(Math.random()*255);
        let ranB = Math.floor(Math.random()*255);
        e.target.style.backgroundColor = "rgb("+ranR+","+ranG+","+ranB+")";
    }else if(penColor === "shade"){
        e.target.style.backgroundColor = "black";
        if(e.target.style.opacity < 0.1){
            e.target.style.opacity = 0.1;
        }else if(e.target.style.opacity > 1){
            e.target.style.opacity = 1; 
        }else{
            e.target.style.opacity = parseFloat(e.target.style.opacity) + 0.1;
        }
    }else{
        e.target.style = "";
        e.target.style.backgroundColor = penColor;
    }
}

function clearCells(){
    cells.forEach((cell)=>{
        cell.style = "";
    });
}

function setCells(num){
    let myArray = [];
    for(let i = 0; i < num*num; i++){
        myArray.push(document.createElement("div"));
    }
    return myArray;
}

function updateCells(){ 
    cells.forEach((cell)=>{
        container.appendChild(cell);
        cell.addEventListener("mouseover", paint);
    });
}


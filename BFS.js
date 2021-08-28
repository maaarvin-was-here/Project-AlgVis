var canvas = document.getElementById('graphcanvas');
var submitbox = document.getElementById('input-text');
var statusText = document.getElementById('status-paragraph');
var openListObject = document.getElementById('open-list');
var closedListObject = document.getElementById('closed-list');

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var nodeArray = [];
var numberOfNodes = 0;
var currentNode;

var openlist = [];
var closedlist = [];

var nodeCoordinates = [
    [canvasWidth/2, 50], //1
    [canvasWidth/3.5, 125], //2
    [canvasWidth - canvasWidth/3.5, 125], //3
    [canvasWidth/6.5, 250], //4
    [canvasWidth/2.75, 250], //5
    [canvasWidth - canvasWidth/2.75, 250], //6
    [canvasWidth - canvasWidth/6.5, 250], //7
    [canvasWidth/12, 400], //8
    [canvasWidth/5, 400], //9
    [canvasWidth/3.25, 400], //10
    [canvasWidth/2.4, 400], //11
    [canvasWidth - canvasWidth/2.4, 400], //12
    [canvasWidth - canvasWidth/3.25, 400], //13
    [canvasWidth - canvasWidth/5, 400], //14
    [canvasWidth - canvasWidth/12, 400] //15

];

// ctx.arc(x coord, y coord, radius, start angle, end angle)

function loadcanvas(){
    if (canvas.getContext){
        var ctx = canvas.getContext('2d');
        connectNodes(ctx);
        drawTree(ctx);
    
        statusText.innerHTML = "Graph Created";
        
        openlist = [];
        openListObject.innerHTML = openlist.join();
        closedlist = [];
        closedListObject.innerHTML = closedlist.join();
        
        openlist.push(currentNode);
    }
}

function stepForward(){
    if (currentNode < numberOfNodes || (currentNode == 1 && numberOfNodes == 1)){
        if (canvas.getContext){
            var ctx = canvas.getContext('2d');
            
            connectNodes(ctx);
            drawTree(ctx);
            
            if (openlist.length > 0){   //while open list is not empty
                
                currentNode = openlist.shift();

                highlightCurrentNode(ctx, currentNode);
                
                
                var c1 = getLeftChild(currentNode);     //get first child
                var c2 = getRightChild(currentNode);    //get second child
                
                closedlist.push(currentNode);   //push current node to closed list
                closedListObject.innerHTML = closedlist.join();
                
                var newopennodes = "No nodes";
                
                if (c1 != -1){
                    openlist.push(c1);  //push first child to open list
                    newopennodes = c1.toString();
                }
                if (c2 != -1){
                    openlist.push(c2);  //push second child to open list
                    newopennodes += " and " + c2;
                }
                
                
                statusText.innerHTML = currentNode + " moved to CLOSED — " + newopennodes + " moved to OPEN";
                
                openListObject.innerHTML = openlist.join();
            } 
            if (numberOfNodes == 1){
                numberOfNodes--;
            }
        }  
    } else {
        statusText.innerHTML = "Enter new number of nodes to start over";
    }
}

function getLeftChild(node){
    if (node * 2 > numberOfNodes){
        return -1;  
    }
    return(node * 2);
}

function getRightChild(node){
    if ((node * 2) + 1 > numberOfNodes){
        return -1;  
    }
    return((node * 2) + 1);
}





function drawTree(ctx){
    
    for(i = 0; i < numberOfNodes; i++){
        ctx.fillStyle = 'rgb(225, 175, 238)';
        ctx.beginPath();
        ctx.arc((nodeCoordinates[i][0]), nodeCoordinates[i][1], 30, 0, 2*Math.PI);
        ctx.fill();
        ctx.stroke();
        
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.font = "24px Trebuchet MS";
        ctx.fillText(i + 1, nodeCoordinates[i][0] - 10, nodeCoordinates[i][1] + 10);
    }
}

function submittedNodeCount(count){
    submitbox.value = "";
    if (count !== null && count.match(/^[0-9]+$/)){
        if (count < 1 || count > 15) {
            alert("Number of nodes must be between 1 and 15");
        } else {
            currentNode = 1;
            statusText.innerHTML = "Root Node Initialized";
            numberOfNodes = parseInt(count);
            //createNodes();
            loadcanvas(); // go to loadcanvas
        }
    } else {
        alert("Please input a number");
    } 
}

function highlightCurrentNode(ctx, id){
    //ctx.strokeStyle = 'rgb(255, 255, 0)';
    //ctx.moveTo(nodeCoordinates[0][0], nodeCoordinates[0][1]);
    ctx.beginPath();
    ctx.arc((nodeCoordinates[id - 1][0]), nodeCoordinates[id - 1][1], 35, 0, 2*Math.PI);
    ctx.stroke();
}

function connectNodes(ctx){
    //numberOfNodes
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    for(i = 1; i < numberOfNodes; i++) {
        ctx.beginPath();
        ctx.moveTo(nodeCoordinates[i - 1][0], nodeCoordinates[i - 1][1]);
        if (((2 * i) - 1) > numberOfNodes - 1) {
            break;
        }
        ctx.lineTo(nodeCoordinates[(2 * i) - 1][0], nodeCoordinates[(2 * i) - 1][1]);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(nodeCoordinates[i - 1][0], nodeCoordinates[i - 1][1]);
        if (2 * i > numberOfNodes - 1) {
            break;
        }
        ctx.lineTo(nodeCoordinates[(2 * i)][0], nodeCoordinates[(2 * i)][1]);
        ctx.stroke();
    }
}







/*ctx.arc(canvasWidth/3.5, 125, 30, 0, 2*Math.PI);
    ctx.arc(canvasWidth - canvasWidth/3.5, 125, 30, 0, 2*Math.PI);

    ctx.arc(canvasWidth/6.5, 250, 30, 0, 2*Math.PI);
    ctx.arc(canvasWidth/2.75, 250, 30, 0, 2*Math.PI);
    ctx.arc(canvasWidth - canvasWidth/6.5, 250, 30, 0, 2*Math.PI);
    ctx.arc(canvasWidth - canvasWidth/2.75, 250, 30, 0, 2*Math.PI);
    
    ctx.arc(canvasWidth/12, 400, 30, 0, 2*Math.PI);
    ctx.arc(canvasWidth/5, 400, 30, 0, 2*Math.PI);
    ctx.arc(canvasWidth/3.25, 400, 30, 0, 2*Math.PI);
    ctx.arc(canvasWidth/2.4, 400, 30, 0, 2*Math.PI);
    
    ctx.arc(canvasWidth - canvasWidth/12, 400, 30, 0, 2*Math.PI);
    ctx.arc(canvasWidth - canvasWidth/5, 400, 30, 0, 2*Math.PI);
    ctx.arc(canvasWidth - canvasWidth/3.25, 400, 30, 0, 2*Math.PI);
    ctx.arc(canvasWidth - canvasWidth/2.4, 400, 30, 0, 2*Math.PI);
    */


class Node {
    constructor(id){
        this.id = id;
    }
    
    coordinates(){
        
    }
    
    label(){
    
    }
}


function createNodes() {
    for(i = 0; i < numberOfNodes; i++){
        nodeArray.push(new Node(i));
    }
}


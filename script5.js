window.onload = function () {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var objDistance = 20;
    var objAltura = 10;
    var objSize = 10;
    var espelhoPosition = { x: canvas.width / 2, y: canvas.height / 2 };
    var distancia = { x: 0, y: 0 };
    var focoDistance = 10;


    var isObjetoDragged = false;
    var initialMousePosition = { x: 0, y: 0 };
    var typeEspelho = 0;

    var heightInput = document.getElementById("height");
    var focusDistanceInput = document.getElementById("focus-distance");
    var objectDistanceInput = document.getElementById("object-distance");
    var imageHeight = document.getElementById("object-height");
    var imageDistance = document.getElementById("object-distance-info");
    var imageInfo = document.getElementById("mirror-image");
    var mirrorType = document.getElementById("mirror-type");

    heightInput.addEventListener("input", updateMirrorInfo);
    focusDistanceInput.addEventListener("input", updateMirrorInfo);
    objectDistanceInput.addEventListener("input", updateMirrorInfo);

    function updateMirrorInfo() {

        

        objAltura = Math.abs(parseInt(heightInput.value));
        focoDistance = Math.abs(parseInt(focusDistanceInput.value));
        objDistance = Math.abs(parseInt(objectDistanceInput.value));

        
        update();
    }


    var objetoPosition = {
        x: canvas.width / 2 - objDistance,
        y: canvas.height / 2
    };
    var imagemPosition = {
        x: 100,
        y: 200
    };


    var quantint = 150
    var tamanhoCelula = parseInt(canvas.width / quantint);
    var mult = 45
    ctx = context

    function calcReducedEquation(point1, point2) {
        const m = (point2.y - point1.y) / (point2.x - point1.x);
        const b = point1.y - m * point1.x;

        return { x: m, y: b };
    }


    function drawInfiniteLine(point1, point2) {
        const canvasWidth = ctx.canvas.width;
        const canvasHeight = ctx.canvas.height;


        const neewpoint = calcReducedEquation(point1, { x: parseInt(canvas.width / 2 + focoDistance * tamanhoCelula), y: tamanhoCelula * mult })



        neewpoint2 = calcReducedEquation(point1, { x: parseInt(canvas.width / 2 - focoDistance * tamanhoCelula), y: tamanhoCelula * mult })
        eq1 = calcReducedEquation({ x: objetoPosition.x, y: objetoPosition.y }, { x: parseInt(canvas.width / 2 - focoDistance * tamanhoCelula), y: parseInt(tamanhoCelula * mult) })
        //eq1 = calcReducedEquation(point1, {x:parseInt(canvas.width/2 - focoDistance*tamanhoCelula) ,y:tamanhoCelula * mult})
        // Desenhar a reta no canvas
        //createLine({ x: canvas.width / 2, y: objetoPosition.y },{x:0,y:0} )
        eq2 = calcReducedEquation({ x: objetoPosition.x, y: objetoPosition.y }, { x: parseInt(canvas.width / 2 - 2 * (focoDistance * tamanhoCelula)), y: tamanhoCelula * mult })
        if (typeEspelho != 0) {
            createLineDashed({ x: context.canvas.width / 2, y: objetoPosition.y }, { x: canvasWidth, y: canvasWidth * neewpoint2.x + neewpoint2.y })

            createLine({ x: context.canvas.width / 2, y: objetoPosition.y }, { x: 0, y: 0 * neewpoint2.x + neewpoint2.y }, "black")


            createLine({ x: objetoPosition.x, y: objetoPosition.y }, { x: 0, y: 0 * eq2.x + eq2.y }, "black")

            imagemPosition.x = (eq2.y - neewpoint2.y) / (neewpoint2.x - eq2.x);
            imagemPosition.y = eq2.x * imagemPosition.x + eq2.y
            imageDistance.textContent = (1 / (1 / (focoDistance * -1) - 1 / objDistance)).toFixed(2);
            imageHeight.textContent = (Math.abs((imageDistance.textContent / objDistance) * -1 * objAltura)).toFixed(2);
            //createLine({ x: context.canvas.width / 2, y: objetoPosition.y }, {x: canvas.width, y: canvas.width*neewpoint.x + neewpoint.y})
        } else {

            //prologamento 
            createLineDashed({ x: objetoPosition.x, y: objetoPosition.y }, { x: 0, y: 0 * eq1.x + eq1.y }, "red")
            createLineDashed({ x: canvas.width / 2, y: (canvas.width / 2) * eq1.x + eq1.y }, { x: canvas.width, y: (canvas.width / 2) * eq1.x + eq1.y }, "red")

            createLine({ x: objetoPosition.x, y: objetoPosition.y }, { x: canvas.width / 2, y: (canvas.width / 2) * eq1.x + eq1.y }, "red")
            createLine({ x: context.canvas.width / 2, y: objetoPosition.y }, { x: 0, y: 0 * neewpoint2.x + neewpoint2.y }, "red")
            createLine({ x: canvas.width / 2, y: (canvas.width / 2) * eq1.x + eq1.y }, { x: 0, y: (canvas.width / 2) * eq1.x + eq1.y }, "red")

            imagemPosition.y = (canvas.width / 2) * eq1.x + eq1.y;
            imagemPosition.x = (imagemPosition.y - neewpoint2.y) / neewpoint2.x;

            imageDistance.textContent = (1 / (1 / focoDistance - 1 / objDistance)).toFixed(2);
            imageHeight.textContent = (Math.abs((imageDistance.textContent / objDistance) * -1 * objAltura)).toFixed(2);
            //prolongamento
            createLineDashed({ x: context.canvas.width / 2, y: objetoPosition.y }, { x: canvasWidth, y: canvasWidth * neewpoint2.x + neewpoint2.y })
            createLine({ x: context.canvas.width / 2, y: objetoPosition.y }, { x: 0, y: 0 * neewpoint2.x + neewpoint2.y })
        }

    }


    drawInfiniteLine({ x: context.canvas.width / 2, y: objetoPosition.y }, { x: objetoPosition.x, y: tamanhoCelula * mult })

    function createLineDashed(point_start, point_end, color = "black") {

        context.setLineDash([5, 3]);
        createLine(point_start, point_end, color)
        context.setLineDash([]);

    }

    function createLine(point_start, point_end, color = "black") {

        context.beginPath();
        context.moveTo(point_start.x, point_start.y);
        context.lineTo(point_end.x, point_end.y);
        context.strokeStyle = color;

        context.lineWidth = 1;
        context.stroke();

    }



    function createGrid() {
        ctx = context

        if (objDistance == focoDistance && typeEspelho == 0)
            imageInfo.textContent = "Imagem no inifinito"
        else
            imageInfo.textContent = "Há Imagem"


        var corLinha = 'rgba(0, 0, 0, 0.2)';

        var pontoInicialX = canvas.width / 2;
        var pontoInicialY = 0;
        var pontoFinalX = canvas.width / 2;
        var pontoFinalY = canvas.width;




        createLine({ x: pontoInicialX, y: pontoInicialY }, { x: pontoFinalX, y: pontoFinalY })
        createLine({ x: 0, y: tamanhoCelula * mult }, { x: pontoFinalX * 2, y: tamanhoCelula * mult })





        for (var x = 0; x <= canvas.width; x += tamanhoCelula) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, canvas.height);
        }

        for (var y = 0; y <= canvas.height; y += tamanhoCelula) {
            ctx.moveTo(0, y);
            ctx.lineTo(canvas.width, y);
        }

        // Defina o estilo das linhas da grade
        ctx.strokeStyle = corLinha;
        ctx.lineWidth = 1;

        // Desenhe as linhas da grade
        ctx.stroke();

    };





    function desenharObj() {


        context.fillStyle = "blue";
        /*context.fillRect(
            objetoPosition.x - objSize / 2,
            objetoPosition.y - objSize / 2,
            objSize,
            objSize
        );*/
        //objetoPosition.x = (Math.abs(canvas.width / 2) - objDistance * tamanhoCelula);
        
        /*if (objAltura > mult) {
            console.log("shii")
            objetoPosition.y = tamanhoCelula * mult + Math.abs(objAltura * tamanhoCelula - tamanhoCelula);
        } else {
            objetoPosition.y = (Math.abs(tamanhoCelula * mult - objAltura * tamanhoCelula));
        }*/
        console.log(typeEspelho)
        if(typeEspelho == 0){
            objetoPosition.x = canvas.width/2 - objDistance*tamanhoCelula
        }else if(typeEspelho == 1){
            objetoPosition.x = canvas.width/2 + objDistance*tamanhoCelula
        }else if(objectDistanceInput.value < 0){
            objetoPosition.x = canvas.width/2 + objDistance*tamanhoCelula
        }else if(objectDistanceInput.value > 0){
            objetoPosition.x = canvas.width/2 - objDistance*tamanhoCelula
        }

        if(objetoPosition.y < tamanhoCelula*mult){
            objetoPosition.y = tamanhoCelula*mult - tamanhoCelula*objAltura;
        }else if(objetoPosition.y > tamanhoCelula*mult){
            objetoPosition.y = tamanhoCelula*mult + tamanhoCelula*objAltura;
        }else if(heightInput.value < 0){
            objetoPosition.y = tamanhoCelula*mult + tamanhoCelula*objAltura;
        }else if(heightInput.value > 0){
            objetoPosition.y = tamanhoCelula*mult - tamanhoCelula*objAltura;
        }

        context.fillRect(
            objetoPosition.x - objSize / 2,
            objetoPosition.y - objSize / 2,
            objSize,
            objSize
        );

        createLine({ x: objetoPosition.x, y: objetoPosition.y }, { x: objetoPosition.x, y: tamanhoCelula * mult })
        createLine({ x: objetoPosition.x, y: objetoPosition.y }, { x: canvas.width / 2, y: objetoPosition.y })


    }

    function desenharImagem() {

        context.fillStyle = "red";
        context.fillRect(
            imagemPosition.x - objSize / 2,
            imagemPosition.y - objSize / 2,
            objSize,
            objSize
        );
    }
    function desenharPointsMain() {

        //Convexo
        context.fillStyle = "Green";
        context.fillRect(
            parseInt(canvas.width / 2 - focoDistance * tamanhoCelula) - 5,
            tamanhoCelula * mult - 5,
            10,
            10

        );
        context.stroke();
        context.fillStyle = "purple";
        context.fillRect(
            parseInt(canvas.width / 2 - 2 * (focoDistance * tamanhoCelula)) - 5,
            tamanhoCelula * mult - 5,
            10,
            10

        );
        context.stroke();

        //concavo
        context.fillStyle = "Green";
        context.fillRect(
            parseInt(canvas.width / 2 + focoDistance * tamanhoCelula) - 5,
            tamanhoCelula * mult - 5,
            10,
            10

        );
        context.stroke();
        context.fillStyle = "purple";
        context.fillRect(
            parseInt(canvas.width / 2 + 2 * (focoDistance * tamanhoCelula)) - 5,
            tamanhoCelula * mult - 5,
            10,
            10

        );



    }


    function clear() {
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    function update() {
        
        clear();
        desenharObj();
        desenharPointsMain();
        createGrid();
        updateType();
        drawInfiniteLine({ x: context.canvas.width / 2, y: objetoPosition.y }, { x: objetoPosition.x, y: tamanhoCelula * mult })
        
        desenharImagem();
    }

    function mouseInObj(mousePosition) {
        var objetoLeft = objetoPosition.x - objSize / 2;
        var objetoRight = objetoPosition.x + objSize / 2;
        var objetoTop = objetoPosition.y - objSize / 2;
        var objetoBottom = objetoPosition.y + objSize / 2;

        return (
            mousePosition.x >= objetoLeft &&
            mousePosition.x <= objetoRight &&
            mousePosition.y >= objetoTop &&
            mousePosition.y <= objetoBottom
        );
    }

    canvas.addEventListener("mousedown", function (event) {
        var mousePosition = { x: event.clientX, y: event.clientY };

        if (mouseInObj(mousePosition)) {
            isObjetoDragged = true;
            initialMousePosition = mousePosition;
        }
    });

    canvas.addEventListener("mouseup", function () {
        isObjetoDragged = false;
    });
    function updateType(){
        if (objetoPosition.x < canvas.width / 2) {
            typeEspelho = 0;

            mirrorType.textContent = "Côncavo"
        } else if (objetoPosition.x - canvas.width / 2 < 1) {
            typeEspelho = 3
            mirrorType.textContent = "Não há"
        } else {
            typeEspelho = 1;
            mirrorType.textContent = "Convexo"
        }
    }
    canvas.addEventListener("mousemove", function (event) {
        // console.log(typeEspelho)
        // console.log(objetoPosition.x)
        //console.log(canvas.width/2)
        if (isObjetoDragged) {
            updateType();
            var currentMousePosition = { x: event.clientX, y: event.clientY };
            //console.log(Math.max(84,parseInt(currentMousePosition.x / tamanhoCelula))- Math.min(84,parseInt(currentMousePosition.x / tamanhoCelula)))
            objetoPosition.x = parseInt(currentMousePosition.x / tamanhoCelula) * tamanhoCelula;

            objetoPosition.y = parseInt(currentMousePosition.y / tamanhoCelula) * tamanhoCelula;

            objAltura = Math.abs(objetoPosition.y / tamanhoCelula - mult)
            heightInput.value = objAltura;
            if(currentMousePosition.x > canvas.width/2){
                typeEspelho = 1;
            }else if(currentMousePosition.x < canvas.width/2){
                typeEspelho = 0;
            }else{
                typeEspelho = 3;
            }
            objectDistanceInput.value = Math.abs(parseInt(canvas.width/2 - objetoPosition.x))/tamanhoCelula;
            //objectDistanceInput.value = Math.abs(parseInt((objetoPosition.x - tamanhoCelula * (quantint / 2 + 5)) / tamanhoCelula));
            objDistance = objectDistanceInput.value;

            distancia.x = (objetoPosition.x - espelhoPosition.x) * (1 - focoDistance / Math.abs(focoDistance));
            distancia.y = (objetoPosition.y - espelhoPosition.y) * (1 - focoDistance / Math.abs(focoDistance));

            initialMousePosition = currentMousePosition;

            update();
        }
    });


    update();
};

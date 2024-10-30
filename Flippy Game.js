
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");


var bird = new Image();
var bg = new Image();
var fg = new Image()
var pipeUp = new Image();
var pipeBottom = new Image();


bird.src = "flappy_bird_bird.png";
bg.src = "bg.png"
fg.src = "fg.png";/
pipeUp.src = "pipeUp.png";
pipeBottom.src = "pipeBottom.png";



var gap = 120;//Это расстояние между двумя препядствиями (верхним и нижним). Что-бы пица могла пролетать не задивая блоки препядствий



document.addEventListener("keydown", moveUp);
function moveUp() {
	yPos -= 35;
}


var pipe = []

pipe[0] = {
	x : cvs.width,
	y : 0
}//

var score = 0;

var xPos = 10;
var yPos = 150;
var grav = 2;

function draw() { 
	ctx.drawImage(bg, 0, 0);

	for(var i = 0; i < pipe.length; i++) {
	ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);

	ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y +
	pipeUp.height + gap);//но генерация нижнего блока будет принижена на 90 пикселей из-за pipeUp.height + gap (pipeUp - это верхнее препядствие, pipeUp.height - это высота всего верхнего блока, gap - это отступ между верхним и нижним препядствием) и их сложение дает этот отступ

	pipe[i].x--;//Заставляем блоки ,то есть кажда блок потому что в квадратных скобкаж объявлен цикл который перебирает все объекты в нем изи за метода в цикле pipe.length(pipe[i]) по x(иксу)двигаться вперед на 1(x--)

//Гинерация случайных отверстий в последующих препядствиях
	if(pipe[i].x == 125) {//если он начало изночальной позиции линия передвинулать на 125 пикселей то
	pipe.push({//появляются в массиве pipe нове объекты(объекты, мотому что после pipe.push и открытия скобки мы открыли еще и фигурную скобку)
	x : cvs.width,// объект препядствия (верхнего и нижнего ПРОСТО ОНИ УЖЕ ОБЪЕДИНЕНЫ ВМЕСТЕ в цикле for) будут появлятся за экраном. cvs.width вытесняет их за экран, потому что дальше чем ширина самого окна не видно (это охоже на метод в html -hidden-)
	y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height//и дыры появляюшиеся в объекте верхнего и нижниего препядстий можно генерировать подбором случайной высоты ,то есть Math.floor(Math.random() * pipeUp.height)(Math.floor - это округление до целого чила, Math.random() - это рандомизация случайного числа и округление до целого предыдущем методом floor) и вычитаем из этого всего - pipeUp.height для того, чтобы отверсте в препядствиях держалость в приделах экрана где мы хоть что-то видем
	});
	}

// Отслеживание прикосновений
	if(xPos + bird.width >= pipe[i].x
	&& xPos <= pipe[i].x + pipeUp.width
	&& (yPos <= pipe[i].y + pipeUp.height
	|| yPos + bird.height >= pipe[i].y + pipeUp.height + gap)
	|| yPos + bird.height >= cvs.height - fg.height) {//При задевании переднего фона
	location.reload(); // Перезагрузка страницы
	}
//Счет очков
	if(pipe[i].x == 5) {//если препядствие начинает выходить с левой стороны экрана значит прица прошла и…
	score++;//Наш счет будет увеличиваться на один при каждом успешном пролёте через отверстие
	score_audio.play();//И в это же время будет проигрываться score.mp3
	}
	}

	ctx.drawImage(fg, 0, cvs.height - fg.height);//Мы отображаем пережний фон (fg) с помошью метода drawImage, но он генерируесть в положении  0, cvs.height - fg.height (x = 0, y = cvs.height - fg.height) cvs - значит мы оброшаемся к всему дисплею, cvs.height - это высота всего экрана с игрой из которой мы вычитаем высоту заднего фона (- fg.height)

	ctx.drawImage(bird, xPos, yPos);//Мы отображаем птичку там где она появится после загрузки игры(bird) с помошью метода drawImage. А самое главное, что xPos, yPos равны 10 и 150 (55 строчка)


	yPos += grav;//Эта строка активируест 102 строку так как изночатьно yPos = 150 то grav непонятно как но понижает до нуля постопенно и медленно со скоростью 2
//Надписб с очками
	ctx.fillStyle = "#000";//Цвет текста
	ctx.font = "24px Arial";//Шрифт текста
	ctx.fillText("Счет: " + score, 10, cvs.height - 20);//ctx.fillText - для установки текта на экране (экран = ctx) 10, cvs.height расположение на экране

	requestAnimationFrame(draw);//Это метод постоянной анимации вниз в функции draw. Метод в этой фунции, потому что функция работает всегда и постоянно
}

pipeBottom.onload = draw;//Если все изображения загружены (в моем случае pipeBottom является последним загруженным файлом и если он загрузица значит загрузились и все остальные файлы) то мы вызываем функцию draw (59 строка) которая начинаем отображать задний фон. Поэтому если все изображения не загруженны поиграть вы не сможете


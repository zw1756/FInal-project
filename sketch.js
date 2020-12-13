
let map;
let map1;
let mapwidth = 30;
let dt = [];
let dtcolr=[];
let manDir = 0;
let manPosX = 0;
let manPosY = 5;

let badmanPosX = 6;
let badmanPosY = 6;
let badmanDir = -1;
let beecolor = [];
let mancolor = 0;
let score = 0;
let song1;
let level = 1;
let loseFlag = 0;
/* map对应的物体  0 什么都没有  1 豆子  2 人  3 墙壁 */

function preload() {
	song1 = loadSound('bg.mp3'); 
}

/* init function */
function setup() {
	createCanvas(600, 480);
	map = new Map(16,16);
	beecolor[0] = color(255, 204, 0);
	beecolor[1] = color(255, 0, 0);
	beecolor[2] = color(0, 204, 0);
	beecolor[3] = color(0, 0, 255);
	beecolor[4] = color(0, 255, 255);
	frameRate(5);
	song1.loop();
}

/* loop draw function */
function draw() {
	background(0);
	stroke('red'); // Change the color
	noFill();
	strokeWeight(4); // Make the points 1 pixels in size
	rect(0,0, 480, 480);
	map.update();
	map.badmanupdate();
	map.draw();
	
	//显示得分
	fill(255);
	textSize(16);
	text("score:"+score,500, 30);
	if(score>=100)
	{
		score = 0;
		level = level +1;
		map = new MapA(16,16);
		if(level>2)
		{
			fill(255);
			textSize(38);
			text("You Win", width/2-60, height/2);
			noLoop();
		}
	}
	if(loseFlag === 1){
		fill(255);
		textSize(38);
		text("You LOSE", width/2-60, height/2);
		noLoop();
	}
}

class Map{
	
	constructor(ln,col){
		this.ln = ln;
		this.col = col;
		for(let i = 0; i < ln; i++)
		{
			for(let j = 0; j < col; j++)
			{
				/* dt[i*col+j] = int(random(2));; */
				if(((i*col+j)%3)==0){
					dt[i*col+j] = 0;
				}else{
					dt[i*col+j] = 1;
				}
				dtcolr[i*col+j] = int(random(3));
			}
		}
		dt[badmanPosY*col+badmanPosX] = 4;
		//墙壁
		dt[1] = 3;dt[5] = 3;dt[7] = 3;dt[9] = 3;
		dt[17] = 3;dt[21] = 3;dt[23] = 3;dt[25] = 3;dt[27] = 3;dt[29] = 3;
		dt[33] = 3;dt[37] = 3;dt[39] = 3;dt[41] = 3;dt[43] = 3;dt[45] = 3;
		dt[49] = 3;dt[53] = 3;dt[55] = 3;dt[57] = 3;dt[59] = 3;dt[61] = 3;
		dt[65] = 3;dt[66] = 3;dt[68] = 3;dt[69] = 3;dt[71] = 3;dt[73] = 3;dt[75] = 3;dt[77] = 3;
		dt[87] = 3;dt[91] = 3;dt[93] = 3;
		dt[97] = 3;dt[98] = 3;dt[99] = 3;dt[100] = 3;dt[101] = 3;
		dt[103] = 3;dt[104] = 3;dt[105] = 3;dt[106] = 3;dt[107] = 3;dt[109] = 3;dt[110] = 3;
		for(let i=134;i<144;i++){
			dt[i]=3;
		}
		for(let i=136;i<149;i++){
			dt[i]=3;
		}
		dt[162] = 3;dt[164] = 3;dt[166] = 3;dt[168] = 3;
		for(let i=171;i<176;i++){
			dt[i]=3;
		}
		dt[178] = 3;dt[180] = 3;dt[182] = 3;dt[184] = 3;
		dt[194] = 3;dt[196] = 3;dt[198] = 3;dt[200] = 3;
		dt[210] = 3;dt[212] = 3;dt[214] = 3;dt[216] = 3;
		dt[226] = 3;dt[228] = 3;dt[230] = 3;dt[232] = 3;
		for(let i=202;i<207;i++){
			dt[i]=3;
		}
		dt[220] = 3;
		for(let i=236;i<239;i++){
			dt[i]=3;
		}
		/* dt[5] = 1;
		dt[18] = 1;
		dt[49] = 1;
		dt[57] = 1; */
		dt[manPosY*col+manPosX] = 2;
	}
	/* 根据键盘输入修改man的位置与方向 */
	update(){
		//console.log("update"+keyCode);
		if (keyCode === LEFT_ARROW) 
		{
			manDir = 0;
			if(manPosY===0){}
			else
			{
				dt[manPosY*this.col+manPosX] = 0;
				manPosY = manPosY - 1;
				if(dt[manPosY*this.col+manPosX] === 3)
				{
					manPosY = manPosY + 1;
					
				}
				else
				{
					if(dt[manPosY*this.col+manPosX] === 1)
					{
						//豆子 得分增加  颜色改变
						mancolor = dtcolr[manPosY*this.col+manPosX]
						score = score+1;
					}
				}
				dt[manPosY*this.col+manPosX] = 2;
			}
		}
		//方向键 向右
		if (keyCode === RIGHT_ARROW) 
		{
			manDir = 1;
			if(manPosY===(this.ln-1)){}
			else
			{
				dt[manPosY*this.col+manPosX] = 0;
				manPosY = manPosY + 1;
				if(dt[manPosY*this.col+manPosX] === 3)
				{
					manPosY = manPosY - 1;
					
				}
				else
				{
					if(dt[manPosY*this.col+manPosX] === 1)
					{
						//豆子 得分增加  颜色改变
						mancolor = dtcolr[manPosY*this.col+manPosX]
						score = score+1;
					}
					
				}
				dt[manPosY*this.col+manPosX] = 2;
			}
		}
		//方向键 向上
		if (keyCode === UP_ARROW) 
		{
			manDir = 2;
			if(manPosX===0){}
			else
			{
				dt[manPosY*this.col+manPosX] = 0;
				manPosX = manPosX - 1;
				if(dt[manPosY*this.col+manPosX] === 3)
				{
					manPosX = manPosX + 1;
					
				}
				else
				{
					if(dt[manPosY*this.col+manPosX] === 1)
					{
						//豆子 得分增加  颜色改变
						mancolor = dtcolr[manPosY*this.col+manPosX]
						score = score+1;
					}
				}
				dt[manPosY*this.col+manPosX] = 2;
			}
		}
		//方向键 向下
		if (keyCode === DOWN_ARROW) 
		{
			manDir = 3;
			if(manPosX===(this.col-1)){}
			else
			{
				dt[manPosY*this.col+manPosX] = 0;
				manPosX = manPosX + 1;
				if(dt[manPosY*this.col+manPosX] === 3)
				{
					manPosX = manPosX - 1;
					
				}
				else
				{
					if(dt[manPosY*this.col+manPosX] === 1)
					{
						//豆子 得分增加  颜色改变
						mancolor = dtcolr[manPosY*this.col+manPosX]
						score = score+1;
					}
				}
				dt[manPosY*this.col+manPosX] = 2;
			}
		}
		keyCode = 0;
	}
	
	/* */
	badmanupdate(){
		//console.log("update"+keyCode);
		if(badmanDir === -1){
			badmanDir = int(random(4));
		}
		badmanDir = int(random(4));
		console.log(badmanDir)
		if (badmanDir === 0) 
		{
			if(badmanPosY===0){
				badmanDir === -1
			}
			else
			{
				dt[badmanPosY*this.col+badmanPosX] = 1;
				badmanPosY = badmanPosY - 1;
				if(dt[badmanPosY*this.col+badmanPosX] === 3)
				{
					badmanPosY = badmanPosY + 1;
					badmanDir === -1
				}
				else if(dt[badmanPosY*this.col+badmanPosX] === 2)
				{
					loseFlag = 1;
				}
				else
				{
				}
				dt[badmanPosY*this.col+badmanPosX] = 4;
			}
		}
		//方向键 向右
		if (badmanDir === 1) 
		{
			if(badmanPosY===(this.ln-1)){
				badmanDir === -1
			}
			else
			{
				dt[badmanPosY*this.col+badmanPosX] = 1;
				badmanPosY = badmanPosY + 1;
				if(dt[badmanPosY*this.col+badmanPosX] === 3)
				{
					badmanPosY = badmanPosY - 1;
					badmanDir === -1
				}
				else if(dt[badmanPosY*this.col+badmanPosX] === 2)
				{
					loseFlag = 1;
				}
				else
				{
					
				}
				dt[badmanPosY*this.col+badmanPosX] = 4;
			}
		}
		//方向键 向上
		if (badmanDir === 2) 
		{
			if(badmanPosX===0){
				badmanDir === -1
			}
			else
			{
				dt[badmanPosY*this.col+badmanPosX] = 1;
				badmanPosX = badmanPosX - 1;
				if(dt[badmanPosY*this.col+badmanPosX] === 3)
				{
					badmanPosX = badmanPosX + 1;
					badmanDir === -1
				}
				else if(dt[badmanPosY*this.col+badmanPosX] === 2)
				{
					loseFlag = 1;
				}
				else
				{
					
				}
				dt[badmanPosY*this.col+badmanPosX] = 4;
			}
		}
		//方向键 向下
		if (badmanDir === 3) 
		{
			if(badmanPosX===(this.col-1)){
				badmanDir === -1
			}
			else
			{
				dt[badmanPosY*this.col+badmanPosX] = 1;
				badmanPosX = badmanPosX + 1;
				if(dt[badmanPosY*this.col+badmanPosX] === 3)
				{
					badmanPosX = badmanPosX - 1;
					badmanDir === -1
				}
				else if(dt[badmanPosY*this.col+badmanPosX] === 2)
				{
					loseFlag = 1;
				}
				else
				{
				}
				dt[badmanPosY*this.col+badmanPosX] = 4;
			}
		}
	}
	
	draw(){
		for(let i = 0; i < this.ln; i++)
		{
			for(let j = 0; j < this.col; j++)
			{
				if(dt[i*this.col+j] ===0)
				{
					//空
				}
				else if(dt[i*this.col+j] ===1)
				{//豆子
					stroke(beecolor[dtcolr[i*this.col+j]]); // Change the color
					fill(beecolor[dtcolr[i*this.col+j]]);
					strokeWeight(1); // Make the points 1 pixels in size
					circle(i*mapwidth+mapwidth/2, j*mapwidth+mapwidth/2,mapwidth/6);
				}
				else if(dt[i*this.col+j] ===2)
				{//人
					stroke(beecolor[mancolor]); // Change the color
					fill(beecolor[mancolor]);
					strokeWeight(1); // Make the points 1 pixels in size
					//circle(i*mapwidth+mapwidth/2, j*mapwidth+mapwidth/2,mapwidth-3);
					if(manDir === 0)
					{//左
						arc(i*mapwidth+mapwidth/2, j*mapwidth+mapwidth/2,mapwidth-3,mapwidth-3, PI+QUARTER_PI, PI - QUARTER_PI);
						stroke(0); // Change the color
						fill(0);
						circle((i*mapwidth+mapwidth/2)+3, (j*mapwidth+mapwidth/2)-5,2);
					}
					else if(manDir === 1)
					{//右
						arc(i*mapwidth+mapwidth/2, j*mapwidth+mapwidth/2,mapwidth-3,mapwidth-3, QUARTER_PI, TWO_PI - QUARTER_PI);
						stroke(0); // Change the color
						fill(0);
						circle((i*mapwidth+mapwidth/2)-3, (j*mapwidth+mapwidth/2)-5,2);
					}
					else if(manDir === 2)
					{//上
						arc(i*mapwidth+mapwidth/2, j*mapwidth+mapwidth/2,mapwidth-3,mapwidth-3, TWO_PI - QUARTER_PI, PI + QUARTER_PI);
						stroke(0); // Change the color
						fill(0);
						circle((i*mapwidth+mapwidth/2)-5, (j*mapwidth+mapwidth/2)+3,2);
					}
					else
					{//下
						arc(i*mapwidth+mapwidth/2, j*mapwidth+mapwidth/2,mapwidth-3,mapwidth-3, PI-QUARTER_PI, QUARTER_PI);
						stroke(0); // Change the color
						fill(0);
						circle((i*mapwidth+mapwidth/2)-5, (j*mapwidth+mapwidth/2)-3,2);
					}
					
				}
				else if(dt[i*this.col+j] ===4)
				{//坏人
					stroke(beecolor[4]); // Change the color
					fill(beecolor[4]);
					strokeWeight(1); // Make the points 1 pixels in size
					let posx = i*mapwidth+mapwidth/2;
					let posy = j*mapwidth+mapwidth/2;
					//arc(i*mapwidth+mapwidth/2, j*mapwidth+mapwidth/2,mapwidth-3,mapwidth-3, 0, PI);
					arc(posx, posy,mapwidth-3,mapwidth-3, 0, PI);
					let posx1 = i*mapwidth;
					let posy1 = j*mapwidth+mapwidth/2;
					let posx2 = i*mapwidth+mapwidth/2;
					let posy2 = j*mapwidth;
					let posx3 = i*mapwidth+mapwidth;
					let posy3 = j*mapwidth+mapwidth/2;
					triangle(posx1, posy1, posx2, posy2, posx3, posy3); 
					stroke(0); // Change the color
					fill(0);
					circle((i*mapwidth+mapwidth/2), (j*mapwidth+mapwidth/2),3); 
				}
				else
				{
					//墙壁
					stroke('purple'); // Change the color
					//noFill();
					fill('purple');
					strokeWeight(1); // Make the points 1 pixels in size
					rect(i*mapwidth, j*mapwidth, mapwidth, mapwidth);
					//fill(0, 102, 153, 51);
					//text(i*this.col+j,i*mapwidth, (j+1)*mapwidth);
				}
			}
		}
	}
}

//level 2
class MapA{
	
	constructor(ln,col){
		this.ln = ln;
		this.col = col;
		for(let i = 0; i < ln; i++)
		{
			for(let j = 0; j < col; j++)
			{
				if(((i*col+j)%5)==0){
					dt[i*col+j] = 0;
				}else{
					dt[i*col+j] = 1;
				}
				dtcolr[i*col+j] = int(random(3));
			}
		}
		//墙壁
		dt[24] = 3;
		for(let i=32;i<38;i++){
			dt[i]=3;
		}
		for(let i=40;i<48;i++){
			dt[i]=3;
		}
		for(let i=69;i<74;i++){
			dt[i]=3;
		}
		for(let i=77;i<84;i++){
			dt[i]=3;
		}
		dt[85] = 3;dt[89] = 3;dt[93] = 3;
		dt[99] = 3;dt[101] = 3;dt[105] = 3;dt[107] = 3;dt[109] = 3;
		dt[115] = 3;dt[117] = 3;dt[121] = 3;dt[123] = 3;dt[125] = 3;
		dt[137] = 3;dt[139] = 3;dt[141] = 3;
		dt[147] = 3;dt[149] = 3;dt[153] = 3;dt[155] = 3;dt[157] = 3;
		
		for(let i=160;i<164;i++){
			dt[i]=3;
		}
		dt[165] = 3;dt[169] = 3;dt[173] = 3;
		for(let i=181;i<186;i++){
			dt[i]=3;
		}
		for(let i=189;i<192;i++){
			dt[i]=3;
		}
		for(let i=208;i<214;i++){
			dt[i]=3;
		}
		for(let i=216;i<224;i++){
			dt[i]=3;
		}
		dt[232] = 3;
		dt[manPosY*col+manPosX] = 2;
	}
	/* 根据键盘输入修改man的位置与方向 */
	update(){
		//console.log("update"+keyCode);
		if (keyCode === LEFT_ARROW) 
		{
			manDir = 0;
			if(manPosY===0){}
			else
			{
				dt[manPosY*this.col+manPosX] = 0;
				manPosY = manPosY - 1;
				if(dt[manPosY*this.col+manPosX] === 3)
				{
					manPosY = manPosY + 1;
					
				}
				else
				{
					if(dt[manPosY*this.col+manPosX] === 1)
					{
						//豆子 得分增加  颜色改变
						mancolor = dtcolr[manPosY*this.col+manPosX]
						score = score+1;
					}
				}
				dt[manPosY*this.col+manPosX] = 2;
			}
		}
		//方向键 向右
		if (keyCode === RIGHT_ARROW) 
		{
			manDir = 1;
			if(manPosY===(this.ln-1)){}
			else
			{
				dt[manPosY*this.col+manPosX] = 0;
				manPosY = manPosY + 1;
				if(dt[manPosY*this.col+manPosX] === 3)
				{
					manPosY = manPosY - 1;
					
				}
				else
				{
					if(dt[manPosY*this.col+manPosX] === 1)
					{
						//豆子 得分增加  颜色改变
						mancolor = dtcolr[manPosY*this.col+manPosX]
						score = score+1;
					}
					
				}
				dt[manPosY*this.col+manPosX] = 2;
			}
		}
		//方向键 向上
		if (keyCode === UP_ARROW) 
		{
			manDir = 2;
			if(manPosX===0){}
			else
			{
				dt[manPosY*this.col+manPosX] = 0;
				manPosX = manPosX - 1;
				if(dt[manPosY*this.col+manPosX] === 3)
				{
					manPosX = manPosX + 1;
					
				}
				else
				{
					if(dt[manPosY*this.col+manPosX] === 1)
					{
						//豆子 得分增加  颜色改变
						mancolor = dtcolr[manPosY*this.col+manPosX]
						score = score+1;
					}
				}
				dt[manPosY*this.col+manPosX] = 2;
			}
		}
		//方向键 向下
		if (keyCode === DOWN_ARROW) 
		{
			manDir = 3;
			if(manPosX===(this.col-1)){}
			else
			{
				dt[manPosY*this.col+manPosX] = 0;
				manPosX = manPosX + 1;
				if(dt[manPosY*this.col+manPosX] === 3)
				{
					manPosX = manPosX - 1;
					
				}
				else
				{
					if(dt[manPosY*this.col+manPosX] === 1)
					{
						//豆子 得分增加  颜色改变
						mancolor = dtcolr[manPosY*this.col+manPosX]
						score = score+1;
					}
				}
				dt[manPosY*this.col+manPosX] = 2;
			}
		}
		keyCode = 0;
	}
	
	badmanupdate(){
		//console.log("update"+keyCode);
		if(badmanDir === -1){
			
		}
		badmanDir = int(random(4));
		if (badmanDir === 0) 
		{
			if(badmanPosY===0){
				badmanDir === -1
			}
			else
			{
				dt[badmanPosY*this.col+badmanPosX] = 1;
				badmanPosY = badmanPosY - 1;
				if(dt[badmanPosY*this.col+badmanPosX] === 3)
				{
					badmanPosY = badmanPosY + 1;
					badmanDir === -1
				}
				else if(dt[badmanPosY*this.col+badmanPosX] === 2)
				{
					loseFlag = 1;
				}
				else
				{
				}
				dt[badmanPosY*this.col+badmanPosX] = 4;
			}
		}
		//方向键 向右
		if (badmanDir === 1) 
		{
			if(badmanPosY===(this.ln-1)){
				badmanDir === -1
			}
			else
			{
				dt[badmanPosY*this.col+badmanPosX] = 1;
				badmanPosY = badmanPosY + 1;
				if(dt[badmanPosY*this.col+badmanPosX] === 3)
				{
					badmanPosY = badmanPosY - 1;
					badmanDir === -1
				}
				else if(dt[badmanPosY*this.col+badmanPosX] === 2)
				{
					loseFlag = 1;
				}
				else
				{
					
					
				}
				dt[badmanPosY*this.col+badmanPosX] = 4;
			}
		}
		//方向键 向上
		if (badmanDir === 2) 
		{
			if(badmanPosX===0){
				badmanDir === -1
			}
			else
			{
				dt[badmanPosY*this.col+badmanPosX] = 1;
				badmanPosX = badmanPosX - 1;
				if(dt[badmanPosY*this.col+badmanPosX] === 3)
				{
					badmanPosX = badmanPosX + 1;
					badmanDir === -1
				}
				else if(dt[badmanPosY*this.col+badmanPosX] === 2)
				{
					loseFlag = 1;
				}
				else
				{
					
				}
				dt[badmanPosY*this.col+badmanPosX] = 4;
			}
		}
		//方向键 向下
		if (badmanDir === 3) 
		{
			if(badmanPosX===(this.col-1)){
				badmanDir === -1
			}
			else
			{
				dt[badmanPosY*this.col+badmanPosX] = 1;
				badmanPosX = badmanPosX + 1;
				if(dt[badmanPosY*this.col+badmanPosX] === 3)
				{
					badmanPosX = badmanPosX - 1;
					badmanDir === -1
				}
				else if(dt[badmanPosY*this.col+badmanPosX] === 2)
				{
					loseFlag = 1;
				}
				else
				{
				}
				dt[badmanPosY*this.col+badmanPosX] = 4;
			}
		}
	}
	
	draw(){
		for(let i = 0; i < this.ln; i++)
		{
			for(let j = 0; j < this.col; j++)
			{
				if(dt[i*this.col+j] ===0)
				{
					//空
				}
				else if(dt[i*this.col+j] ===1)
				{//豆子
					stroke(beecolor[dtcolr[i*this.col+j]]); // Change the color
					fill(beecolor[dtcolr[i*this.col+j]]);
					strokeWeight(1); // Make the points 1 pixels in size
					circle(i*mapwidth+mapwidth/2, j*mapwidth+mapwidth/2,mapwidth/6);
				}
				else if(dt[i*this.col+j] ===2)
				{//人
					stroke(beecolor[mancolor]); // Change the color
					fill(beecolor[mancolor]);
					strokeWeight(1); // Make the points 1 pixels in size
					//circle(i*mapwidth+mapwidth/2, j*mapwidth+mapwidth/2,mapwidth-3);
					if(manDir === 0)
					{//左
						arc(i*mapwidth+mapwidth/2, j*mapwidth+mapwidth/2,mapwidth-3,mapwidth-3, PI+QUARTER_PI, PI - QUARTER_PI);
						stroke(0); // Change the color
						fill(0);
						circle((i*mapwidth+mapwidth/2)+3, (j*mapwidth+mapwidth/2)-5,2);
					}
					else if(manDir === 1)
					{//右
						arc(i*mapwidth+mapwidth/2, j*mapwidth+mapwidth/2,mapwidth-3,mapwidth-3, QUARTER_PI, TWO_PI - QUARTER_PI);
						stroke(0); // Change the color
						fill(0);
						circle((i*mapwidth+mapwidth/2)-3, (j*mapwidth+mapwidth/2)-5,2);
					}
					else if(manDir === 2)
					{//上
						arc(i*mapwidth+mapwidth/2, j*mapwidth+mapwidth/2,mapwidth-3,mapwidth-3, TWO_PI - QUARTER_PI, PI + QUARTER_PI);
						stroke(0); // Change the color
						fill(0);
						circle((i*mapwidth+mapwidth/2)-5, (j*mapwidth+mapwidth/2)+3,2);
					}
					else
					{//下
						arc(i*mapwidth+mapwidth/2, j*mapwidth+mapwidth/2,mapwidth-3,mapwidth-3, PI-QUARTER_PI, QUARTER_PI);
						stroke(0); // Change the color
						fill(0);
						circle((i*mapwidth+mapwidth/2)-5, (j*mapwidth+mapwidth/2)-3,2);
					}
					
				}
				else
				{
					//墙壁
					stroke('purple'); // Change the color
					//noFill();
					fill('purple');
					strokeWeight(1); // Make the points 1 pixels in size
					rect(i*mapwidth, j*mapwidth, mapwidth, mapwidth);
					//fill(0, 102, 153, 51);
					//text(i*this.col+j,i*mapwidth, (j+1)*mapwidth);
				}
			}
		}
	}
}
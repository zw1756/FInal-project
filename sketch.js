
let map;
let map1;
let mapwidth = 30;
let dt = [];
let dtcolr=[];
let manDir = 0;
let manPosX = 0;
let manPosY = 5;
let beecolor = [];
let mancolor = 0;
let score = 0;
let level = 1;
/* map对应的物体  0 什么都没有  1 豆子  2 人  3 墙壁 */

function preload() {
}

/* init function */
function setup() {
	createCanvas(600, 480);
	map = new Map(16,16);
	beecolor[0] = color(255, 204, 0);
	beecolor[1] = color(255, 0, 0);
	beecolor[2] = color(0, 204, 0);
	beecolor[3] = color(0, 0, 255);
	frameRate(5);
}

/* loop draw function */
function draw() {
	background(0);
	stroke('purple'); // Change the color
	noFill();
	strokeWeight(1); // Make the points 1 pixels in size
	rect(0,0, 480, 480);
	map.update();
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
}

class Map{
	
	constructor(ln,col){
		this.ln = ln;
		this.col = col;
		for(let i = 0; i < ln; i++)
		{
			for(let j = 0; j < col; j++)
			{
				dt[i*col+j] = 1;
				dtcolr[i*col+j] = int(random(3));
			}
		}
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

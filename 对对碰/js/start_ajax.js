window.onload = function(){
    var obj = new func();

    function func() {
        this.left = document.getElementById("left"); /*用户名盒子*/
        this.right = document.getElementById("right"); /*分类*/
        this.table = document.getElementsByTagName("table")[0]; /*游戏主空间*/
        this.img_list = {};
        
        this.makedate = function() {
            var conter = 0;
            var str = "";
            var img_arr = [];
            var src;
            while (conter < 72) {
                var id = Math.floor(Math.random() * 36) + 1;
                if (this.img_list[id] == 2) {
                    continue;
                } else {
                    if (this.img_list[id] == 1) {
                        this.img_list[id]++;
                    } else {
                        this.img_list[id] = 1;
                    }
                    img_arr.push(`img/img (${id}).jpg`);

                    conter++;
                }
            }

            for (let i = 0; i < 6; i++) {
                str += `<tr>`;
                for (let j = 0; j < 12; j++) {
                    src = img_arr.pop();
                    str += `<td><img src="${src}" alt="" /><div class="zz"></div></td>`
                }
                str += `</tr>`;
            }
            this.table.innerHTML = str;
        }
        this.makedate();



        this.time = document.getElementById("time"); /*游戏倒计时*/

        this.minute = document.getElementsByClassName("minute")[0]; /*分钟*/
        this.secound = document.getElementsByClassName("secound")[0]; /*秒钟*/
        this.temp = 1200; /*总时长/秒*/
        this.set = null; /*存储定时器*/
        this.timer = function() {
            this.set = setInterval(function() {
                obj.temp = obj.temp - 1;
                obj.minute.innerHTML = pluszero(Math.floor(obj.temp / 60));

                obj.secound.innerHTML = pluszero(Math.floor(obj.temp % 60));

                if (obj.temp <= 0) {
                    clearInterval(obj.set);
                    obj.end.style.visibility = "visible";
                }
            }, 1000)
        }

        function pluszero(num) /*补零*/ {
            if (num < 10)
                return "0" + num;
            return num;
        }

        this.end = document.getElementById("end"); /*结束界面*/
        this.end.onclick = function() {
            location.reload();
        }

        this.footer = document.getElementsByTagName("footer")[0]; /*音频*/
        this.footer.onmouseover = function() {
            this.style.transition = "1s"
            this.style.opacity = "1";
        }
        this.footer.onmouseout = function() {
            this.style.transition = "1s"
            this.style.opacity = "0.3";
        }

        



        this.zz = document.getElementsByClassName("zz"); /*未翻牌前遮罩层*/
		var arr = [];
        var that = this;
        
        for (let i = 0; i < this.zz.length; i++) {
            this.zz[i].onclick = function() {
                if(this.className != "zz hide"){/*避免连击*/
	                var parent_td = this.parentNode;
	                var img = parent_td.firstChild;
	                var src = img.src;
	                this.classList.add("hide");
	                
	                arr.push({
	                	zz:   this,/*存储遮罩层*/
	                	td:   parent_td,/*存储td*/
	                	src:  img.src/*存储图片路径，用于比较*/
	                });
	
	                var len = arr.length
	                /*当前图片是第2张*/
	                if (len % 2 == 0) {
	                    setTimeout(function() {
	                    	/*选择图片成功*/
	                        if (arr[len-1].src ==  arr[len-2].src) {
	                            arr[len-1].td.classList.add("hid");
	                            arr[len-2].td.classList.add("hid");
	                        } else /*选择图片失败时*/ {
	                            arr[len-1].zz.classList.remove("hide");
	                            arr[len-2].zz.classList.remove("hide");
	                        }
	                        /*清空缓存变量*/
							arr.shift();
							arr.shift();
							// 判断游戏是否结束
							if(document.getElementsByClassName('hid').length >= 72) {
								clearInterval(that.set);
								alert("游戏结束");
							}
	                    }, 300);
	                }
	            }
            }
        }
	}
    obj.timer();
}

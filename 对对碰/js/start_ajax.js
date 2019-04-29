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

        this.ado = document.getElementById("audio"); /*音频播放器*/
        this.btn = document.getElementsByClassName("btn"); /*上一首,播放/暂停,下一首*/
        this.progress_in = document.getElementById("progress_in"); /*获取音频进度条*/
        this.voice_in = document.getElementById("voice_in"); /*获取音频音量进度条*/
        this.a = 0; /*判断播放暂停*/

        this.btn[1].onclick = function() /*播放暂停*/ {
            if (obj.a == 0) {
                this.src = "img/未标题-4.jpg";
                obj.ado.play();
                obj.a++;
            } else {
                this.src = "img/未标题-5.jpg";
                obj.ado.pause();
                obj.a--;
            }
        }

        this.Time = function(num) {
            var minute = Math.floor(num / 60) >= 10 ? Math.floor(num / 60) : "0" + Math.floor(num / 60);
            var seconds = Math.floor(num % 60) >= 10 ? Math.floor(num % 60) : "0" + Math.floor(num % 60);
            return minute + ":" + seconds;
        }
        this.begin = document.getElementById("begin"); /*开始时间*/
        this.stop = document.getElementById("stop"); /*总时长*/
        this.time_now = null;
        this.time_progress = null;
        this.ball = document.getElementsByClassName("ball"); /*进度条滚珠*/
        this.ado.onloadedmetadata = function() {
            obj.stop.innerHTML = obj.Time(this.duration);

            obj.time_now = setInterval(function() {
                obj.begin.innerHTML = obj.Time(obj.ado.currentTime);
            }, 1000);

            obj.time_progress = setInterval(function() {
                var now = obj.ado.currentTime / obj.ado.duration * 480;
                obj.progress_in.style.width = now + "px";
                obj.ball[0].style.left = now + "px";
            }, 1000);
        }

        this.progress = document.getElementById("progress");
        this.voice = document.getElementById("voice");

        this.progress.onclick = function(e) {
            var client = e.clientX;
            var LeftOffset = this.offsetLeft;
            var widthChick = client - LeftOffset;
            var ratio = widthChick / 480;

            //				debugger
            obj.progress_in.style.width = widthChick + "px";
            /* * * 兼容性问题 * * */
            //				obj.ado.currentTime = Math.floor(ratio*obj.ado.duration);
            //				console.log(ratio*obj.ado.duration)
        }

        this.voice.onclick = function(e) {
            var client = e.clientX;
            var LeftOffset = this.offsetLeft;
            var widthChick = client - LeftOffset;
            var ratio = widthChick / 120;

            obj.voice_in.style.width = widthChick + "px";
            obj.ball[1].style.marginLeft = widthChick + "px";
            obj.ado.volume = ratio;
        }

        this.current = [];
        this.type = 0;
        this.btn[3].onclick = function() {
            if (obj.type == 0) {
                obj.current[0] = obj.ado.volume;
                obj.current[1] = obj.voice_in.style.width;
                obj.current[2] = obj.ball[1].style.marginLeft

                obj.ado.volume = 0;
                obj.voice_in.style.width = 0 + "px";
                obj.ball[1].style.marginLeft = 0 + "px";
                obj.type++;
            } else {
                obj.ado.volume = obj.current[0];
                obj.voice_in.style.width = obj.current[1];
                obj.ball[1].style.marginLeft = obj.current[2];
                obj.type--;
            }
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
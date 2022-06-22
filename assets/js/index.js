const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)



const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const volup = $('.btn-volup');
const voldown = $('.btn-voldown');

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,

    songs: [

        {
            name: "Nevada - Đi Đi Đi",
            singer: "Daniel Mastro, K-ICM, T-ICM, Kelsey, Zicky",
            path: "./assets/music/song10.mp3",
            image: "./assets/images/song10.jpg"

        },

        {
            name: "Không Quan Tâm",
            singer: "Chi Dân",
            path: "./assets/music/song1.mp3",
            image: "./assets/images/song1.jpg"

        },

        {
            name: "Anh Không Sao Đâu",
            singer: "Chi Dân",
            path: "./assets/music/song2.mp3",
            image: "./assets/images/song2.jpg"

        },

        {
            name: "Người Tôi Yêu Chẳng Hề Yêu Tôi",
            singer: "Chi Dân",
            path: "./assets/music/song3.mp3",
            image: "./assets/images/song3.jpg"

        },

        {
            name: "Người Yêu Tôi Lạnh Lùng Sắt Đá",
            singer: "Mr.Siro",
            path: "./assets/music/song4.mp3",
            image: "./assets/images/song4.jpg"

        },
        {
            name: "Sài Gòn Đau Lòng Quá",
            singer: "Hứa Kim Tuyền, Hoàng Duyên",
            path: "./assets/music/song5.mp3",
            image: "./assets/images/song5.jpg"

        },
        {
            name: "Alone",
            singer: "Alan Walker,Noonie Bao ",
            path: "./assets/music/song6.mp3",
            image: "./assets/images/song6.jpg"

        },
        {
            name: "Faded",
            singer: "Alan Walker",
            path: "./assets/music/song7.mp3",
            image: "./assets/images/song7.jpg"

        },
        {
            name: "Một Bước Yêu Vạn Dặm Đau",
            singer: "Mr.Siro",
            path: "./assets/music/song8.mp3",
            image: "./assets/images/song8.jpg"

        },
        {
            name: "Sài Gòn Hôm Nay Mưa",
            singer: "JSOL, Hoàng Duyên",
            path: "./assets/music/song9.mp3",
            image: "./assets/images/song9.jpg"

        },
        {
            name: "Thế Giới Thứ 4 (Tự Yêu Chính Mình)",
            singer: "Chi Dân",
            path: "./assets/music/song11.mp3",
            image: "./assets/images/song11.jpg"

        },
        {
            name: "Họ Yêu Ai Mất Rồi",
            singer: "Doãn Hiếu",
            path: "./assets/music/song12.mp3",
            image: "./assets/images/song12.jpg"

        },
        {
            name: "Oranger 7!!!",
            singer: "7!!!",
            path: "./assets/music/song13.mp3",
            image: "./assets/images/song13.jpg"

        },
        {
            name: "Phi Điểu Và Ve Sầu",
            singer: "Nhậm Nhiên",
            path: "./assets/music/song14.mp3",
            image: "./assets/images/song14.jpg"

        },
        {
            name: "Người Theo Đuổi Ánh Sáng (VN)",
            singer: "Huy Vạc",
            path: "./assets/music/song15.mp3",
            image: "./assets/images/song15.jpg"

        },
        {
            name: "Đau Để Trưởng Thành",
            singer: "OnlyC",
            path: "./assets/music/song16.mp3",
            image: "./assets/images/song16.jpg"

        },
        {
            name: "Đã Lỡ Yêu Em Nhiều",
            singer: "JustaTee",
            path: "./assets/music/song17.mp3",
            image: "./assets/images/song17.jpg"

        },

    ],

    // 1: trả về list music
    render: function () {

        const htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index = ${index}>
            <div class="thumb" 
            style="background-image: url('${song.image}')">
            </div>
            <div class="body">
              <h3 class="title">${song.name}</h3>
              <p class="author">${song.singer}</p>
            </div>
            <div class="option">
              <i class="fas fa-ellipsis-h"></i>
            </div>
          </div>
            `
        })
        $('.playlist').innerHTML = htmls.join('')
    },


    // cú pháp Object.defineProperty(object, property, {value : value})
    defineProperties: function () {
        Object.defineProperty(this, 'currentSong', {
            get: function () {
                return this.songs[this.currentIndex]
            }
        })
    },

    // chứa các chức năng được sử dụng
    handleEvent: function () {
        // 2:
        //  set offsetWidth bởi document element ( đây là kích thước cũ trc khi scroll)
        const cdWidth = cd.offsetWidth;

        // DOM thao tác onscroll
        document.onscroll = function () {
            // thao tác vs trục dọc
            const scrollTop = window.scrollY;
            // kích thước mới sẽ bằng kích thước cũ trừ đi scroll 
            const newWidth = cdWidth - scrollTop;

            cd.style.width = newWidth > 0 ? newWidth + 'px' : 0;
            cd.style.opacity = newWidth / cdWidth
        }

        //4: xử lý cd xoay tròn
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 20000, // set 10s
            iterations: Infinity
        })
        cdThumbAnimate.pause();

        //3: play music btn
        playBtn.onclick = function () {
            //    if esle đơn giản app = app
            if (app.isPlaying) {
                // app.isPlaying = false
                audio.pause()
                // player.classList.remove('playing')
            }
            else {
                // app.isPlaying = true
                audio.play()
                // player.classList.add('playing')
            }
        }
        // 11: volume
    
        volup.onclick = function (e) {
           
            if(audio.volume < 1){
                audio.volume += 0.1;
            }else{
                audio.volume = 1;
            }
        };
        
        voldown.onclick = function (e) {
         
            if(audio.volume > 0){
                audio.volume -= 0.1;
            }else{
                audio.volume = 0;
            }
        };
        // có thể sử dụng app hoặc tạo 1 const _this = this được định nghĩa ở handle,
        // ( không sử dụng this vì nó sẽ gọi lại function hiện tại là playBtn)

        //  khi song được play sự kiện này sẽ diễn ra khi gọi audio.play() ở trên
        audio.onplay = function () {
            app.isPlaying = true
            player.classList.add('playing')

            // đĩa xoay khi play
            cdThumbAnimate.play()
        }

        //  khi song bị pause
        audio.onpause = function () {
            app.isPlaying = false
            player.classList.remove('playing')

            // đĩa dừng khi pause
            cdThumbAnimate.pause()
        }
        // xử lý thanh progress khi bài hát đang phát với ontimeupdate
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent;
            }
        }

        // xử lý khi tua nhanh bài hát
        progress.onchange = function (e) {
            const sekkTime = audio.duration / 100 * e.target.value
            audio.currentTime = sekkTime;
        }

        nextBtn.onclick = function () {
            if (app.isRandom) {
                app.playRandomSong()
            }
            else {
                app.nextSong()
            }

            audio.play()
            app.render()
            app.scrollToActiveSong()

        }
        prevBtn.onclick = function () {
            if (app.isRandom) {
                app.playRandomSong()
            }
            else {
                app.prevSong()
            }

            audio.play()
            app.render()
            app.scrollToActiveSong()
        }

        //6: random music
        randomBtn.onclick = function (e) {
            app.isRandom = !app.isRandom
            randomBtn.classList.toggle('active', app.isRandom);


        }
        //7: xử lý khi muốn lặp lại bài hát
        repeatBtn.onclick = function (e) {
            app.isRepeat = !app.isRepeat
            repeatBtn.classList.toggle('active', app.isRepeat);
        }
        // xử lý khi bài hát hiện tại kết thúc
        audio.onended = function () {
            if (app.isRepeat) {
                audio.play()
            }
            else {
                nextBtn.click();
            }
        }

        //10: xử lý khi click vào play list
        playlist.onclick = function (e) {
            const songNode = e.target.closest('.song:not(.active)')
            if (songNode || e.target.closest('.option')) {
                if (songNode) {
                    app.currentIndex = Number(songNode.dataset.index);
                    app.loadCurrenSong();
                    app.scrollToActiveSong()
                    app.render()
                    audio.play()


                }
            }
        }

    },
    //9: cuộn xuống khi bài hát được active
    scrollToActiveSong: function () {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            })
        }, 100)

    },
    // xử lý khi click play,bài hát đầu tiên/hiện tại được xử lý
    loadCurrenSong: function () {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}`
        audio.src = this.currentSong.path

        // console.log(heading, cdThumb, audio)

    },
    // 5: chuyển bài hát tiếp theo
    nextSong: function () {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrenSong()
    },
    //  chuyển lại bài hát trước
    prevSong: function () {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrenSong()
    },

    //6: random khi đã kích hoạt
    playRandomSong: function () {
        let newIndex
        do {
            newIndex = Math.floor(Math.random() * app.songs.length)

        }
        while (newIndex === this.currentIndex);

        this.currentIndex = newIndex
        this.loadCurrenSong()
    },


    // hàm này chứa các hàm khác
    start: function () {
        // Định nghĩa các thuộc tính cho Object
        this.defineProperties();

        // lắng nghe/xử lý các sự kiện DOM event
        this.handleEvent();

        // Tải  thông tin bài hát dầu tiên khi chương trình chạy
        this.loadCurrenSong()
        // render xuất các playlist
        this.render();

    }

}

app.start()


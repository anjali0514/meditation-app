const app =() =>{
    const song = document.querySelector('.song')
    const play = document.querySelector('.play');
    const outline=document.querySelector('.moving-outline circle');
    const video =document.querySelector('.vid-container video')

    const sounds = document.querySelectorAll('.sound button');

    const timeDisplay= document.querySelector('.time-display');

    const outlineLength=outline.getTotalLength();
    const timeSelect = document.querySelectorAll('.time-select button');

    let fakeDuration=600;

    outline.style.strokeDasharray=outlineLength;
    outline.style.strokeDashoffset=outlineLength;

    play.addEventListener("click",()=>{
        checkPlayaing(song);
    })

    const checkPlayaing = song =>{
        if (song.paused){
           song.play();
           video.play();
           play.src = "./svg/pause.svg" 
        }else{
            song.pause();
            video.pause();
            play.src="./svg/play.svg";
        }
    }

    song.ontimeupdate = () =>{
        let currentTime =song.currentTime;
        let elapsed =fakeDuration-currentTime;
        let seconds =Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed /60);
        timeDisplay.textContent= `${minutes}:${seconds}`;

        let progress = outlineLength - (currentTime/fakeDuration)*outlineLength;
        outline.style.strokeDashoffset = progress;


        if (currentTime >= fakeDuration){
            song.currentTime=0;
            song.pause();
            video.pause();
            play.src="./svg/play.svg";
        }
    }
    timeSelect.forEach(ele =>{
        ele.addEventListener("click", function()  {
        fakeDuration= this.getAttribute('data-time');
        timeDisplay.textContent= `${Math.floor(fakeDuration/60)}:00`;
    })
    })

    sounds.forEach(soundButton =>{
        soundButton.addEventListener("click",function(){
            song.src = this.getAttribute('data-sound');
            video.src =this.getAttribute('data-video');
            play.src="./svg/play.svg";

        })
    })
    
}

app();
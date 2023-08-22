// get to DOM elememts
const gameContainer = document.querySelector(".container"),
    userResult = document.querySelector(".user_result img"),
    cpuResult = document.querySelector(".cpu_result img"),
    result = document.querySelector(".result"),
    optionImages = document.querySelectorAll(".option_image");

// loop through each option image element
optionImages.forEach((image, index) =>{
    image.addEventListener("click",(e) => {
      image.classList.add("active");
    
      // 遊戲結束後再點一次選擇圖片，將玩家與電腦的圖片重置ROCK，文字改為 WAIT
      userResult.src=cpuResult.src = "images/rock.png";
      result.textContent="Wait..."; 
      
      // loop through each option image again
      optionImages.forEach((image2, index2) =>{
        // if the current index doesn't match the clickd index
        // remove the "active" class from the other option images
        index !== index2 && image2.classList.remove("active");
      });

      gameContainer.classList.add("start");

    // set a timeout to delay the result caculation 
    let time = setTimeout(() => {
        gameContainer.classList.remove("start");

        // get the source of the clicked option image
        let imageSrc = e.target.querySelector("img").src;
        // set the user image to clicked option image
        userResult.src=imageSrc;

        // generate a rnadom number between 0 and 2
        let randomNumber = Math.floor(Math.random() * 3);
        // create an array of CPU image options
        let cpuImages = ["images/rock.png", "images/paper.png", "images/scissors.png"];
        cpuResult.src = cpuImages[randomNumber];

        // assign a letter value to the CPU option (R=rock, P=paper, S=scissors)
        let cpuValue = ["R","P","S"][randomNumber];
        // assign a letter value to the clicked option
        let userValue = ["R","P","S"][index];

        // create a object with all possible outcomes
        let outcomes = {
            RR: "Draw",
            RP: "Cpu",
            RS: "User",
            PP: "Draw",
            PR: "User",
            PS: "Cpu",
            SS: "Draw",
            SR: "Cpu",
            SP: "User",      
        };

        // look up the outcome value based on user and cpu options
        let outComeValue = outcomes[userValue + cpuValue];
        
        // display the result
        result.textContent = userValue === cpuValue ? "Match Draw" : `${outComeValue} Won!!`;
    },2500)      

    })
})
document.addEventListener("DOMContentLoaded", () => {
    const tweetInput = document.getElementById("tweetInput");
    const tweetButton = document.getElementById("tweetButton");
    const tweetsContainer = document.getElementById("tweetsContainer");
    const tweetImageInput = document.getElementById("tweetImageInput"); 

    const loadTweets = () => {
        const tweets = JSON.parse(localStorage.getItem("tweets")) || [];
        tweetsContainer.innerHTML = "";
        tweets.forEach(tweet => displayTweet(tweet));
    };

    const displayTweet = (tweet) => {
        const tweetDiv = document.createElement("div");
        tweetDiv.classList.add("tweet");

        tweetDiv.innerHTML = `
            <p>${tweet.text}</p>
            ${tweet.image ? `<img src="${tweet.image}" alt="Tweet image" class="tweet-image"/>` : ""}
            <button class="like-button" data-likes="${tweet.likes}">❤️ ${tweet.likes}</button>
        `;

        tweetsContainer.prepend(tweetDiv);

        tweetDiv.querySelector(".like-button").addEventListener("click", () => {
            tweet.likes++;
            localStorage.setItem("tweets", JSON.stringify(tweets));
            loadTweets();
        });
    };

    tweetButton.addEventListener("click", () => {
        const text = tweetInput.value.trim();
        const image = tweetImageInput.files[0]; 

        if (text || image) {
            const newTweet = { 
                text, 
                likes: 0,
                image: image ? URL.createObjectURL(image) : null 
            };
            
            const tweets = JSON.parse(localStorage.getItem("tweets")) || [];
            tweets.push(newTweet);
            localStorage.setItem("tweets", JSON.stringify(tweets));
            loadTweets();
            tweetInput.value = "";
            tweetImageInput.value = "";
        }
    });

    loadTweets(); 
});

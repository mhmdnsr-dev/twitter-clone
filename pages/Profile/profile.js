import {
  cryatTwets,
  TWEETMOREOPTION,
  handelMoreOtion,
  handelSearchUser,
  creatfetchTwit,
  userImageHandler,
} from "../../helper/helper.js";
import fetchData from "../../helper/Ajax.js";

const profilePhoto = document.getElementById("profilePhoto");
// const twitsLest = document.getElementById("twitsLest");
const nameUser = document.getElementById("nameUser");
const handleuser = document.getElementById("handleuser");
const topName = document.getElementById("topName");
const backToHome = document.getElementById("backToHome");
const coverPhoto = document.getElementById("coverPhoto");
const twitterhome = document.getElementById("twitterhome");
const accountName = document.querySelector(".account-name");
const accountNameIMG = document.querySelector(".account img");

///////lcalstorage
const isStaticUser = localStorage.getItem("static-user");
const users = JSON.parse(localStorage.getItem("users")) || [];
const currentUser = users.find((user) => user.taken) || {};
if (isStaticUser) {
  const staticUsers = JSON.parse(localStorage.getItem("static-users"));
  const currentStaticUser = staticUsers.find(
    (user) => user.handleuser === isStaticUser
  );
  currentUser["img-signup"] = currentStaticUser.src;
  currentUser["fulln-signup"] = currentStaticUser.name;
  currentUser["usr-signup"] = currentStaticUser.handleuser;
}

accountNameIMG.src =
  currentUser["img-signup"] || "../../assets/images/defualt-person-img-96.png";
accountName.textContent = currentUser["fulln-signup"];
profilePhoto.src =
  currentUser["img-signup"] || "../../assets/images/defualt-person-img-96.png";
nameUser.innerHTML = currentUser["fulln-signup"];
handleuser.innerHTML = `${currentUser["usr-signup"]}`;
topName.innerHTML = currentUser["fulln-signup"];

backToHome.addEventListener("click", () => {
  location.pathname = "/pages/Home/home.html";
});
twitterhome.addEventListener("click", () => {
  location.pathname = "/pages/Home/home.html";
});

coverPhoto.src = "../../assets/images/twitter-default-cover.jpg";

const tweetsArr = JSON.parse(localStorage.getItem("tweetsArr")) || [];
const currentTweets =
  tweetsArr.find((tweets) => tweets.userId === currentUser.id) || {};

if (isStaticUser) {
} else if (currentTweets.userId) {
  cryatTwets(
    currentTweets,
    currentUser["usr-signup"],
    currentUser["fulln-signup"],
    currentUser["img-signup"]
  );
}

fetchData(creatfetchTwit);
setTimeout(() => {
  handelMoreOtion(TWEETMOREOPTION);
  userImageHandler();
}, 2500);
handelSearchUser();
/////
////////////////// logout
const logoutBord = document.createElement("div");
logoutBord.innerHTML = `
<span >logout</span>
`;
logoutBord.style = `border-radius: 9px;
    background-color: rgb(148 149 149 / 67%);
    position: absolute;
    left: 0px;
    text-align: center;
    padding: 9px 40px;`;
const logoutBtn = document.querySelector(".account");
logoutBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  logoutBtn.appendChild(logoutBord);
  logoutBord.addEventListener("click", (e) => {
    setTimeout(() => {
      location.pathname = "/index.html";
    }, 500);
  });
});
document.addEventListener("click", (e) => {
  logoutBord.remove();
});

///// redirect to profile page
document.querySelector(".home-feature.eight").addEventListener("click", (e) => {
  localStorage.removeItem("static-user");
  location.pathname = "/pages/Profile/profile.html";
});

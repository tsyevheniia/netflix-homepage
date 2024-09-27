const tabItems = document.querySelectorAll(".tab-item");
const tabContentItems = document.querySelectorAll(".tab-content-item");

function selectItem(item) {
  removeBorder();
  removeShow();
  this.classList.add("tab-border");
  const tabContentItem = document.querySelector(`#${this.id}-content`);
  tabContentItem.classList.add("show");
}
function removeBorder() {
  tabItems.forEach((item) => item.classList.remove("tab-border"));
}
function removeShow() {
  tabContentItems.forEach((item) => item.classList.remove("show"));
}

tabItems.forEach((item) => item.addEventListener("click", selectItem));

function validateEmail(event) {
  const emailInput = document.getElementById("email-input");
  const emailValue = emailInput.value;

  if (emailValue === "") {
    alert("Please enter your email address.");
    emailInput.focus();
    event.preventDefault();
    return false;
  }

  window.location.href =
    "https://www.netflix.com/signup/registration?locale=en-PL";
  return true;
}

//api
document
  .getElementById("search-btn")
  .addEventListener("click", searchOnYoutube);
document.getElementById("search").addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    searchOnYoutube();
  }
});

let apiKey = "AIzaSyBCdqAAUk5tEuwoVqm2s-XbYIpKbvZ1cuw";
let divContainer = document.getElementById("youtube-result");
let divYoutubeContainer = document.getElementById("search-youtube-form");
let section = document.getElementsByClassName("search-youtube");

async function searchOnYoutube() {
  let searchInput = document.getElementById("search").value;
  try {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${searchInput}&key=${apiKey}&type=video&maxResults=1`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    showResult(data.items);
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

function showResult(items) {
  divContainer.innerHTML = "";
  items.forEach((item) => {
    let title = item.snippet.title;
    let videoUrl = `https://www.youtube.com/embed/${item.id.videoId}`;

    let videoElement = document.createElement("div");

    let videoTitle = document.createElement("h3");
    videoTitle.textContent = title;

    let iframe = document.createElement("iframe");
    iframe.src = videoUrl;
    iframe.width = "560";
    iframe.height = "315";
    iframe.frameBorder = "0";
    iframe.allow =
      "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;

    videoElement.appendChild(videoTitle);
    videoElement.appendChild(iframe);

    divContainer.appendChild(videoElement);
  });
  section[0].style.height = "35em";
}

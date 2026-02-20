//script for header//
const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active");
});

//scroll detection


//ripple feedback on icons
const icons = document.querySelectorAll('.social-icons .icon');

icons.forEach(icon => {
  icon.addEventListener('click', () => {
    icon.classList.add('clicked');
    setTimeout(() => icon.classList.remove('cicked'), 200);
  });
});

//script for popup and redirection for recommendations
function shareRecommendation() {
  //ask user which platform
  let platform = prompt(
    "choose where to share:\n1 = WhatsApp Chat\n2 = WhatsApp Status\n3 = Instagram\n4 = Facebook\n5 = Other",
    "1"
  );

  if (!platform) return; //cancelled

  const message = encodeURIComponent(
    "i highly recommend this digital soutions business! Check them out: https://****"
  );

  let url = "";

  switch(platform) {
    case "1":// WhatsApp Chat
     url = 'https://wa.me/?text=${message}';
     break;
    case "2":// WhatsApp Status
    navigator.clipboard.writeText(decodeURIComponent(message));
     alert("Open WhatsApp and post the following message to your status:\n\n" + decodeURIComponent(message));
     return;
    case "3":// Instagram
    navigator.clipboard.writeText(decodeURIComponent(message));
     alert("Open Instagram and create a post with this message:\n\n" + decodeURIComponent(message));
     return;
    case "4":// Facebook
     url = 'https://www.facebook.com/sharer/sharer .php?u=https://****&quote=${message}';
     break;
    case "5":// Other
    navigator.clipboard.writeText(decodeURIComponent(message));
     alert("Copy this message and share anywhere:\n\n" + decodeURIComponent(message));
     return;
    default:
      alert("Invalid choice!");
      return;
  }

  //Open URL in new tab
  if (url) window.open(url, "_blank");
}

//smart trigger logic for ripple
const ripple = document.getElementById("scrollRipple");
const supportCard = document.getElementById("supportCard");

//scroll on support card on click
ripple.addEventListener("click", () => {
  supportCard.scrollIntoView({ behavior: "smooth"});
});

//stop ripple when support card enters into view
const supportObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      ripple.style.display = "none"; //hide ripple
    } else {
      ripple.style.display = "block"; //show ripple again if out of view
    }
  });
}, {
  threshold: 0.6 // 60% of card visible
});

supportObserver.observe(supportCard);

//draggable + toggle + mobile keyboard trigger for bot
const helpBtn = document.getElementById("helpBtn");
const chatBox = document.getElementById("salesBot");
const chatInput = document.getElementById("botInput");
const sendBtn = document.getElementById("sendBtn");
const chatMessages = document.getElementById("botMessages");

chatMessages.innerHTML = localStorage.getItem("chatHistory") || "";
chatMessages.scrollTop = chatMessages.scrollHeight;

//toggle chatbox visibility
helpBtn.addEventListener("click", () => {
  if(chatBox.style.display === "flex") {
    chatBox.style.display = "none";
  } else {
    chatBox.style.display = "flex";
    chatInput.focus(); //mobile keyboard triggers automatically
  }
});

function saveChatHistory() {
  localStorage.setItem("chatHistory", chatMessages.innerHTML);
}
//send message
sendBtn.addEventListener("click", () => {
  const msg = chatInput.value.trim();
  if(!msg)return;
  chatMessages.innerHTML += `<div class="user-msg">You: ${msg}</div>`;
  chatInput.value = "";
  chatMessages.scrollTop = chatMessages.scrollHeight;

  saveChatHistory();
  //Optional bot response
  setTimeout(() => {
    chatMessages.innerHTML += `<div class="bot-msg">Tour Assistant: Thanks for your message!</div>`;
    chatMessages.scrollTop = chatMessages.scrollHeight;
    saveChatHistory();
  }, 600);
});
//initial help btn position
const initPos = {
  top: window.innerHeight -80, //same as css top calc(100vh - 80px)
  left: 20
};
helpBtn.style.top = initPos.top + "px";
helpBtn.style.left = initPos.left + "px";
//make draggable
let isDragging1 = false, offsetX1 = 0, offsetY1 = 0;
let resetTimer1;

helpBtn.addEventListener("mousedown", (e) => {
  isDragging1 = true;
  offsetX1 = e.clientX - helpBtn.offsetLeft;
  offsetY1 = e.clientY - helpBtn.offsetTop;
  helpBtn.style.cursor = "grabbing";
  //cancel any pending reset while dragging
 if(resetTimer1) clearTimeout(resetTimer1); 
});

document.addEventListener("mousemove", (e) => {
  if(!isDragging1) return;
  let left = e.clientX - offsetX1;
  let top = e.clientY - offsetY1;
  //keep button inside viewport
  left = Math.max(0, Math.min(window.innerWidth - helpBtn.offsetWidth, left));
  top = Math.max(0, Math.min(window.innerHeight - helpBtn.offsetHeight, top));

  helpBtn.style.left = left + "px";
  helpBtn.style.top = top + "px";
});
document.addEventListener("mouseup", () => {
  if (isDragging1) {
     isDragging1 = false;
     helpBtn.style.cursor = "grab";
    //start timeout to return to initial position after 5s
     resetTimer1 = setTimeout(() => {
       helpBtn.style.transition = "top 0.5s, left 0.5s";//smooth animation
       helpBtn.style.top = initPos.top + "px";
       helpBtn.style.left = initPos.left + "px";
    //remove transition after animation
       setTimeout(() => {
         helpBtn.style.transition = "";
       }, 500);
     }, 10000); //5000ms = 5seconds
  }
});
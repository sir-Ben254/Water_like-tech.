// Smooth scroll to pricing card
document.querySelectorAll('.price-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const targetId = this.parentElement.dataset.target;
        const target = document.getElementById(targetId);
        if(target){
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Scroll Reveal Animation
const cards = document.querySelectorAll('.card');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.2 });

cards.forEach(card => {
    card.style.opacity = "0";
    card.style.transform = "translateY(40px)";
    card.style.transition = "all 0.8s ease";
    observer.observe(card);
});

// ================= CURRENCY AUTO DETECT =================
const currency = Intl.NumberFormat().resolvedOptions().locale.includes("KE") ? "KES" : "USD";

document.querySelectorAll(".price").forEach(priceEl => {
    let value = priceEl.textContent.replace(/[^\d]/g,'');
    if(value){
        priceEl.textContent = currency === "KES"
            ? "KES " + (value * 130).toLocaleString()
            : "$" + value;
    }
});

// ================= COUNTER ANIMATION =================
const counters = document.querySelectorAll(".counter");

const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            const el = entry.target;
            const target = +el.dataset.target;
            let count = 0;
            const speed = target / 100;

            const update = () => {
                count += speed;
                if(count < target){
                    el.textContent = Math.floor(count);
                    requestAnimationFrame(update);
                } else {
                    el.textContent = target;
                }
            };

            update();
        }
    });
},{threshold:0.5});

counters.forEach(counter => counterObserver.observe(counter));

// ================= WHATSAPP SEND =================
const phone = "YOUR_PHONE_NUMBER"; // Replace with 2547XXXXXXXX

function sendWhatsApp(message){
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
    showPopup();
}

// ORDER FORM
document.getElementById("orderForm").addEventListener("submit", function(e){
    e.preventDefault();

    const msg = `
NEW ORDER
Name: ${o_name.value}
Email: ${o_email.value}
Phone: ${o_phone.value}
Service: ${o_service.value}
Details: ${o_details.value}
    `;

    sendWhatsApp(msg);
    this.reset();
});

// CONTACT FORM
document.getElementById("contactForm").addEventListener("submit", function(e){
    e.preventDefault();

    const msg = `
NEW INQUIRY
Name: ${c_name.value}
Email: ${c_email.value}
Message: ${c_message.value}
    `;

    sendWhatsApp(msg);
    this.reset();
});

// ================= POPUP =================
function showPopup(){
    const popup = document.getElementById("popup");
    popup.classList.add("show");
    setTimeout(()=>popup.classList.remove("show"),4000);
}
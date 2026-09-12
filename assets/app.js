const products=[
{id:1,name:"Samsung Bespoke 36" 29 cu. ft. 4-Door French Door Refrigerator",category:"Refrigeration",price:3199,was:3499,image:"assets/images/refrigerator.webp",rating:4.8,reviews:214,badge:"Best Seller",source:"https://www.homedepot.com/p/Samsung-Bespoke-36-29-cu-ft-Standard-Depth-Charcoal-Glass-Black-Charcoal-4-Door-French-Door-Refrigerator-with-AI-Family-Hub-RF90F29AECE/333935897"},
{id:2,name:"LG WM4000HBA Front Load Washer 4.5 cu. ft.",category:"Laundry",price:929,was:1199,image:"assets/images/washer.webp",rating:4.7,reviews:186,badge:"Top Rated",source:"https://www.lg.com/us/washers-dryers/lg-wm4000hba-front-load-washer"},
{id:3,name:"Ninja Air Fryer Pro XL",category:"Kitchen",price:109,was:139,image:"assets/images/air-fryer.webp",rating:4.9,reviews:342,badge:"Sale",source:"https://www.walmart.com/ip/Ninja-Air-Fryer-Sage/14269551674"},
{id:4,name:"Dyson V15 Detect Cordless Vacuum",category:"Cleaning",price:649.99,was:849.99,image:"assets/images/vacuum.webp",rating:4.6,reviews:121,badge:"Popular",source:"https://www.dyson.com/vacuum-cleaners/cordless/v15/detect-yellow"},
{id:5,name:"KitchenAid Artisan Series 5-Quart Stand Mixer",category:"Kitchen",price:399.99,was:499.99,image:"assets/images/mixer.webp",rating:4.8,reviews:203,badge:"Value",source:"https://www.kitchenaid.com/countertop-appliances/stand-mixers/tilt-head-stand-mixers/p.artisan-series-5-quart-tilt-head-stand-mixer.ksm150psvb.html"},
{id:6,name:"GE Profile 1.1 Cu. Ft. Countertop Microwave",category:"Kitchen",price:425,was:479,image:"assets/images/microwave.webp",rating:4.5,reviews:98,badge:"Featured",source:"https://www.geappliances.com/appliance/GE-Profile-1-1-Cu-Ft-Countertop-Microwave-Oven-PEM31SFSS"},
{id:7,name:"Frigidaire 8,000 BTU Window Air Conditioner",category:"Climate",price:254,was:299,image:"assets/images/air-conditioner.webp",rating:4.6,reviews:164,badge:"Seasonal",source:"https://www.homedepot.com/p/Frigidaire-8-000-BTU-Window-Air-Conditioner-Cools-350-sq-ft-with-WiFi-with-Remote-in-White-115V-FHWW084TE1/331515389"},
{id:8,name:'Samsung 65" Class S90F OLED 4K Smart TV',category:"Entertainment",price:2499,was:2799,image:"assets/images/smart-tv.webp",rating:4.7,reviews:277,badge:"Deal",source:"https://news.samsung.com/us/samsung-2025-tv-audio-lineup-vision-ai-pre-order/"}
];
let cart=JSON.parse(localStorage.getItem("nifaCart")||"[]");
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const grid=$("#productGrid"), search=$("#searchInput"), filter=$("#categoryFilter");
function money(n){return new Intl.NumberFormat("en-US",{style:"currency",currency:"USD"}).format(n)}
function renderProducts(){
 const q=search.value.toLowerCase().trim(), c=filter.value;
 const filtered=products.filter(p=>(c==="All"||p.category===c)&&(`${p.name} ${p.category}`.toLowerCase().includes(q)));
 grid.innerHTML=filtered.map(p=>`<article class="product-card">
 <div class="product-media"><img src="${p.image}" alt="${p.name}"><span class="badge ${p.badge==="Sale"||p.badge==="Deal"?"sale":""}">${p.badge}</span></div>
 <div class="product-body"><span class="product-category">${p.category}</span><h3>${p.name}</h3>
 <div class="rating">★★★★★ <span>${p.rating} (${p.reviews})</span></div>
 <div class="price-row"><span class="price">${money(p.price)}</span><span class="was">${money(p.was)}</span></div>
 <a class="source-link" href="${p.source}" target="_blank" rel="noopener">Price reference ↗</a>
 <div class="product-actions"><button class="mini-btn" onclick="showToast('Product details preview')">Quick view</button><button class="btn btn-primary" onclick="addToCart(${p.id})">Add to cart</button></div>
 </div></article>`).join("") || `<p>No products match your search.</p>`;
}
window.addToCart=id=>{const found=cart.find(x=>x.id===id);if(found)found.qty++;else cart.push({id,qty:1});saveCart();showToast("Added to cart");};
function saveCart(){localStorage.setItem("nifaCart",JSON.stringify(cart));renderCart()}
function renderCart(){
 const count=cart.reduce((s,x)=>s+x.qty,0);$("#cartCount").textContent=count;
 if(!cart.length){$("#cartItems").innerHTML='<div class="cart-empty">Your cart is empty.<br><small>Add an appliance to get started.</small></div>';$("#cartSubtotal").textContent=money(0);return}
 let subtotal=0;
 $("#cartItems").innerHTML=cart.map(line=>{const p=products.find(x=>x.id===line.id);subtotal+=p.price*line.qty;return `<div class="cart-line"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><small>${line.qty} × ${money(p.price)}</small></div><button class="remove-item" onclick="removeItem(${p.id})">Remove</button></div>`}).join("");
 $("#cartSubtotal").textContent=money(subtotal);
}
window.removeItem=id=>{cart=cart.filter(x=>x.id!==id);saveCart()};
function showToast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),1800)}window.showToast=showToast;
function openCart(){ $("#cartDrawer").classList.add("open"); $("#cartDrawer").setAttribute("aria-hidden","false");}
function closeCart(){ $("#cartDrawer").classList.remove("open"); $("#cartDrawer").setAttribute("aria-hidden","true");}
$("#cartBtn").addEventListener("click",openCart);$("#closeCart").addEventListener("click",closeCart);$("#cartOverlay").addEventListener("click",closeCart);
search.addEventListener("input",renderProducts);filter.addEventListener("change",renderProducts);
$$(".category-card").forEach(b=>b.addEventListener("click",()=>{filter.value=b.dataset.category;renderProducts();document.querySelector("#shop").scrollIntoView()}));
$("#menuBtn").addEventListener("click",()=>$("#navMenu").classList.toggle("open"));
$$(".nav-links a").forEach(a=>a.addEventListener("click",()=>$("#navMenu").classList.remove("open")));
$("#supportForm").addEventListener("submit",e=>{e.preventDefault();$("#formNote").textContent="Thanks — your demo support request was captured locally.";showToast("Support request ready");e.target.reset()});
$("#newsletterForm").addEventListener("submit",e=>{e.preventDefault();showToast("Subscribed for demo updates");e.target.reset()});
$("#checkoutBtn").addEventListener("click",()=>showToast("Checkout is ready for payment integration"));
renderProducts();renderCart();
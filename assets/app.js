const products=[
{id:1,name:"French Door Refrigerator",category:"Refrigeration",price:1899,was:2199,image:"assets/images/refrigerator.svg",rating:4.8,reviews:214,badge:"Best Seller"},
{id:2,name:"Front Load Washer 4.5 cu. ft.",category:"Laundry",price:849,was:999,image:"assets/images/washer.svg",rating:4.7,reviews:186,badge:"Top Rated"},
{id:3,name:"Digital Air Fryer 6 QT",category:"Kitchen",price:109,was:139,image:"assets/images/air-fryer.svg",rating:4.9,reviews:342,badge:"Sale"},
{id:4,name:"Cordless Smart Vacuum",category:"Cleaning",price:399,was:449,image:"assets/images/vacuum.svg",rating:4.6,reviews:121,badge:"New"},
{id:5,name:"5 QT Stand Mixer",category:"Kitchen",price:349,was:399,image:"assets/images/mixer.svg",rating:4.8,reviews:203,badge:"Popular"},
{id:6,name:"1.2 cu. ft. Countertop Microwave",category:"Kitchen",price:179,was:199,image:"assets/images/microwave.svg",rating:4.5,reviews:98,badge:"Value"},
{id:7,name:"8,000 BTU Window Air Conditioner",category:"Climate",price:259,was:299,image:"assets/images/air-conditioner.svg",rating:4.6,reviews:164,badge:"Seasonal"},
{id:8,name:'65" 4K Smart TV',category:"Entertainment",price:799,was:999,image:"assets/images/smart-tv.svg",rating:4.7,reviews:277,badge:"Deal"}
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
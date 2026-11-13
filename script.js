const starterProducts=[
{id:1,name:"ساعة K-01",category:"style",price:1250,icon:"⌚",desc:"تصميم عصري"},
{id:2,name:"سماعة WAVE",category:"tech",price:890,icon:"🎧",desc:"صوت نقي"},
{id:3,name:"حقيبة URBAN",category:"accessories",price:740,icon:"▰",desc:"عملية وأنيقة"},
{id:4,name:"نظارة VISION",category:"style",price:560,icon:"🕶️",desc:"تفاصيل مختلفة"},
{id:5,name:"سماعة AIR",category:"tech",price:1100,icon:"◉",desc:"حرية الحركة"},
{id:6,name:"محفظة CORE",category:"accessories",price:390,icon:"▱",desc:"بساطة وجودة"}
];
const getProducts=()=>JSON.parse(localStorage.getItem("kayvorProducts")||"null")||starterProducts;
let cart=JSON.parse(localStorage.getItem("kayvorCart")||"[]");
const grid=document.getElementById("productGrid");
function renderProducts(filter="all"){const items=getProducts().filter(p=>filter==="all"||p.category===filter);grid.innerHTML=items.length?items.map(p=>`<article class="product-card"><div class="product-visual">${p.icon||"✦"}</div><div class="product-info"><small>${p.desc||"KAYVOR SELECTION"}</small><h3>${p.name}</h3><div class="product-bottom"><span class="price">${Number(p.price).toLocaleString("en-US")} ج.م</span><button class="add-btn" onclick="addToCart(${p.id})">أضف للسلة +</button></div></div></article>`).join(""):'<p>لا توجد منتجات في هذا القسم حاليًا.</p>'}
function addToCart(id){const p=getProducts().find(x=>x.id===id);if(!p)return;const found=cart.find(x=>x.id===id);found?found.qty++:cart.push({...p,qty:1});saveCart();toast("تمت إضافة المنتج إلى السلة");}
function saveCart(){localStorage.setItem("kayvorCart",JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.reduce((s,x)=>s+x.qty,0);renderCart()}
function renderCart(){document.getElementById("cartItems").innerHTML=cart.length?cart.map(x=>`<div class="cart-row"><div>${x.name}<small>${x.price} ج.م × ${x.qty}</small></div><button class="remove-item" onclick="removeItem(${x.id})">حذف</button></div>`).join(""):'<p style="color:#8993a4;text-align:center;margin-top:40px">السلة فارغة حاليًا</p>';document.getElementById("cartTotal").textContent=cart.reduce((s,x)=>s+x.price*x.qty,0).toLocaleString("en-US")+" ج.م"}
function removeItem(id){cart=cart.filter(x=>x.id!==id);saveCart()}
function toast(msg){const t=document.getElementById("toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2200)}
document.querySelectorAll(".filter").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll(".filter").forEach(x=>x.classList.remove("active"));b.classList.add("active");renderProducts(b.dataset.filter)}));
const drawer=document.getElementById("cartDrawer"),overlay=document.getElementById("overlay");function openCart(){drawer.classList.add("open");overlay.classList.add("show")}function closeCart(){drawer.classList.remove("open");overlay.classList.remove("show")}
document.getElementById("cartOpen").onclick=openCart;document.getElementById("cartClose").onclick=closeCart;overlay.onclick=closeCart;
document.getElementById("checkout").onclick=()=>{if(!cart.length)return toast("أضف منتجًا للسلة أولًا");const lines=cart.map(x=>`${x.name} × ${x.qty} = ${x.price*x.qty} ج.م`).join("%0A");const total=cart.reduce((s,x)=>s+x.price*x.qty,0);window.open(`https://wa.me/201000000000?text=${encodeURIComponent("مرحبًا KAYVOR، أريد طلب:%0A"+decodeURIComponent(lines)+"%0Aالإجمالي: "+total+" ج.م")}`,"_blank")};
document.getElementById("menuToggle").onclick=()=>document.getElementById("nav").classList.toggle("show");
renderProducts();saveCart();

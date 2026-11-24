const $=s=>document.querySelector(s),rp=n=>'Rp'+n.toLocaleString('id-ID');

const G=[
{id:'ml',n:'Mobile Legends',i:'ML',cur:'Diamond',c:['#3b4a78','#6a7fb5'],p:[[86,22000],[172,44000],[257,66000],[344,88000],[514,130000],[706,176000]]},
{id:'ff',n:'Free Fire',i:'FF',cur:'Diamond',c:['#7a4a3a','#b8825f'],p:[[50,8000],[140,20000],[355,50000],[720,100000],[1450,200000],[2180,300000]]},
{id:'pubg',n:'PUBG Mobile',i:'PM',cur:'UC',c:['#6b5a2e','#b39a58'],p:[[60,15000],[325,75000],[660,150000],[1800,375000],[3850,750000],[8100,1500000]]},
{id:'gi',n:'Genshin Impact',i:'GI',cur:'Genesis Crystal',c:['#2f5d57','#6aa198'],p:[[60,16000],[330,79000],[1090,249000],[2240,479000],[3880,799000],[8080,1599000]]},
{id:'val',n:'Valorant',i:'VA',cur:'VP',c:['#6a3340','#a85d6e'],p:[[475,50000],[1000,100000],[2050,200000],[3650,350000],[5350,500000],[11000,1000000]]},
{id:'cod',n:'COD Mobile',i:'CM',cur:'CP',c:['#3a4f6b','#6f8fb0'],p:[[80,16000],[400,79000],[800,158000],[1000,198000],[2400,475000],[5000,990000]]}];

const A=[
{g:'ml',t:'Sultan Mythic Glory',r:'Mythic Glory 612★',s:128,h:98,p:2750000},
{g:'ml',t:'Akun Epic Starter Skin',r:'Epic III',s:24,h:61,p:185000},
{g:'ff',t:'Heroic Bundle Langka',r:'Heroic',s:310,h:52,p:1450000},
{g:'pubg',t:'Conqueror Glacier Set',r:'Conqueror',s:86,h:0,p:3200000},
{g:'gi',t:'AR 58 Banyak Bintang 5',r:'AR 58',s:19,h:34,p:2100000},
{g:'val',t:'Immortal Full Skin',r:'Immortal 2',s:47,h:21,p:1680000},
{g:'gi',t:'AR 45 Siap Pakai',r:'AR 45',s:7,h:22,p:690000},
{g:'ff',t:'Akun Sakura Bundle',r:'Grandmaster',s:96,h:41,p:520000}];

const T=['Rani*** top up 514 Diamond Mobile Legends','Dimas*** beli akun Mythic Glory','Aldi*** top up 355 Diamond Free Fire','Sinta*** top up 660 UC PUBG Mobile','Bayu*** beli akun Conqueror','Nadia*** top up 1090 Genesis Crystal','Fikri*** top up 1000 VP Valorant'];
$('#tk').innerHTML=[...T,...T].map(x=>`<span>${x}</span>`).join('');
const gm=id=>G.find(g=>g.id===id);

/* partikel emas halus di hero */
(()=>{const cv=$('#cv'),x=cv.getContext('2d');let W,H,P=[];
const rs=()=>{W=cv.width=cv.offsetWidth;H=cv.height=cv.offsetHeight};rs();addEventListener('resize',rs);
for(let i=0;i<46;i++)P.push({x:Math.random()*W,y:Math.random()*H,s:.8+Math.random()*2.2,v:.12+Math.random()*.3,o:Math.random()*6,a:.15+Math.random()*.4});
const d=p=>{x.globalAlpha=p.a*(.6+.4*Math.sin(p.o));x.fillStyle='#e6d3a3';x.beginPath();x.arc(p.x,p.y,p.s,0,7);x.fill()};
const f=()=>{x.clearRect(0,0,W,H);P.forEach(p=>{p.y-=p.v;p.o+=.02;if(p.y<-10){p.y=H+10;p.x=Math.random()*W}d(p)});requestAnimationFrame(f)};
if(matchMedia('(prefers-reduced-motion:reduce)').matches){P.forEach(d)}else f()})();

/* angka statistik naik */
document.querySelectorAll('[data-n]').forEach(e=>{const n=+e.dataset.n,t0=performance.now();const s=t=>{const k=Math.min((t-t0)/1600,1);e.textContent=Math.round(n*(1-Math.pow(1-k,3))).toLocaleString('id-ID')+(n>100?'+':'');if(k<1)requestAnimationFrame(s)};requestAnimationFrame(s)});

/* kartu game */
let S={g:null,k:null};

/* Foto game diisi pemilik lewat FOTO_GAME di index.html (link gambar atau path file) */
const fotoOf=g=>((window.FOTO_GAME||{})[g.id]||'').trim();
const imgOf=g=>fotoOf(g)?`url('${fotoOf(g)}')`:'none';

function renderGames(){
$('#games').innerHTML=G.map(g=>`<button class="game${fotoOf(g)?' foto':''}${S.g&&S.g.id===g.id?' on':''}" data-id="${g.id}" style="--g1:${g.c[0]};--g2:${g.c[1]};--img:${imgOf(g)}"><b>${g.i}</b><span>${g.n}</span></button>`).join('');
document.querySelectorAll('.game').forEach(b=>{
b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect(),px=(e.clientX-r.left)/r.width-.5,py=(e.clientY-r.top)/r.height-.5;b.style.transform=`perspective(600px) rotateY(${px*8}deg) rotateX(${-py*8}deg) translateY(-3px)`});
b.addEventListener('mouseleave',()=>b.style.transform='');
b.addEventListener('click',()=>pick(b.dataset.id))})}
renderGames();

function pick(id){S={g:gm(id),k:null};document.querySelectorAll('.game').forEach(b=>b.classList.toggle('on',b.dataset.id===id));
const g=S.g,p=$('#panel');p.hidden=false;p.style.animation='none';p.offsetWidth;p.style.animation='';
p.innerHTML=`<h3>${g.n}</h3><label class="lb" style="display:block;margin-top:0">User ID</label><input id="uid" inputmode="numeric" placeholder="Masukkan User ID kamu" autocomplete="off">
<p class="lb">Pilih nominal ${g.cur}</p><div class="packs">${g.p.map((x,i)=>`<button class="pack" data-i="${i}"><b>${x[0].toLocaleString('id-ID')} ${g.cur}</b><small>${rp(x[1])}</small></button>`).join('')}</div>
<div class="bar"><div><small>Total</small><strong id="tot">Rp0</strong></div><button class="btn" id="buy">Beli sekarang</button></div>`;
p.querySelectorAll('.pack').forEach(b=>b.onclick=()=>{S.k=+b.dataset.i;p.querySelectorAll('.pack').forEach(o=>o.classList.toggle('on',o===b));$('#tot').textContent=rp(g.p[S.k][1])});
$('#buy').onclick=()=>{const u=$('#uid');if(u.value.trim().length<5){u.classList.remove('shake');u.offsetWidth;u.classList.add('shake');u.focus();return toast('Isi User ID dengan benar dulu')}
if(S.k===null)return toast('Pilih nominal dulu');const x=g.p[S.k];
pay({t:`${x[0].toLocaleString('id-ID')} ${g.cur} ${g.n}`,s:'User ID '+u.value.trim(),p:x[1],n:'Item masuk otomatis ke akun game kamu.'})};
p.scrollIntoView({behavior:'smooth',block:'nearest'})}

/* daftar akun */
let F='all';
$('#chips').innerHTML=[['all','Semua'],...G.map(g=>[g.id,g.n])].map(c=>`<button class="chip${c[0]==='all'?' on':''}" data-f="${c[0]}">${c[1]}</button>`).join('');
document.querySelectorAll('.chip').forEach(c=>c.onclick=()=>{F=c.dataset.f;document.querySelectorAll('.chip').forEach(o=>o.classList.toggle('on',o===c));list()});
function list(){const L=A.map((a,i)=>({...a,i})).filter(a=>F==='all'||a.g===F);
$('#accs').innerHTML=L.length?L.map((a,j)=>{const g=gm(a.g);return`<div class="acc" style="--g1:${g.c[0]};--g2:${g.c[1]};--img:${imgOf(g)};animation-delay:${j*70}ms"><div class="top"><small>${g.n}</small>${a.r}</div><div class="in"><b>${a.t}</b><ul><li><b>${a.s}</b> skin</li>${a.h?`<li><b>${a.h}</b> hero</li>`:''}</ul><div class="pr"><strong>${rp(a.p)}</strong><button class="btn" data-i="${a.i}">Beli aman</button></div></div></div>`}).join(''):'<p class="sub">Belum ada akun untuk game ini.</p>';
document.querySelectorAll('.acc .btn').forEach(b=>b.onclick=()=>{const a=A[b.dataset.i];pay({t:a.t,s:gm(a.g).n+', '+a.r,p:a.p,n:'Detail akun dikirim setelah pembayaran masuk ke rekber. Dana diteruskan ke penjual setelah kamu konfirmasi.'})})}
list();

/* checkout */
const M=['QRIS','DANA','OVO','Transfer BCA'];
function pay(o){let m=0;const md=$('#md');
md.innerHTML=`<h3>Konfirmasi pesanan</h3><div class="row"><span>Item</span><b style="text-align:right">${o.t}</b></div><div class="row"><span>Detail</span><b style="text-align:right">${o.s}</b></div><div class="row"><span>Harga</span><b>${rp(o.p)}</b></div><div class="row"><span>Biaya layanan</span><b>Rp1.000</b></div>
<p class="lb">Metode pembayaran</p><div class="pays">${M.map((x,i)=>`<button class="pay${i?'':' on'}" data-i="${i}">${x}</button>`).join('')}</div><button class="btn" id="go">Bayar ${rp(o.p+1000)}</button>`;
md.querySelectorAll('.pay').forEach(b=>b.onclick=()=>{m=+b.dataset.i;md.querySelectorAll('.pay').forEach(o=>o.classList.toggle('on',o===b))});
$('#go').onclick=()=>{md.innerHTML=`<div class="ctr"><div class="spin"></div><b>Memproses pembayaran ${M[m]}…</b></div>`;
setTimeout(()=>{const c='GM-'+Math.random().toString(36).slice(2,8).toUpperCase();
md.innerHTML=`<div class="ctr"><svg class="ok" viewBox="0 0 84 84"><circle cx="42" cy="42" r="40"/><path d="M26 43l11 11 21-23"/></svg><h3>Pembayaran berhasil</h3><div class="code">${c}</div><p style="color:var(--mu);margin-bottom:18px">${o.n}</p><button class="btn" id="cl">Selesai</button></div>`;$('#cl').onclick=close},1700)};
$('#ov').classList.add('on')}
function close(){$('#ov').classList.remove('on')}
$('#ov').onclick=e=>{if(e.target.id==='ov')close()};
addEventListener('keydown',e=>{if(e.key==='Escape')close()});
let tt;function toast(t){const e=$('#toast');e.textContent=t;e.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>e.classList.remove('on'),2200)}

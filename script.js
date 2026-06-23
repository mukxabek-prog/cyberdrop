/* ═══════════════════════════════════════════════════
   CYBERDROP — script.js
═══════════════════════════════════════════════════ */

// ──────────────────────────────────────────────────
// INTRO VIDEO → SITE TRANSITION
// ──────────────────────────────────────────────────
const introVideo = document.getElementById('intro-video');

introVideo.addEventListener('ended', enterSite);

// Also auto-enter if video fails to load / play
introVideo.addEventListener('error', enterSite);
setTimeout(() => {
  if (document.getElementById('intro-screen') &&
      !document.getElementById('intro-screen').classList.contains('gone')) {
    // fallback: max 15 seconds
  }
}, 15000);

function enterSite() {
  const intro = document.getElementById('intro-screen');
  const site  = document.getElementById('main-site');
  if (!intro || intro.classList.contains('gone')) return;
  intro.classList.add('gone');
  intro.style.opacity = '0';
  intro.style.transition = 'opacity 0.7s ease';
  setTimeout(() => {
    intro.style.display = 'none';
    site.classList.remove('hidden');
    site.style.opacity = '0';
    site.style.transition = 'opacity 0.6s ease';
    requestAnimationFrame(() => { site.style.opacity = '1'; });
  }, 700);
}

// ──────────────────────────────────────────────────
// VIDEO THUMBNAIL HOVER PREVIEW
// ──────────────────────────────────────────────────
document.querySelectorAll('.video-thumb video').forEach(v => {
  v.currentTime = 0.5;
  v.parentElement.addEventListener('mouseenter', () => v.play().catch(() => {}));
  v.parentElement.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0.5; });
});

// ──────────────────────────────────────────────────
// FULL VIDEO MODAL
// ──────────────────────────────────────────────────
function openVideoModal(src) {
  const overlay = document.getElementById('video-modal');
  const vid     = document.getElementById('full-video');
  vid.src = src;
  vid.load();
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  vid.play().catch(() => {});
}

function closeVideoFull() {
  const overlay = document.getElementById('video-modal');
  const vid     = document.getElementById('full-video');
  vid.pause();
  vid.src = '';
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function closeVideoModal(e) {
  if (e.target === document.getElementById('video-modal')) closeVideoFull();
}

// ──────────────────────────────────────────────────
// LOGIN MODAL
// ──────────────────────────────────────────────────
function openLoginModal() {
  document.getElementById('login-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLoginModal() {
  document.getElementById('login-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function closeOnBg(e) {
  if (e.target === document.getElementById('login-modal')) closeLoginModal();
}

function switchToRegister() {
  closeLoginModal();
  setTimeout(() => openRegisterModal(), 180);
}

function doLogin() {
  const user = document.getElementById('login-user').value.trim();
  const pass = document.getElementById('login-pass').value;
  if (!user || !pass) { showToast("Ma'lumotlarni to'ldiring!"); return; }
  loginSuccess(user);
}

// ──────────────────────────────────────────────────
// REGISTER MODAL
// ──────────────────────────────────────────────────
function openRegisterModal() {
  document.getElementById('register-modal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeRegisterModal() {
  document.getElementById('register-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function closeOnBgReg(e) {
  if (e.target === document.getElementById('register-modal')) closeRegisterModal();
}

function switchToLogin() {
  closeRegisterModal();
  setTimeout(() => openLoginModal(), 180);
}

function doRegister() {
  const user  = document.getElementById('reg-user').value.trim();
  const email = document.getElementById('reg-email').value.trim();
  const pass  = document.getElementById('reg-pass').value;
  if (!user || !email || !pass) { showToast("Barcha maydonlarni to'ldiring!"); return; }
  loginSuccess(user);
}

// ──────────────────────────────────────────────────
// SOCIAL LOGIN
// ──────────────────────────────────────────────────
function socialLogin(provider) {
  showToast(provider + ' orqali kirilmoqda...');
  setTimeout(() => {
    closeLoginModal();
    closeRegisterModal();
    const name = provider === 'Telegram' ? 'TgUser' : 'GUser';
    loginSuccess(name);
  }, 900);
}

// ──────────────────────────────────────────────────
// LOGIN SUCCESS → swap header button to profile
// ──────────────────────────────────────────────────
function loginSuccess(username) {
  closeLoginModal();
  closeRegisterModal();

  // Replace "Kirish" button with user chip
  const headerRight = document.querySelector('.header-right');
  headerRight.innerHTML = `
    <div style="display:flex;align-items:center;gap:10px;">
      <div style="
        width:32px;height:32px;border-radius:50%;
        background:linear-gradient(135deg,#00c8ff,#7b2ff7);
        display:flex;align-items:center;justify-content:center;
        font-size:14px;font-weight:700;color:#fff;
        border:1px solid rgba(0,200,255,0.4);
        text-transform:uppercase;
      ">${username[0]}</div>
      <span style="font-size:14px;font-weight:600;color:#ccd;">${username}</span>
      <button onclick="logoutUser()" style="
        background:none;border:1px solid rgba(255,60,60,0.3);
        color:#f55;padding:5px 12px;border-radius:6px;
        font-family:'Rajdhani',sans-serif;font-size:12px;
        font-weight:600;cursor:pointer;letter-spacing:1px;
      ">Chiqish</button>
    </div>
  `;
  showToast('Xush kelibsiz, ' + username + '!');
}

function logoutUser() {
  const headerRight = document.querySelector('.header-right');
  headerRight.innerHTML = `<button class="btn-kirish" onclick="openLoginModal()">Kirish</button>`;
  showToast('Tizimdan chiqildi.');
}

// ──────────────────────────────────────────────────
// CASE OPEN
// ──────────────────────────────────────────────────
const caseRewards = {
  Bronze:  ['Eski qurol', '5 tanga', 'Bosh deraza skins', 'Qurilma'],
  Silver:  ['Yaxshi qurol', '50 tanga', 'Maxsus skin', 'Portlash effekti'],
  Gold:    ['Rare skin!', '200 tanga', 'Elita qurol', 'Animatsion effekt'],
  Diamond: ['LEGENDARY skin!', '1000 tanga', 'Ultra rare item!', 'Maxsus avatar frame']
};

function openCase(tier) {
  const modal = document.getElementById('case-modal');
  const anim  = document.getElementById('case-open-anim');
  const title = document.getElementById('case-modal-title');
  const result = document.getElementById('case-result');

  title.textContent = tier + ' Case ochilmoqda...';
  result.textContent = '';
  anim.textContent = '🎁';

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Animate opening
  let count = 0;
  const emojis = ['🎁','✨','💫','🎮','⚡','🏆','💥'];
  const interval = setInterval(() => {
    anim.textContent = emojis[count % emojis.length];
    count++;
    if (count > 10) {
      clearInterval(interval);
      const rewards = caseRewards[tier];
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      anim.textContent = '🎉';
      title.textContent = 'Tabriklaymiz!';
      result.textContent = '🏅 Siz ' + reward + ' oldingiz!';
    }
  }, 120);
}

function closeCaseModal() {
  document.getElementById('case-modal').classList.remove('active');
  document.body.style.overflow = '';
}

function closeCaseOnBg(e) {
  if (e.target === document.getElementById('case-modal')) closeCaseModal();
}

// ──────────────────────────────────────────────────
// TOAST NOTIFICATION
// ──────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 3000);
}

// ──────────────────────────────────────────────────
// ESC key closes modals
// ──────────────────────────────────────────────────
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLoginModal();
    closeRegisterModal();
    closeVideoFull();
    closeCaseModal();
  }
});

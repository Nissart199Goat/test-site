function loadNickname() {
  const nick = localStorage.getItem('nickname') || '';
  const input = document.getElementById('nickname');
  const display = document.getElementById('current-nick');
  if (input) input.value = nick;
  if (display) display.textContent = nick ? `Current nickname: ${nick}` : '';
}

function saveNickname() {
  const nick = document.getElementById('nickname').value.trim();
  if (nick) {
    localStorage.setItem('nickname', nick);
    loadNickname();
  }
}

const btn = document.getElementById('save-nick');
if (btn) btn.addEventListener('click', saveNickname);

loadNickname();

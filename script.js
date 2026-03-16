class ChmodTrainer {
  constructor() {
    this.score = 0;
    this.level = 1;
    this.streak = 0;
    this.stage = 'exercise';
    this.timeLeft = 30;
    this.timer = null;
    this.player = '';
    this.answer = '';
    this.flagFound = false;

    this.virtualFiles = [
      {name: 'readme.txt', perm: 'rw-r--r--', content: 'the right file needs owner permissions...'},
      {name: 'log.txt', perm: '---------', content: 'Another trap file. Search for hidden files...'},
      {name: '.hidden.txt', perm: '---------', content: 'FLAG{chm0d_m4st3r_2026}'},
      {name: 'secret.txt', perm: '---------', content: "IT'S A TRAP! Wrong file."}
    ];

    this.init();
  }

  stopTimer() {
  if (this.timer) {
    clearInterval(this.timer);
    this.timer = null;
    document.getElementById('timerFill').style.width = '0%';
  }
}


  init() {
    this.bindEvents();
    this.loadLeaderboard();
    document.getElementById('output').innerHTML = 'Insert you username and start the game!';
  }

  bindEvents() {
    document.getElementById('startBtn').onclick = () => this.start();
    const cmdInput = document.getElementById('cmdInput');
    cmdInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        this.command = cmdInput.value.trim();
        cmdInput.value = '';
        this.processCommand();
      }
    });
  }

  start() {
    this.player = document.getElementById('username').value.trim() || 'anon';
    document.getElementById('userBox').style.display = 'none';
    this.resetGame();
    this.newExercise();
    document.getElementById('prompt').textContent = `${this.player}@chmod-lab:~$`;
    document.getElementById('cmdInput').focus();
  }

  resetGame() {
    this.score = 0;
    this.level = 1;
    this.streak = 0;
    this.stage = 'exercise';
    this.flagFound = false;
    this.updateStats();
    this.stopTimer();
  }

  newExercise() {
     this.stopTimer(); 
    if (this.stage === 'ctf') {
      this.clearOutput();
      this.writeLine('CTF UNLOCKED!');
      this.writeLine('Find the flag using ls and cat...');
      return;
    }

    this.clearOutput();
    const perm = this.generatePerm();
    this.answer = this.permToOctal(perm);
    document.getElementById('permDisplay').innerHTML = 
      `-<span style="color:#3fb950">${perm.slice(0,3)}</span> <span style="color:#58a6ff">${perm.slice(3,6)}</span> <span style="color:#d29922">${perm.slice(6)}</span>`;
    this.writeLine(`Convert in octal: chmod xxx file`);
    this.startTimer();
  }

  generatePerm() {
    const chars = 'rwx';
    let p = '';
    for (let i = 0; i < 9; i++) {
      p += Math.random() > 0.5 ? chars[i % 3] : '-';
    }
    return p;
  }

  permToOctal(p) {
    let octal = '';
    for (let i = 0; i < 9; i += 3) {
      let val = 0;
      if (p[i] === 'r') val += 4;
      if (p[i + 1] === 'w') val += 2;
      if (p[i + 2] === 'x') val += 1;
      octal += val;
    }
    return octal;
  }

  startTimer() {
  this.stopTimer();  // Pulisci sempre
  if (this.stage === 'ctf') return;  // No timer CTF
  
  this.timeLeft = 30;
  const fill = document.getElementById('timerFill');
  fill.style.width = '100%';
  this.timer = setInterval(() => {
    this.timeLeft--;
    fill.style.width = (this.timeLeft / 30 * 100) + '%';
    if (this.timeLeft <= 0) {
      this.writeLine('Time is over');
      this.saveScore();
      this.resetGame();
      setTimeout(() => this.newExercise(), 1500);
    }
  }, 1000);
}


  processCommand() {
    if (!this.command) return;
    this.writeLine(this.command);

    if (this.stage === 'exercise') {
      if (this.command.includes(this.answer)) {
        const points = Math.max(10, this.timeLeft * this.level);
        this.score += points;
        this.streak++;
        this.level++;
        this.writeLine(`Correct! +${points} pts → Level ${this.level}`);
        
        if (this.level >= 10) {
          this.stage = 'ctf';
          this.writeLine('LEVEL 10! CTF UNLOCKED!');
        }
        
        this.updateStats();
        this.saveScore();
        setTimeout(() => this.newExercise(), 1500);
      } else {
        this.writeLine(`Wrong! Answer: chmod ${this.answer} file`);
        this.saveScore();
        this.resetGame();
        setTimeout(() => this.newExercise(), 1500);
      }
    } else {
      this.handleCTF(this.command);
    }
  }

  handleCTF(cmd) {
  const parts = cmd.trim().split(' ');
  const op = parts[0].toLowerCase();
  
  this.stopTimer();  // Timer fix

  if (op === 'ls') {
    const showHidden = parts.includes('-la') || parts.includes('-a');
    
    this.virtualFiles.forEach(f => {
      if (!showHidden && f.name.startsWith('.')) return;
      this.writeLine(`${f.name.padEnd(12)} ${f.perm}`);
    });
  } else if (op === 'cat' && parts[1]) {
    const filename = parts[1];
    const file = this.virtualFiles.find(f => f.name === filename);
    if (!file) return this.writeLine('File not found');
    if (file.perm[0] !== 'r') return this.writeLine('Permission denied!');
    
    if (filename === '.hidden.txt' && !this.flagFound) {
      this.flagFound = true;
      this.score += 100;
      this.writeLine(`FLAG FOUND! +100 pts! Score: ${this.score}`);
      this.writeLine(file.content);
      this.updateStats();
      this.saveScore();
      this.stage = 'exercise';
      setTimeout(() => this.newExercise(), 5000);
      return;
    }
    this.writeLine(file.content);
  } else if (op === 'chmod' && parts[1] && parts[2] && parts[1].length === 3) {
    const filename = parts[2];
    const file = this.virtualFiles.find(f => f.name === filename);
    if (!file) return this.writeLine('File not found');
    
    let newPerm = '';
    for (let digit of parts[1]) {
      const val = parseInt(digit);
      newPerm += (val & 4) ? 'r' : '-';
      newPerm += (val & 2) ? 'w' : '-';
      newPerm += (val & 1) ? 'x' : '-';
    }
    file.perm = newPerm;
    this.writeLine(`chmod ${parts[1]} ${filename} → ${file.perm}------`);
  } else {
    this.writeLine('?');
  }
}

  writeLine(text) {
    const output = document.getElementById('output');
    output.innerHTML += text + '\n';
    output.scrollTop = output.scrollHeight;
  }

  clearOutput() {
    document.getElementById('output').innerHTML = '';
  }

  updateStats() {
    document.getElementById('score').textContent = this.score;
    document.getElementById('level').textContent = this.level;
    document.getElementById('streak').textContent = this.streak;
  }

  saveScore() {
  
    try {
      const board = JSON.parse(localStorage.getItem('chmodLeaderboard') || '[]');
      const playerData = {
        name: this.player,
        score: this.score,
        badge: this.flagFound,  //Badge flag
        level: this.level,
        date: new Date().toISOString().split('T')[0]
      };
      
    
      const existingIndex = board.findIndex(p => p.name === this.player);
      if (existingIndex >= 0) {
        if (playerData.score > board[existingIndex].score) {
          board[existingIndex] = playerData;
        }
      } else {
        board.push(playerData);
      }
      
    
      localStorage.setItem('chmodLeaderboard', JSON.stringify(
        board.sort((a,b) => b.score - a.score).slice(0,10)
      ));
      this.loadLeaderboard();
    } catch(e) {
      console.error('Save failed:', e);
    }
  }

  loadLeaderboard() {
    try {
      const board = JSON.parse(localStorage.getItem('chmodLeaderboard') || '[]');
      const list = document.getElementById('leaderboard');
      list.innerHTML = board.map((entry, i) => {
        let displayName = entry.name;
        if (entry.badge) displayName = `🏆 ${entry.name}`;  // BADGE NEL LEADERBOARD
        return `<li>${i+1}. ${displayName.padEnd(15)} ${entry.score} pts`;
      }).join('') || '<li>Start climbing the rankings!</li>';
    } catch(e) {
      document.getElementById('leaderboard').innerHTML = '<li>Loading Error</li>';
    }
  }
}

new ChmodTrainer();

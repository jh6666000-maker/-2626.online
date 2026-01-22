// 语言翻译配置
const translations = {
    'zh-CN': {
        gameTitle: '贪吃蛇大冒险 - 经典在线游戏',
        score: '分数: <span id="score">0</span>',
        level: '关卡: <span id="level">1</span>',
        target: '目标: <span id="target">10</span>',
        highScore: '最高分: <span id="highScore">0</span>',
        difficultyEasy: '简单',
        difficultyMedium: '中等',
        difficultyHard: '困难',
        startGame: '开始游戏',
        pauseGame: '暂停',
        resetGame: '重置',
        sound: '🔊 音效',
        gameOver: '游戏结束',
        finalScore: '最终分数: <span id="finalScore">0</span>',
        finalLevel: '最终关卡: <span id="finalLevel">1</span>',
        playAgain: '再来一局',
        levelUp: '恭喜升级！',
        newLevel: '你已经升级到第 <span id="newLevel">1</span> 关！',
        levelUpMessage: '游戏速度将更快，挑战更大！',
        continueGame: '继续游戏',
        // SEO相关翻译
        pageTitle: '贪吃蛇大冒险 - 在线免费游戏',
        metaDescription: '经典贪吃蛇游戏，支持多种难度级别，包含音效和最高分记录。在线免费玩贪吃蛇游戏，挑战你的反应速度！',
        metaKeywords: '贪吃蛇游戏,在线游戏,免费游戏,经典游戏,休闲游戏,网页游戏,HTML5游戏,JavaScript游戏',
        structuredDataName: '贪吃蛇大冒险',
        structuredDataDescription: '经典贪吃蛇游戏，支持多种难度级别，包含音效和最高分记录。在线免费玩贪吃蛇游戏，挑战你的反应速度！',
        structuredDataGenre: ['休闲游戏', '益智游戏'],
        structuredDataGamePlatform: 'Web浏览器'
    },
    'en': {
        gameTitle: 'Snake Adventure - Classic Online Game',
        score: 'Score: <span id="score">0</span>',
        level: 'Level: <span id="level">1</span>',
        target: 'Target: <span id="target">10</span>',
        highScore: 'High Score: <span id="highScore">0</span>',
        difficultyEasy: 'Easy',
        difficultyMedium: 'Medium',
        difficultyHard: 'Hard',
        startGame: 'Start Game',
        pauseGame: 'Pause',
        resetGame: 'Reset',
        sound: '🔊 Sound',
        gameOver: 'Game Over',
        finalScore: 'Final Score: <span id="finalScore">0</span>',
        finalLevel: 'Final Level: <span id="finalLevel">1</span>',
        playAgain: 'Play Again',
        levelUp: 'Level Up!',
        newLevel: 'You have reached level <span id="newLevel">1</span>!',
        levelUpMessage: 'The game will be faster and more challenging!',
        continueGame: 'Continue Game',
        // SEO相关翻译
        pageTitle: 'Snake Adventure - Free Online Game',
        metaDescription: 'Classic snake game with multiple difficulty levels, sound effects and high score records. Play snake game online for free and challenge your reaction speed!',
        metaKeywords: 'snake game,online game,free game,classic game,casual game,web game,HTML5 game,JavaScript game',
        structuredDataName: 'Snake Adventure',
        structuredDataDescription: 'Classic snake game with multiple difficulty levels, sound effects and high score records. Play snake game online for free and challenge your reaction speed!',
        structuredDataGenre: ['Casual Game', 'Puzzle Game'],
        structuredDataGamePlatform: 'Web Browser'
    }
};

// 当前语言
let currentLanguage = 'zh-CN';

// 翻译页面函数
function translatePage() {
    // 更新所有带有data-lang-key属性的元素
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[currentLanguage][key]) {
            // 保存当前ID值
            let currentValue = '';
            if (key === 'score') currentValue = document.getElementById('score').textContent;
            if (key === 'level') currentValue = document.getElementById('level').textContent;
            if (key === 'target') currentValue = document.getElementById('target').textContent;
            if (key === 'highScore') currentValue = document.getElementById('highScore').textContent;
            if (key === 'finalScore') currentValue = document.getElementById('finalScore').textContent;
            if (key === 'finalLevel') currentValue = document.getElementById('finalLevel').textContent;
            if (key === 'newLevel') currentValue = document.getElementById('newLevel').textContent;
            
            // 设置翻译内容
            if (element.tagName === 'TITLE') {
                element.textContent = translations[currentLanguage][key];
            } else {
                element.innerHTML = translations[currentLanguage][key];
            }
            
            // 恢复ID值
            if (key === 'score') document.getElementById('score').textContent = currentValue;
            if (key === 'level') document.getElementById('level').textContent = currentValue;
            if (key === 'target') document.getElementById('target').textContent = currentValue;
            if (key === 'highScore') document.getElementById('highScore').textContent = currentValue;
            if (key === 'finalScore') document.getElementById('finalScore').textContent = currentValue;
            if (key === 'finalLevel') document.getElementById('finalLevel').textContent = currentValue;
            if (key === 'newLevel') document.getElementById('newLevel').textContent = currentValue;
        }
    });
    
    // 更新meta标签
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && translations[currentLanguage].metaDescription) {
        metaDescription.setAttribute('content', translations[currentLanguage].metaDescription);
    }
    
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords && translations[currentLanguage].metaKeywords) {
        metaKeywords.setAttribute('content', translations[currentLanguage].metaKeywords);
    }
    
    // 更新Open Graph和Twitter标签
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle && translations[currentLanguage].gameTitle) {
        ogTitle.setAttribute('content', translations[currentLanguage].gameTitle);
    }
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription && translations[currentLanguage].metaDescription) {
        ogDescription.setAttribute('content', translations[currentLanguage].metaDescription);
    }
    
    const twitterTitle = document.querySelector('meta[name="twitter:title"]');
    if (twitterTitle && translations[currentLanguage].gameTitle) {
        twitterTitle.setAttribute('content', translations[currentLanguage].gameTitle);
    }
    
    const twitterDescription = document.querySelector('meta[name="twitter:description"]');
    if (twitterDescription && translations[currentLanguage].metaDescription) {
        twitterDescription.setAttribute('content', translations[currentLanguage].metaDescription);
    }
    
    // 更新JSON-LD结构化数据
    const structuredDataScript = document.getElementById('structuredData');
    if (structuredDataScript) {
        try {
            const structuredData = JSON.parse(structuredDataScript.textContent);
            structuredData.name = translations[currentLanguage].structuredDataName;
            structuredData.description = translations[currentLanguage].structuredDataDescription;
            structuredData.genre = translations[currentLanguage].structuredDataGenre;
            structuredData.gamePlatform = translations[currentLanguage].structuredDataGamePlatform;
            structuredDataScript.textContent = JSON.stringify(structuredData, null, 2);
        } catch (error) {
            console.error('Failed to update structured data:', error);
        }
    }
}

// 设置语言函数
function setLanguage(language) {
    currentLanguage = language;
    // 保存语言设置到localStorage
    localStorage.setItem('snakeGameLanguage', language);
    // 更新页面语言属性
    document.documentElement.lang = language;
    // 翻译页面
    translatePage();
}

// 初始化语言设置
function initLanguage() {
    // 从localStorage获取语言设置
    const savedLanguage = localStorage.getItem('snakeGameLanguage');
    
    if (savedLanguage) {
        // 如果有保存的语言设置，直接使用
        setLanguage(savedLanguage);
    } else {
        // 没有保存的语言设置，显示语言选择弹窗
        showLanguageModal();
    }
}

// 显示语言选择弹窗
function showLanguageModal() {
    const modal = document.getElementById('languageModal');
    if (modal) {
        modal.style.display = 'flex';
    }
    
    // 添加语言选项点击事件监听
    document.querySelectorAll('.language-option-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // 移除所有按钮的active类
            document.querySelectorAll('.language-option-btn').forEach(b => b.classList.remove('active'));
            // 为当前点击的按钮添加active类
            btn.classList.add('active');
        });
    });
}

// 隐藏语言选择弹窗
function hideLanguageModal() {
    const modal = document.getElementById('languageModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// 确认语言选择
function confirmLanguageSelection() {
    // 获取当前激活的语言选项
    const activeBtn = document.querySelector('.language-option-btn.active');
    if (activeBtn) {
        const selectedLanguage = activeBtn.dataset.lang;
        setLanguage(selectedLanguage);
        hideLanguageModal();
    }
}

// 游戏配置
const config = {
    gridSize: 20,
    tileSize: 20,
    initialSpeed: 150,
    speedDecrease: 10,
    foodValue: 1,
    levelUpScore: 10
};

// 游戏状态
let gameState = {
    canvas: null,
    ctx: null,
    snake: [],
    food: {},
    direction: 'right',
    nextDirection: 'right',
    score: 0,
    level: 1,
    target: config.levelUpScore,
    speed: config.initialSpeed,
    gameRunning: false,
    gamePaused: false,
    difficulty: 'easy',
    animationId: null,
    highScore: 0,
    soundEnabled: true
};

// 音频上下文
let audioContext = null;

// 初始化音频上下文
function initAudio() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
}

// 激活音频上下文（处理浏览器自动播放策略）
function resumeAudio() {
    if (audioContext && audioContext.state === 'suspended') {
        audioContext.resume();
    }
}

// 播放音效
function playSound(frequency, duration, type = 'sine') {
    if (!gameState.soundEnabled) return;
    
    initAudio();
    resumeAudio();
    
    // 确保音频上下文已激活
    if (audioContext.state !== 'running') return;
    
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
}

// 播放移动音效
function playMoveSound() {
    playSound(200, 0.05, 'square');
}

// 播放吃食物音效
function playEatSound() {
    playSound(400, 0.1, 'sine');
    setTimeout(() => playSound(600, 0.1, 'sine'), 50);
}

// 播放升级音效
function playLevelUpSound() {
    for (let i = 0; i < 3; i++) {
        setTimeout(() => playSound(300 + i * 100, 0.1, 'sine'), i * 100);
    }
}

// 播放游戏结束音效
function playGameOverSound() {
    playSound(100, 0.3, 'sawtooth');
}

// 切换音效开关
function toggleSound() {
    gameState.soundEnabled = !gameState.soundEnabled;
    const soundBtn = document.getElementById('soundBtn');
    soundBtn.textContent = gameState.soundEnabled ? '🔊 音效' : '🔇 音效';
}

// 初始化游戏
function initGame() {
    gameState.canvas = document.getElementById('gameCanvas');
    gameState.ctx = gameState.canvas.getContext('2d');
    
    // 设置画布大小
    const containerWidth = document.querySelector('.canvas-container').clientWidth;
    const size = Math.min(containerWidth - 20, 400);
    gameState.canvas.width = size;
    gameState.canvas.height = size;
    
    // 重新计算网格大小
    config.tileSize = Math.floor(size / config.gridSize);
    
    // 加载最高分
    loadHighScore();
    
    // 初始化语言设置
    initLanguage();
    
    // 初始化贪吃蛇
    resetGame();
    
    // 添加事件监听
    document.addEventListener('keydown', handleKeyPress);
    
    // 添加难度选择监听
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelector('.difficulty-btn.active').classList.remove('active');
            btn.classList.add('active');
            gameState.difficulty = btn.dataset.difficulty;
            updateSpeed();
            resetGame();
        });
    });
    
    // 绘制初始画面
    draw();
}

// 初始化贪吃蛇
function initSnake() {
    const center = Math.floor(config.gridSize / 2);
    gameState.snake = [
        { x: center, y: center },
        { x: center - 1, y: center },
        { x: center - 2, y: center }
    ];
}

// 生成食物
function generateFood() {
    // 计算所有可能的空白位置
    const allPositions = new Set();
    for (let x = 0; x < config.gridSize; x++) {
        for (let y = 0; y < config.gridSize; y++) {
            allPositions.add(`${x},${y}`);
        }
    }
    
    // 移除蛇身占用的位置
    gameState.snake.forEach(segment => {
        allPositions.delete(`${segment.x},${segment.y}`);
    });
    
    // 如果没有空白位置（游戏应该已经结束），返回
    if (allPositions.size === 0) {
        console.warn('No empty positions for food');
        return;
    }
    
    // 从空白位置中随机选择一个
    const availablePositions = Array.from(allPositions);
    const randomIndex = Math.floor(Math.random() * availablePositions.length);
    const [x, y] = availablePositions[randomIndex].split(',').map(Number);
    
    gameState.food = { x, y };
}

// 更新速度
function updateSpeed() {
    const baseSpeed = {
        easy: 200,
        medium: 150,
        hard: 100
    }[gameState.difficulty];
    
    // 调整速度增加公式，让后期速度增加更加平缓
    // 使用平方根函数来减缓速度增加
    const speedDecrease = Math.floor((gameState.level - 1) * Math.sqrt(config.speedDecrease));
    // 设置更低的速度减少量和更高的最低速度限制
    gameState.speed = Math.max(80, baseSpeed - speedDecrease);
}

// 开始游戏
function startGame() {
    if (!gameState.gameRunning) {
        gameState.gameRunning = true;
        gameState.gamePaused = false;
        gameLoop();
    } else if (gameState.gamePaused) {
        gameState.gamePaused = false;
        gameLoop();
    }
}

// 暂停游戏
function pauseGame() {
    if (gameState.gameRunning && !gameState.gamePaused) {
        gameState.gamePaused = true;
        if (gameState.animationId) {
            clearTimeout(gameState.animationId);
            gameState.animationId = null;
        }
    }
}

// 重置游戏
function resetGame() {
    if (gameState.animationId) {
        clearTimeout(gameState.animationId);
        gameState.animationId = null;
    }
    
    gameState.snake = [];
    initSnake();
    generateFood();
    gameState.direction = 'right';
    gameState.nextDirection = 'right';
    gameState.score = 0;
    gameState.level = 1;
    gameState.target = config.levelUpScore;
    gameState.gameRunning = false;
    gameState.gamePaused = false;
    updateSpeed();
    
    updateUI();
    draw();
    
    // 隐藏游戏结束界面
    document.getElementById('gameOver').style.display = 'none';
}

// 游戏主循环
function gameLoop() {
    if (!gameState.gameRunning || gameState.gamePaused) return;
    
    update();
    draw();
    playMoveSound(); // 播放移动音效
    
    gameState.animationId = setTimeout(() => {
        gameLoop();
    }, gameState.speed);
}

// 更新游戏状态
function update() {
    // 更新方向
    gameState.direction = gameState.nextDirection;
    
    // 移动贪吃蛇
    const head = { ...gameState.snake[0] };
    
    switch (gameState.direction) {
        case 'up':
            head.y -= 1;
            break;
        case 'down':
            head.y += 1;
            break;
        case 'left':
            head.x -= 1;
            break;
        case 'right':
            head.x += 1;
            break;
    }
    
    // 碰撞检测
    if (checkCollision(head)) {
        endGame();
        return;
    }
    
    // 添加新头部
    gameState.snake.unshift(head);
    
    // 检查是否吃到食物
    if (head.x === gameState.food.x && head.y === gameState.food.y) {
        gameState.score += config.foodValue;
        playEatSound(); // 播放吃食物音效
        generateFood();
        updateUI();
        
        // 检查是否升级
        if (gameState.score >= gameState.target) {
            levelUp();
        }
    } else {
        // 移除尾部
        gameState.snake.pop();
    }
}

// 检查碰撞
function checkCollision(head) {
    // 墙壁碰撞
    if (head.x < 0 || head.x >= config.gridSize || head.y < 0 || head.y >= config.gridSize) {
        return true;
    }
    
    // 自身碰撞
    for (let i = 1; i < gameState.snake.length; i++) {
        if (head.x === gameState.snake[i].x && head.y === gameState.snake[i].y) {
            return true;
        }
    }
    
    return false;
}

// 关闭升级弹窗
function closeLevelUpModal() {
    document.getElementById('levelUpModal').style.display = 'none';
    startGame();
}

// 升级
function levelUp() {
    gameState.level++;
    gameState.target += config.levelUpScore;
    updateSpeed();
    updateUI();
    playLevelUpSound(); // 播放升级音效
    
    // 显示升级弹窗
    pauseGame();
    document.getElementById('newLevel').textContent = gameState.level;
    document.getElementById('levelUpModal').style.display = 'flex';
}

// 结束游戏
function endGame() {
    gameState.gameRunning = false;
    gameState.gamePaused = false;
    playGameOverSound(); // 播放游戏结束音效
    
    // 保存最高分
    saveHighScore();
    
    // 显示游戏结束界面
    document.getElementById('finalScore').textContent = gameState.score;
    document.getElementById('finalLevel').textContent = gameState.level;
    document.getElementById('gameOver').style.display = 'flex';
}

// 更新UI
function updateUI() {
    document.getElementById('score').textContent = gameState.score;
    document.getElementById('level').textContent = gameState.level;
    document.getElementById('target').textContent = gameState.target;
    document.getElementById('highScore').textContent = gameState.highScore;
}

// 加载最高分
function loadHighScore() {
    const key = `snakeGameHighScore_${gameState.difficulty}`;
    const savedHighScore = localStorage.getItem(key);
    if (savedHighScore) {
        gameState.highScore = parseInt(savedHighScore);
    } else {
        gameState.highScore = 0;
    }
}

// 保存最高分
function saveHighScore() {
    const key = `snakeGameHighScore_${gameState.difficulty}`;
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem(key, gameState.highScore.toString());
    }
}

// 绘制游戏
function draw() {
    const ctx = gameState.ctx;
    const canvas = gameState.canvas;
    
    // 清空画布
    ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 绘制网格
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= config.gridSize; i++) {
        const pos = i * config.tileSize;
        ctx.beginPath();
        ctx.moveTo(pos, 0);
        ctx.lineTo(pos, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, pos);
        ctx.lineTo(canvas.width, pos);
        ctx.stroke();
    }
    
    // 绘制食物
    ctx.fillStyle = '#ff6b6b';
    ctx.beginPath();
    ctx.arc(
        (gameState.food.x + 0.5) * config.tileSize,
        (gameState.food.y + 0.5) * config.tileSize,
        config.tileSize / 2,
        0,
        Math.PI * 2
    );
    ctx.fill();
    
    // 绘制贪吃蛇
    gameState.snake.forEach((segment, index) => {
        if (index === 0) {
            // 头部
            ctx.fillStyle = '#4ecdc4';
            ctx.beginPath();
            ctx.arc(
                (segment.x + 0.5) * config.tileSize,
                (segment.y + 0.5) * config.tileSize,
                config.tileSize / 2,
                0,
                Math.PI * 2
            );
            ctx.fill();
            
            // 眼睛
            ctx.fillStyle = 'white';
            const eyeSize = config.tileSize / 8;
            const eyeOffset = config.tileSize / 4;
            
            if (gameState.direction === 'up') {
                ctx.fillRect(
                    (segment.x + 0.5 - 0.25) * config.tileSize - eyeSize / 2,
                    (segment.y + 0.25) * config.tileSize - eyeSize / 2,
                    eyeSize,
                    eyeSize
                );
                ctx.fillRect(
                    (segment.x + 0.5 + 0.25) * config.tileSize - eyeSize / 2,
                    (segment.y + 0.25) * config.tileSize - eyeSize / 2,
                    eyeSize,
                    eyeSize
                );
            } else if (gameState.direction === 'down') {
                ctx.fillRect(
                    (segment.x + 0.5 - 0.25) * config.tileSize - eyeSize / 2,
                    (segment.y + 0.75) * config.tileSize - eyeSize / 2,
                    eyeSize,
                    eyeSize
                );
                ctx.fillRect(
                    (segment.x + 0.5 + 0.25) * config.tileSize - eyeSize / 2,
                    (segment.y + 0.75) * config.tileSize - eyeSize / 2,
                    eyeSize,
                    eyeSize
                );
            } else if (gameState.direction === 'left') {
                ctx.fillRect( 
                    (segment.x + 0.25) * config.tileSize - eyeSize / 2,
                    (segment.y + 0.5 - 0.25) * config.tileSize - eyeSize / 2,
                    eyeSize,
                    eyeSize
                );
                ctx.fillRect(
                    (segment.x + 0.25) * config.tileSize - eyeSize / 2,
                    (segment.y + 0.5 + 0.25) * config.tileSize - eyeSize / 2,
                    eyeSize,
                    eyeSize
                );
            } else if (gameState.direction === 'right') {
                ctx.fillRect(
                    (segment.x + 0.75) * config.tileSize - eyeSize / 2,
                    (segment.y + 0.5 - 0.25) * config.tileSize - eyeSize / 2,
                    eyeSize,
                    eyeSize
                );
                ctx.fillRect(
                    (segment.x + 0.75) * config.tileSize - eyeSize / 2,
                    (segment.y + 0.5 + 0.25) * config.tileSize - eyeSize / 2,
                    eyeSize,
                    eyeSize
                );
            }
        } else {
            // 身体
            const gradient = ctx.createLinearGradient(
                segment.x * config.tileSize,
                segment.y * config.tileSize,
                (segment.x + 1) * config.tileSize,
                (segment.y + 1) * config.tileSize
            );
            gradient.addColorStop(0, '#4ecdc4');
            gradient.addColorStop(1, '#45b7d1');
            
            ctx.fillStyle = gradient;
            ctx.fillRect(
                segment.x * config.tileSize + 2,
                segment.y * config.tileSize + 2,
                config.tileSize - 4,
                config.tileSize - 4
            );
            
            // 身体分段效果
            ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.fillRect(
                segment.x * config.tileSize + 4,
                segment.y * config.tileSize + 4,
                config.tileSize - 8,
                config.tileSize - 8
            );
        }
    });
}

// 处理键盘输入
function handleKeyPress(e) {
    const key = e.key;
    
    switch (key) {
        case 'ArrowUp':
            e.preventDefault();
            if (gameState.direction !== 'down') {
                gameState.nextDirection = 'up';
            }
            break;
        case 'ArrowDown':
            e.preventDefault();
            if (gameState.direction !== 'up') {
                gameState.nextDirection = 'down';
            }
            break;
        case 'ArrowLeft':
            e.preventDefault();
            if (gameState.direction !== 'right') {
                gameState.nextDirection = 'left';
            }
            break;
        case 'ArrowRight':
            e.preventDefault();
            if (gameState.direction !== 'left') {
                gameState.nextDirection = 'right';
            }
            break;
        case ' ':
            e.preventDefault();
            if (gameState.gameRunning) {
                pauseGame();
            } else {
                startGame();
            }
            break;
    }
}

// 改变方向（用于手机控制）
function changeDirection(dir) {
    if (
        (dir === 'up' && gameState.direction !== 'down') ||
        (dir === 'down' && gameState.direction !== 'up') ||
        (dir === 'left' && gameState.direction !== 'right') ||
        (dir === 'right' && gameState.direction !== 'left')
    ) {
        gameState.nextDirection = dir;
    }
}

// 处理窗口大小变化
function handleResize() {
    // 保存当前游戏状态
    const wasRunning = gameState.gameRunning;
    const wasPaused = gameState.gamePaused;
    
    // 暂停游戏（如果正在运行）
    if (wasRunning && !wasPaused) {
        pauseGame();
    }
    
    // 更新画布大小
    const containerWidth = document.querySelector('.canvas-container').clientWidth;
    const size = Math.min(containerWidth - 20, 400);
    gameState.canvas.width = size;
    gameState.canvas.height = size;
    
    // 重新计算网格大小
    config.tileSize = Math.floor(size / config.gridSize);
    
    // 重新绘制游戏
    draw();
    
    // 恢复游戏状态
    if (wasRunning && !wasPaused) {
        setTimeout(() => {
            startGame();
        }, 100);
    }
}

// 添加防抖处理
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 初始化游戏
window.addEventListener('load', initGame);
window.addEventListener('resize', debounce(handleResize, 200));
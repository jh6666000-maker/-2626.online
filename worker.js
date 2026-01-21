// Cloudflare Workers 脚本，用于部署贪吃蛇游戏
addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  // 返回贪吃蛇游戏的HTML内容
  return new Response(getGameHTML(), {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  });
}

// 贪吃蛇游戏的HTML内容
function getGameHTML() {
  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>贪吃蛇游戏</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Arial', sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            color: #fff;
        }

        .game-container {
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(10px);
            border-radius: 20px;
            padding: 20px;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
            max-width: 600px;
            width: 100%;
        }

        .game-header {
            text-align: center;
            margin-bottom: 20px;
        }

        .game-title {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }

        .game-info {
            display: flex;
            justify-content: space-around;
            margin-bottom: 15px;
            font-size: 1.2em;
        }

        .info-item {
            background: rgba(255, 255, 255, 0.2);
            padding: 8px 16px;
            border-radius: 20px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .canvas-container {
            display: flex;
            justify-content: center;
            margin-bottom: 20px;
        }

        #gameCanvas {
            border: 3px solid rgba(255, 255, 255, 0.3);
            border-radius: 10px;
            background: rgba(0, 0, 0, 0.5);
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .control-section {
            margin-bottom: 20px;
        }

        .control-row {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 10px;
        }

        .btn {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
            color: white;
            border: none;
            padding: 12px 24px;
            font-size: 1em;
            border-radius: 25px;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            min-width: 100px;
        }

        .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        }

        .btn:active {
            transform: translateY(0);
        }

        .btn-primary {
            background: linear-gradient(45deg, #4ecdc4, #45b7d1);
        }

        .btn-secondary {
            background: linear-gradient(45deg, #96ceb4, #ffeaa7);
            color: #2d3436;
        }

        .difficulty-selector {
            display: flex;
            justify-content: center;
            gap: 10px;
            margin-bottom: 20px;
        }

        .difficulty-btn {
            padding: 8px 16px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border-radius: 20px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .difficulty-btn.active {
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
            border-color: white;
        }

        .mobile-controls {
            display: none;
            grid-template-columns: repeat(3, 1fr);
            grid-template-rows: repeat(3, 1fr);
            gap: 10px;
            max-width: 300px;
            margin: 0 auto 20px;
        }

        .mobile-btn {
            background: rgba(255, 255, 255, 0.2);
            border: 2px solid rgba(255, 255, 255, 0.3);
            color: white;
            font-size: 1.5em;
            padding: 20px;
            border-radius: 15px;
            cursor: pointer;
            transition: all 0.2s ease;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .mobile-btn:hover {
            background: rgba(255, 255, 255, 0.3);
        }

        .mobile-btn:active {
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0.95);
        }

        .mobile-btn:nth-child(2) {
            grid-column: 2;
            grid-row: 1;
        }

        .mobile-btn:nth-child(3) {
            grid-column: 1;
            grid-row: 2;
        }

        .mobile-btn:nth-child(4) {
            grid-column: 2;
            grid-row: 2;
            visibility: hidden;
        }

        .mobile-btn:nth-child(5) {
            grid-column: 3;
            grid-row: 2;
        }

        .mobile-btn:nth-child(6) {
            grid-column: 2;
            grid-row: 3;
        }

        .game-over {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: none;
            justify-content: center;
            align-items: center;
            z-index: 1000;
        }

        .game-over-content {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .game-over-title {
            font-size: 2.5em;
            margin-bottom: 20px;
            color: #ff6b6b;
        }

        .game-over-text {
            font-size: 1.2em;
            margin-bottom: 30px;
        }

        /* 响应式设计 */
        @media (max-width: 768px) {
            .game-container {
                margin: 10px;
                padding: 15px;
            }

            .game-title {
                font-size: 2em;
            }

            .game-info {
                font-size: 0.9em;
                flex-wrap: wrap;
                gap: 8px;
            }

            .info-item {
                padding: 6px 12px;
                font-size: 0.9em;
            }

            #gameCanvas {
                max-width: 100%;
                height: auto;
            }

            .mobile-controls {
                display: grid;
                gap: 15px;
                max-width: 280px;
            }

            .mobile-btn {
                padding: 25px;
                font-size: 1.5em;
            }
        }

        @media (max-width: 480px) {
            .game-title {
                font-size: 1.5em;
            }

            .control-row {
                flex-wrap: wrap;
                gap: 8px;
            }

            .btn {
                padding: 10px 16px;
                font-size: 0.85em;
                min-width: 80px;
            }

            .mobile-controls {
                gap: 12px;
                max-width: 250px;
            }

            .mobile-btn {
                padding: 20px;
                font-size: 1.3em;
            }
        }
        
        @media (max-width: 360px) {
            .game-info {
                font-size: 0.8em;
                gap: 6px;
            }
            
            .info-item {
                padding: 5px 10px;
            }
            
            .btn {
                padding: 8px 14px;
                font-size: 0.8em;
                min-width: 70px;
            }
            
            .mobile-btn {
                padding: 18px;
                font-size: 1.2em;
            }
        }
    </style>
</head>
<body>
    <div class="game-container">
        <div class="game-header">
            <h1 class="game-title">贪吃蛇大冒险</h1>
            <div class="game-info">
            <div class="info-item">分数: <span id="score">0</span></div>
            <div class="info-item">关卡: <span id="level">1</span></div>
            <div class="info-item">目标: <span id="target">10</span></div>
            <div class="info-item">最高分: <span id="highScore">0</span></div>
        </div>
        </div>

        <div class="difficulty-selector">
            <div class="difficulty-btn active" data-difficulty="easy">简单</div>
            <div class="difficulty-btn" data-difficulty="medium">中等</div>
            <div class="difficulty-btn" data-difficulty="hard">困难</div>
        </div>

        <div class="canvas-container">
            <canvas id="gameCanvas" width="400" height="400"></canvas>
        </div>

        <div class="control-section">
            <div class="control-row">
                <button class="btn btn-primary" onclick="startGame()">开始游戏</button>
                <button class="btn btn-secondary" onclick="pauseGame()">暂停</button>
                <button class="btn" onclick="resetGame()">重置</button>
                <button class="btn btn-secondary" onclick="toggleSound()" id="soundBtn">🔊 音效</button>
            </div>
        </div>

        <div class="mobile-controls">
            <div class="mobile-btn" onclick="changeDirection('up')">↑</div>
            <div class="mobile-btn" onclick="changeDirection('left')">←</div>
            <div class="mobile-btn"></div>
            <div class="mobile-btn" onclick="changeDirection('right')">→</div>
            <div class="mobile-btn" onclick="changeDirection('down')">↓</div>
        </div>
    </div>

    <div class="game-over" id="gameOver">
        <div class="game-over-content">
            <h2 class="game-over-title">游戏结束</h2>
            <div class="game-over-text">
                <p>最终分数: <span id="finalScore">0</span></p>
                <p>最终关卡: <span id="finalLevel">1</span></p>
            </div>
            <button class="btn btn-primary" onclick="resetGame()">再来一局</button>
        </div>
    </div>

    <script>
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
        
        // 播放音效
        function playSound(frequency, duration, type = 'sine') {
            if (!gameState.soundEnabled) return;
            
            initAudio();
            
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
            let newFood;
            do {
                newFood = {
                    x: Math.floor(Math.random() * config.gridSize),
                    y: Math.floor(Math.random() * config.gridSize)
                };
            } while (gameState.snake.some(segment => segment.x === newFood.x && segment.y === newFood.y));
            
            gameState.food = newFood;
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
                    cancelAnimationFrame(gameState.animationId);
                    gameState.animationId = null;
                }
            }
        }

        // 重置游戏
        function resetGame() {
            if (gameState.animationId) {
                cancelAnimationFrame(gameState.animationId);
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
            
            setTimeout(() => {
                update();
                draw();
                playMoveSound(); // 播放移动音效
                gameState.animationId = requestAnimationFrame(gameLoop);
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

        // 升级
        function levelUp() {
            gameState.level++;
            gameState.target += config.levelUpScore;
            updateSpeed();
            updateUI();
            playLevelUpSound(); // 播放升级音效
            
            // 短暂暂停显示升级信息
            pauseGame();
            setTimeout(() => {
                alert(`恭喜！升级到第 ${gameState.level} 关！速度更快了哦！`);
                startGame();
            }, 500);
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
            const savedHighScore = localStorage.getItem('snakeGameHighScore');
            if (savedHighScore) {
                gameState.highScore = parseInt(savedHighScore);
            }
        }
        
        // 保存最高分
        function saveHighScore() {
            if (gameState.score > gameState.highScore) {
                gameState.highScore = gameState.score;
                localStorage.setItem('snakeGameHighScore', gameState.highScore.toString());
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

        // 初始化游戏
        window.addEventListener('load', initGame);
        window.addEventListener('resize', initGame);
    </script>
</body>
</html>`;
}

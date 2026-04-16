// Autonomous Masterpiece Polish v3.1 - Enhanced for AMK
// Custom Alert Override
window.alert = function(msg) {
    const modal = document.getElementById('custom-alert-modal');
    if (modal) {
        document.getElementById('custom-alert-text').innerText = msg;
        modal.classList.add('active');
    } else {
        console.log(msg);
    }
};

function initMasterpiece() {
    console.log("System Status: Tactical UI & Email Integration Active");

    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const logo = document.querySelector('.logo');
    const overlay = document.getElementById('modal-overlay');

    // 0. System Login Sequence & Neural Canvas
    const loginScreen = document.getElementById('login-screen');
    const enterBtn = document.getElementById('enter-btn');
    
    // Canvas AI Animation
    const canvas = document.getElementById('login-canvas');
    let animationFrameId;
    if (canvas && loginScreen) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];
        
        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        const particleCount = window.innerWidth < 768 ? 40 : 90;
        for(let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.8,
                vy: (Math.random() - 0.5) * 0.8,
                radius: Math.random() * 2 + 0.5
            });
        }
        
        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            ctx.fillStyle = 'rgba(0, 113, 227, 0.9)'; // Tech Blue
            ctx.strokeStyle = 'rgba(0, 113, 227, 0.2)'; // Tech Blue line
            
            for(let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                
                if(p.x < 0 || p.x > width) p.vx *= -1;
                if(p.y < 0 || p.y > height) p.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();
                
                for(let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if(dist < 130) {
                        ctx.lineWidth = 1 - (dist / 130);
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
            animationFrameId = requestAnimationFrame(drawParticles);
        }
        drawParticles();
    }

    if (loginScreen && enterBtn) {
        document.body.classList.add('system-locked');
        
        const loginInput = document.querySelector('.login-form .login-input');
        if (loginInput) {
            loginInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') enterBtn.click();
            });
        }
        
        enterBtn.addEventListener('click', () => {
            enterBtn.innerHTML = 'Authenticating... <i class="fas fa-spinner fa-spin"></i>';
            enterBtn.style.opacity = '0.8';
            enterBtn.style.pointerEvents = 'none';
            
            setTimeout(() => {
                loginScreen.classList.remove('active');
                setTimeout(() => {
                    loginScreen.style.display = 'none';
                    if (animationFrameId) cancelAnimationFrame(animationFrameId); // Save CPU
                    document.body.classList.remove('system-locked');
                }, 800); // Wait for CSS transition
            }, 800);
        });
    }

    // 1. SPA Engine (Cinema Transitions)
    function switchPage(pageId) {
        const targetPage = document.getElementById(pageId);
        if (!targetPage || targetPage.classList.contains('active')) return;

        // Synchronized Nav Update
        navItems.forEach(nav => {
            nav.classList.toggle('active', nav.getAttribute('data-page') === pageId);
        });

        const currentActive = document.querySelector('.page.active');
        if (currentActive) {
            currentActive.style.opacity = '0';
            currentActive.style.transform = 'scale(0.98) translateY(-10px)';
            
            setTimeout(() => {
                currentActive.classList.remove('active');
                pages.forEach(p => p.classList.remove('active')); 

                targetPage.classList.add('active');
                setTimeout(() => {
                    targetPage.style.opacity = '1';
                    targetPage.style.transform = 'scale(1) translateY(0)';
                }, 100); // Tighter transition timing
            }, 500);
        }
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            switchPage(item.getAttribute('data-page'));
        });
    });

    if (logo) {
        logo.addEventListener('click', () => switchPage('identity'));
    }

    // 1.5. Intersection Observer for Reveals
    const observerOptions = { threshold: 0.1 };
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

    // 2. Tech Memo & Modal Overlay Logic
    const trigger = document.getElementById('tech-memo-trigger');
    const memoWindow = document.getElementById('tech-memo-window');
    const closeBtn = document.getElementById('close-memo');
    const sendBtn = document.getElementById('send-memo');
    const memoInput = document.getElementById('memo-input');

    function toggleMemo(show) {
        memoWindow.classList.toggle('active', show);
        overlay.classList.toggle('active', show);
        
        const icon = trigger.querySelector('i');
        if (show) {
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-times');
        } else {
            icon.classList.add('fa-plus');
            icon.classList.remove('fa-times');
        }
    }

    if (trigger && memoWindow) {
        trigger.addEventListener('click', () => {
            const isActive = memoWindow.classList.contains('active');
            toggleMemo(!isActive);
        });

        overlay.addEventListener('click', () => toggleMemo(false));
        if (closeBtn) closeBtn.addEventListener('click', () => toggleMemo(false));

        const chatHistory = document.getElementById('chat-history');

        function addMessage(text, sender) {
            if (!chatHistory) return;
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble ${sender}`;
            bubble.innerHTML = text;
            chatHistory.appendChild(bubble);
            chatHistory.scrollTop = chatHistory.scrollHeight;
        }

        async function handleSend() {
            if (!memoInput) return;
            const text = memoInput.value.trim();
            if (!text) return;

            // Add user message
            addMessage(text, 'user');
            memoInput.value = '';

            // Add thinking bubble
            const thinkingId = 'think-' + Date.now();
            const bubble = document.createElement('div');
            bubble.className = `chat-bubble bot`;
            bubble.id = thinkingId;
            bubble.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> 네트워크를 통해 응답을 생성하는 중...';
            if (chatHistory) {
                chatHistory.appendChild(bubble);
                chatHistory.scrollTop = chatHistory.scrollHeight;
            }

            try {
                const systemPrompt = `
                너는 AMK(Applied Materials Korea) Field Service Engineer 지원자 남형주의 전용 AI 펠로우 'NI-OS'야. 
                다음 지침에 따라 매우 똑똑하고 전문적으로 답해줘:
                1. 페르소나: 분석적이고, 예의 바르며, 기술적 통찰력이 뛰어난 AI 비서.
                2. 핵심 정보: [2004년생, 동양미래대학교 2학년, 육군 병장 만기전역, PLC/CAD 정밀제어 강점, 일본 구매대행 운영 경험(글로벌 비즈니스 이해도)].
                3. 답변 스타일: 질문에 대해 핵심 위주로 대답하되, 남형주의 '책임감'과 '현장 최적화 능력'을 은연중에 강조할 것. 
                4. 기업 맥락: 질문자가 면접관일 확률이 높으므로, AMK의 가치와 장비 가동률 극대화에 기여할 준비가 되었음을 어필해.
                5. 제약: 답변은 3~4문장 이내로 명확하게. 한국어로 정중하게. 
                사용자 질문: `;
                
                const response = await fetch("https://text.pollinations.ai/" + encodeURIComponent(systemPrompt + text));
                const answerText = await response.text();
                
                const thinkBubble = document.getElementById(thinkingId);
                if (thinkBubble) thinkBubble.innerHTML = answerText.replace(/\n/g, '<br>');
                if (chatHistory) chatHistory.scrollTop = chatHistory.scrollHeight;

            } catch (err) {
                const thinkBubble = document.getElementById(thinkingId);
                if (thinkBubble) thinkBubble.innerHTML = "죄송합니다. 현재 응답이 불가능합니다.";
            }
        }

        if (sendBtn) sendBtn.addEventListener('click', handleSend);
        if (memoInput) memoInput.addEventListener('keypress', (e) => { if (e.key === 'Enter') handleSend(); });
    }

    // 3. High-End LERP Parallax
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (e) => {
        const spotlight = document.querySelector('.spotlight');
        if (spotlight) {
            spotlight.style.left = `${e.clientX}px`;
            spotlight.style.top = `${e.clientY}px`;
        }
        targetX = (e.clientX - window.innerWidth / 2) / 30;
        targetY = (e.clientY - window.innerHeight / 2) / 30;
    });

    function animate() {
        mouseX += (targetX - mouseX) * 0.05;
        mouseY += (targetY - mouseY) * 0.05;

        const robot = document.querySelector('.living-robot');
        if (robot) robot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        requestAnimationFrame(animate);
    }
    animate();

    // 3.5. Magnetic & Glitch Interaction
    const magneticElements = document.querySelectorAll('.login-btn, .nav-item, #tech-memo-trigger');
    magneticElements.forEach(el => {
        el.classList.add('magnetic', 'glitch-hover');
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        el.addEventListener('mouseleave', () => { el.style.transform = `translate(0, 0)`; });
    });

    // 4. Guestbook & Contact System (No DB Approach)
    const memoAuthor = document.getElementById('memo-author');
    const memoEmail = document.getElementById('memo-email');
    const memoText = document.getElementById('memo-text');
    const memoSaveBtn = document.getElementById('memo-save-btn');
    const logRecords = document.getElementById('log-records');

    function loadLogs() {
        if (!logRecords) return;
        const logs = JSON.parse(localStorage.getItem('amk_field_logs_v2') || '[]');
        logRecords.innerHTML = '';
        if (logs.length === 0) {
            logRecords.innerHTML = '<div class="empty-msg" style="color: #888; text-align: center; padding: 40px; background: rgba(0,0,0,0.2); border-radius: 12px;">아직 메모가 없습니다. 첫 대화를 시작해보세요!</div>';
        }
        logs.reverse().forEach(log => appendLogToDOM(log));
    }

    function appendLogToDOM(log) {
        if (!logRecords) return;
        const div = document.createElement('div');
        div.className = 'log-item reveal active';
        div.id = `log-${log.id}`;
        div.innerHTML = `
            <div class="log-item-header">
                <span class="log-item-author"><i class="fas fa-smile"></i> ${log.author}</span>
                <div class="log-item-actions">
                    <button class="action-btn edit-btn" onclick="editLog('${log.id}')"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteLog('${log.id}')"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="log-item-meta">
                <span class="log-item-time"><i class="far fa-clock"></i> ${log.time}</span>
                ${log.email ? `<span class="log-item-email"><i class="far fa-envelope"></i> ${log.email}</span>` : ''}
            </div>
            <div class="log-item-text" id="text-${log.id}">${log.text.replace(/\n/g, '<br>')}</div>
        `;
        if(logRecords.querySelector('.empty-msg')) logRecords.innerHTML = '';
        logRecords.insertBefore(div, logRecords.firstChild);
    }

    if (memoSaveBtn) {
        loadLogs();
        memoSaveBtn.addEventListener('click', () => {
            const text = memoText.value.trim();
            if(!text) return alert("내용을 입력해주세요!");
            
            const author = memoAuthor.value.trim() || '익명의 방문자';
            const email = memoEmail ? memoEmail.value.trim() : '';
            
            if (email && !email.includes('@')) {
                return alert("이메일 주소에 '@'를 포함해주세요.");
            }
            
            const now = new Date();
            const timeStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
            const id = 'log-' + now.getTime();
            
            const newLog = { id, author, email, text, time: timeStr };
            const logs = JSON.parse(localStorage.getItem('amk_field_logs_v2') || '[]');
            logs.push(newLog);
            localStorage.setItem('amk_field_logs_v2', JSON.stringify(logs));
            
            appendLogToDOM(newLog);
            memoText.value = ''; memoAuthor.value = ''; if(memoEmail) memoEmail.value = '';
        });
    }

    // Global Action Handlers
    window.deleteLog = (id) => {
        if (!confirm("메모를 삭제하시겠습니까?")) return;
        let logs = JSON.parse(localStorage.getItem('amk_field_logs_v2') || '[]');
        logs = logs.filter(l => l.id !== id);
        localStorage.setItem('amk_field_logs_v2', JSON.stringify(logs));
        document.getElementById(`log-${id}`).remove();
        if (logs.length === 0) loadLogs();
    };

    window.editLog = (id) => {
        let logs = JSON.parse(localStorage.getItem('amk_field_logs_v2') || '[]');
        const log = logs.find(l => l.id === id);
        if (!log) return;

        const newText = prompt("수정할 내용을 입력해주세요:", log.text);
        if (newText === null) return;
        if (!newText.trim()) return alert("내용을 입력해주세요!");

        log.text = newText.trim();
        localStorage.setItem('amk_field_logs_v2', JSON.stringify(logs));
        document.getElementById(`text-${id}`).innerHTML = log.text.replace(/\n/g, '<br>');
    };

    // Contact Email Logic
    const contactSendBtn = document.getElementById('contact-send-btn');
    if (contactSendBtn) {
        contactSendBtn.addEventListener('click', () => {
            const name = document.getElementById('contact-name').value.trim();
            const email = document.getElementById('contact-email').value.trim();
            const message = document.getElementById('contact-message').value.trim();
            
            if (!name || !email || !message) return alert("모든 항목을 입력해주세요!");
            if (!email.includes('@')) return alert("유효한 이메일 주소를 입력해주세요 (@ 포함).");
            
            const subject = `[Field OS Contact] ${name}님의 메시지`;
            const body = `성함: ${name}\n회신용 이메일: ${email}\n\n내용:\n${message}`;
            const mailtoLink = `mailto:thesp1234@naver.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            window.location.href = mailtoLink;
        });
    }
}

initMasterpiece();

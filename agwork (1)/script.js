// Autonomous Masterpiece Polish v3.1 - Enhanced for AMK
// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJhg64C2kyveworfxk-iv4vcHL-rlpr40",
  authDomain: "qwer1234-18b6a.firebaseapp.com",
  projectId: "qwer1234-18b6a",
  storageBucket: "qwer1234-18b6a.firebasestorage.app",
  messagingSenderId: "962039848141",
  appId: "1:962039848141:web:bfa4e77475c9ef10451d84",
  measurementId: "G-PFQGFHT019",
  databaseURL: "https://qwer1234-18b6a-default-rtdb.asia-southeast1.firebasedatabase.app"
};

// Initialize Firebase SDK safely
let db = null;
try {
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
} catch (error) {
    console.error("Firebase Initialization Error:", error);
}

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
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        for(let i = 0; i < 70; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.4,
                vy: (Math.random() - 0.5) * 0.4,
                radius: Math.random() * 2 + 1,
                alpha: Math.random() * 0.5 + 0.1
            });
        }
        
        function drawParticles() {
            ctx.fillStyle = '#0a0a0c'; // Deep K-Tech Navy
            ctx.fillRect(0, 0, width, height);
            
            ctx.strokeStyle = 'rgba(64, 169, 255, 0.08)'; // Subtle blue lines
            
            for(let i = 0; i < particles.length; i++) {
                let p = particles[i];
                p.x += p.vx;
                p.y += p.vy;
                
                if(p.x < 0 || p.x > width) p.vx *= -1;
                if(p.y < 0 || p.y > height) p.vy *= -1;
                
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(64, 169, 255, ${p.alpha})`;
                ctx.fill();
                
                for(let j = i + 1; j < particles.length; j++) {
                    let p2 = particles[j];
                    let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                    if(dist < 150) {
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

    // 4. Scroll Progress Engine setup early so it can be called in switchPage
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    function updateProgress() {
        const activePage = document.querySelector('.page.active');
        if (activePage) {
            const totalHeight = activePage.scrollHeight - activePage.clientHeight;
            const progress = totalHeight > 0 ? (activePage.scrollTop / totalHeight) * 100 : 0;
            progressBar.style.width = progress + '%';
        }
    }

    // Attach to all pages for scroll progress
    pages.forEach(page => {
        page.addEventListener('scroll', updateProgress);
    });
    window.addEventListener('resize', updateProgress);

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
                targetPage.scrollTop = 0; // Reset scroll position on page change
                updateProgress();         // Reset progress bar to 0%
                
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

    // 4. Guestbook & Contact System (Firebase Database Approach)
    const memoAuthor = document.getElementById('memo-author');
    const memoEmail = document.getElementById('memo-email');
    const memoText = document.getElementById('memo-text');
    const memoSaveBtn = document.getElementById('memo-save-btn');
    const logRecords = document.getElementById('log-records');

    let localLogs = JSON.parse(localStorage.getItem('guestbook_logs') || '[]');
    let myPosts = JSON.parse(localStorage.getItem('my_guestbook_posts') || '[]');
    
    // 로컬 스토리지 데이터 마이그레이션 (과거에 쓴 글들 id 처리)
    localLogs = localLogs.map(log => {
        if (!log.id) log.id = 'local_' + log.timestamp;
        if (!myPosts.includes(log.id)) {
            myPosts.push(log.id);
        }
        return log;
    });
    localStorage.setItem('my_guestbook_posts', JSON.stringify(myPosts));

    function renderLogs(logsArray) {
        if (!logRecords) return;
        logRecords.innerHTML = '';
        if (logsArray.length === 0) {
            logRecords.innerHTML = '<div class="empty-msg" style="color: #888; text-align: center; padding: 40px; background: rgba(0,0,0,0.2); border-radius: 12px;">아직 메모가 없습니다. 첫 메모를 남겨보세요!</div>';
            return;
        }
        logsArray.forEach(log => appendLogToDOM(log, myPosts.includes(log.id)));
    }

    // 초기에 100% 무조건 로컬 데이터 바탕으로 먼저 그림 (사라졌던 과거 로그 즉각 복구!!)
    if (logRecords) renderLogs(localLogs);

    const logsRef = db ? db.ref('guestbook_logs') : null;

    // 파이어베이스 동기화 시도 (백그라운드)
    if (logRecords && logsRef) {
        logsRef.on('value', (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const logsArray = Object.keys(data).map(key => ({
                    id: key,
                    ...data[key]
                })).sort((a, b) => b.timestamp - a.timestamp);
                
                // 만약 백엔드(Firebase) 데이터가 존재하면 최신 클라우드 데이터로 덮어씌움
                renderLogs(logsArray);
                
                // 혹시 모를 오프라인 대비를 위해 최신 DB를 로컬에 다시 백업
                localStorage.setItem('guestbook_logs', JSON.stringify(logsArray));
                localLogs = logsArray;
            }
        }, (error) => {
            console.error("Firebase Database Error: ", error);
        });
    }

    function appendLogToDOM(log, isMine = false) {
        if (!logRecords) return;
        const div = document.createElement('div');
        div.className = `log-item reveal active ${isMine ? 'mine' : 'others'}`;
        div.id = `log-${log.id}`;
        div.innerHTML = `
            <div class="log-item-header">
                <span class="log-item-author"><i class="fas fa-smile"></i> ${log.author} ${isMine ? '<span class="my-badge">(내가 쓴 글)</span>' : ''}</span>
                <div class="log-item-actions">
                    <button class="action-btn edit-btn" onclick="editLog('${log.id}')"><i class="fas fa-edit"></i></button>
                    <button class="action-btn delete-btn" onclick="deleteLog('${log.id}')"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            <div class="log-item-meta">
                <span class="log-item-time"><i class="far fa-clock"></i> ${log.timeStr}</span>
                ${log.email ? `<span class="log-item-email"><i class="far fa-envelope"></i> ${log.email}</span>` : ''}
            </div>
            <div class="log-item-text" id="text-${log.id}">${log.text.replace(/\n/g, '<br>')}</div>
        `;
        logRecords.appendChild(div);
    }

    if (memoSaveBtn) {
        memoSaveBtn.addEventListener('click', () => {
            const text = memoText.value.trim();
            if(!text) return alert("내용을 입력해주세요!");
            
            const author = memoAuthor.value.trim();
            if(!author) return alert("방문자 성함을 입력해주세요!");
            const email = memoEmail ? memoEmail.value.trim() : '';
            
            if (email && !email.includes('@')) {
                return alert("이메일 주소에 '@'를 포함해주세요.");
            }
            
            const now = new Date();
            const timeStr = `${now.getFullYear()}.${String(now.getMonth()+1).padStart(2,'0')}.${now.getDate()} ${now.getHours()}:${now.getMinutes()}`;
            
            const newLog = {
                id: 'local_' + Date.now().toString(),
                author: author,
                email: email,
                text: text,
                timeStr: timeStr,
                timestamp: Date.now()
            };

            myPosts.push(newLog.id);
            localStorage.setItem('my_guestbook_posts', JSON.stringify(myPosts));

            if (logsRef) {
                // Firebase로 데이터 전송 시도
                const newLogRef = logsRef.push();
                newLog.id = newLogRef.key;
                
                // 파이어베이스 키로 업데이트
                myPosts.push(newLog.id);
                localStorage.setItem('my_guestbook_posts', JSON.stringify(myPosts));

                newLogRef.set({
                    author: newLog.author,
                    email: newLog.email,
                    text: newLog.text,
                    timeStr: newLog.timeStr,
                    timestamp: firebase.database.ServerValue.TIMESTAMP
                });
                
                // 즉각적인 시각 반응 (Optimistic UI)
                localLogs.unshift(newLog);
                renderLogs(localLogs);
            } else {
                // Firebase가 오프라인이거나 없을 경우 순수 로컬스토리지 모드로 작동
                localLogs.unshift(newLog);
                localStorage.setItem('guestbook_logs', JSON.stringify(localLogs));
                renderLogs(localLogs);
            }
            
            memoText.value = ''; memoAuthor.value = ''; if(memoEmail) memoEmail.value = '';
        });
    }

    // Global Action Handlers
    window.deleteLog = (id) => {
        if (!confirm("메모를 삭제하시겠습니까?")) return;
        
        if (logsRef) {
            logsRef.child(id).remove();
        }
        
        // Update Local
        localLogs = localLogs.filter(log => log.id !== id);
        localStorage.setItem('guestbook_logs', JSON.stringify(localLogs));
        renderLogs(localLogs);
    };

    window.editLog = (id) => {
        const textElement = document.getElementById(`text-${id}`);
        if (!textElement) return;
        
        let originalText = textElement.innerHTML.replace(/<br>/g, '\n');
        
        const newText = prompt("수정할 내용을 입력해주세요:", originalText);
        if (newText === null) return;
        if (!newText.trim()) return alert("내용을 입력해주세요!");

        if (logsRef) {
            logsRef.child(id).update({
                text: newText.trim()
            });
        }
        
        // Update local
        const target = localLogs.find(log => log.id === id);
        if (target) target.text = newText.trim();
        localStorage.setItem('guestbook_logs', JSON.stringify(localLogs));
        renderLogs(localLogs);
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

    // 3. Tech-Luxe Effects Overlay
    const cursor = document.createElement('div');
    cursor.className = 'cursor-follower';
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    document.querySelectorAll('a, button, .nav-item').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('active'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('active'));
    });

    // 5. Typewriter Effect for Hero
    const heroTitleRows = document.querySelectorAll('#identity h1 span');
    heroTitleRows.forEach((row, idx) => {
        const originalText = row.innerText;
        row.innerText = '';
        setTimeout(() => {
            let i = 0;
            const timer = setInterval(() => {
                row.innerText += originalText.charAt(i);
                i++;
                if (i >= originalText.length) clearInterval(timer);
            }, 60);
        }, idx * 600);
    });

    // 7. Premium Loading Sequence
    const loadingOverlay = document.getElementById('loading-overlay');
    const loadingBar = document.getElementById('loading-bar');
    
    if (loadingOverlay && loadingBar) {
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 30;
            if (progress > 100) progress = 100;
            loadingBar.style.width = progress + '%';
            
            if (progress === 100) {
                clearInterval(interval);
                setTimeout(() => {
                    loadingOverlay.style.opacity = '0';
                    setTimeout(() => {
                        loadingOverlay.style.visibility = 'hidden';
                    }, 1000);
                }, 500);
            }
        }, 300);
    }

    // 8. Mobile & Touch Guard
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
        if (cursor) cursor.style.display = 'none';
        document.querySelectorAll('.artifact-item, .field-robot-container').forEach(item => {
            item.style.transform = 'none';
        });
    }

}

initMasterpiece();

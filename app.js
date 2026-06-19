/**
 * 한국시 MBTI 웹 애플리케이션 비즈니스 로직 (스낵형 3문항 수정안)
 */

document.addEventListener("DOMContentLoaded", () => {
  // 3가지 감성 및 가치관 질문 세트 정의
  const questions = [
    {
      id: 1,
      dimension: "Q1",
      text: "Q1. 지금 내 마음의 '백그라운드 뮤직'은 어떤 음악에 가까운가요?",
      options: [
        { text: "🎵 신나는 락 페스티벌 (열정, 에너지, 도전)", value: "summer", apple: null },
        { text: "🎧 잔잔한 새벽 플레이리스트 (고독, 사색, 위로가 필요한 상태)", value: "spring", apple: null },
        { text: "🔇 노이즈 캔슬링 100% (지침, 휴식, 세상과의 거리두기)", value: "winter", apple: null },
        { text: "⛈️ 천둥 번개 치는 오케스트라 (혼란, 격정, 감정의 휘몰아침)", value: "autumn", apple: null }
      ]
    },
    {
      id: 2,
      dimension: "Q2",
      text: "Q2. 오늘 밤, 내 피드(Feed)에 남기고 싶은 무드는 무엇인가요?",
      options: [
        { text: "🌆 노을빛이 쏟아지는 아늑한 자취방 창문 (일상의 소중함, 따뜻한 온기, 평화)", value: "spring", apple: null },
        { text: "🌌 어두운 밤하늘을 가로지르는 혜성이나 야경 (청춘의 낭만, 해방감, 이상주의)", value: "summer", apple: null },
        { text: "📚 오래된 잉크 냄새가 나는 심야 서점의 책장 (깊이 있는 성찰, 고전, 지적 탐구)", value: "winter", apple: null },
        { text: "🏙️ 바쁘게 불이 켜진 늦은 밤 도심의 빌딩 숲 (현실주의, 치열함, 갓생)", value: "autumn", apple: null }
      ]
    },
    {
      id: 3,
      dimension: "Q3",
      text: "Q3. 백설공주처럼, 누군가 건네는 사과를 한 입 베어문다면?",
      options: [
        { text: "💘 달콤한 사랑의 사과 — 내 삶의 원동력은 결국 사람, 사랑, 낭만", value: null, apple: "love" },
        { text: "💰 황금빛 성공의 사과 — 결과로 말한다. 단단한 현실주의", value: null, apple: "success" },
        { text: "💡 머리를 탁 치는 뉴턴의 사과 — 지적 자극, 새로움, 영감과 탐구", value: null, apple: "insight" },
        { text: "🩹 마음을 치유하는 회복의 사과 — 위로, 평안, 안식이 필요한 나", value: null, apple: "healing" }
      ]
    }
  ];

  // MBTI별 시적 성향 타이틀 및 해설 정의
  const mbtiProfiles = {
    INFJ: { title: "사색하는 별빛", desc: "고요함 속에서 자아를 끊임없이 성찰하고, 보이지 않는 영원한 가치와 평화를 추구하는 숭고한 영혼입니다." },
    INFP: { title: "고독한 나타샤", desc: "꿈과 낭만을 가슴에 품고, 세상의 속박에서 벗어나 자신만의 은밀하고 아름다운 사랑을 그리는 예술가적 영혼입니다." },
    INTJ: { title: "새벽의 광야", desc: "차가운 현실 속에서도 먼 미래의 비전과 독립(초인)을 내다보며 가슴속 강인한 의지의 씨앗을 뿌리는 전략가입니다." },
    INTP: { title: "실존을 부르는 꽃", desc: "존재의 본원적인 의미와 가치를 끝없이 탐구하고, 세상만물의 실존적 소통을 추구하는 사색가입니다." },
    ISFJ: { title: "돌담길의 햇발", desc: "가장 가깝고 소중한 이들을 위해 소박하고 묵묵하게 온기를 채워주는 헌신적이고 지조 있는 지키미입니다." },
    ISFP: { title: "길 위의 나그네", desc: "바람이 부는 감촉과 아름다운 저녁놀처럼 현재의 감각과 감정에 충실하며 유유자적 흘러가는 자연스러운 평화주의자입니다." },
    ISTJ: { title: "무릎 꿇은 갈매나무", desc: "모든 것을 잃은 절망 속에서도 슬픔의 앙금을 가라앉히며, 눈보라 속 꿋꿋이 서 있는 한 그루 나무처럼 책임을 다하는 단단한 지성입니다." },
    ISTP: { title: "외로운 수선화", desc: "인생의 숙명 같은 고독을 피하지 않고 담담히 마주하며, 비가 오면 빗속을 걸어가는 자립적이고 시크한 낭만가입니다." },
    ENFJ: { title: "스스로 봄길이 되는 사람", desc: "길이 끝나는 절망의 순간에도 먼저 타인의 희망이자 따뜻한 봄길이 되어 공동체를 보듬는 이타적인 인도자입니다." },
    ENFP: { title: "청포도 빛의 꿈", desc: "푸르른 하늘 밑에서 꿈꾸는 흰 돛 단 배처럼, 풍부한 애정과 낙천적인 에너지를 뿜어내며 삶을 한 편의 소풍으로 누리는 정열가입니다." },
    ENTJ: { title: "바다를 꾸짖는 파도", desc: "구습을 타파하고 웅장한 목소리로 세상을 뒤흔들며, 소년의 거대한 포부와 야망을 적극적으로 실현하려는 개척자입니다." },
    ENTP: { title: "바람보다 먼저 일어나는 풀", desc: "어떤 외압이나 억압 앞에서도 밟히면 밟힐수록 더 빨리 웃고 더 먼저 일어서는 끈질긴 생명력과 자유의 개혁자입니다." },
    ESFJ: { title: "우주를 품은 방문객", desc: "한 사람 한 사람의 일생을 우주처럼 마주하며, 깊은 환대와 따뜻한 사교성으로 서로를 보듬어주는 온화한 중재자입니다." },
    ESFP: { title: "봄날의 모란", desc: "찬란하고 화려한 삶의 순간순간을 날 것 그대로 사랑하고 슬퍼하며, 격정적인 감정을 솔직하고 다채롭게 피워내는 주인공입니다." },
    ESTJ: { title: "불꽃으로 우는 인경", desc: "신념을 지키기 위해서라면 두개골이 깨지는 기쁨마저 사양하지 않는, 활화산 같은 투지와 강인한 정의감의 소유자입니다." },
    ESTP: { title: "뜨겁게 타오르는 연탄재", desc: "누군가를 위해 자신의 온몸을 뜨겁게 불태워 본 적이 있는가 질문을 던질 만큼, 매 순간을 주저함 없이 치열하게 살아가는 행동파입니다." }
  };

  // 애플리케이션 상태 관리
  let selectedMbti = { EI: "I", SN: "N", TF: "F", JP: "P" };
  let currentQuestionIndex = 0;
  let selectedAnswers = []; // 감성 질문 응답 누적 배열
  let currentPoem = null;

  // DOM 요소 선택
  const landingSection = document.getElementById("landing-section");
  const quizSection = document.getElementById("quiz-section");
  const resultSection = document.getElementById("result-section");

  const btnStart = document.getElementById("btn-start");
  const btnRestart = document.getElementById("btn-restart");
  const btnShareCopy = document.getElementById("btn-share-copy");
  const btnHome = document.getElementById("btn-home");

  const btnToggles = document.querySelectorAll(".btn-toggle");
  const mbtiPreviewText = document.getElementById("mbti-preview-text");

  const progressBar = document.getElementById("progress-bar");
  const questionNumber = document.getElementById("question-number");
  const questionText = document.getElementById("question-text");
  const optionsContainer = document.getElementById("options-container");

  const userMbtiType = document.getElementById("user-mbti-type");
  const poemTitle = document.getElementById("poem-title");
  const poetName = document.getElementById("poet-name");
  const poemContent = document.getElementById("poem-content");
  const matchReason = document.getElementById("match-reason");

  // === MBTI 토글 처리 로직 ===
  btnToggles.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const row = e.target.closest(".toggle-row");
      const dimension = row.dataset.dimension;
      const value = e.target.dataset.value;

      // 같은 행 내 비활성화 처리
      row.querySelectorAll(".btn-toggle").forEach(b => b.classList.remove("active"));
      e.target.classList.add("active");

      // 선택 상태 업데이트 및 실시간 미리보기 갱신
      selectedMbti[dimension] = value;
      updateMbtiPreview();
    });
  });

  function updateMbtiPreview() {
    const mbtiCode = selectedMbti.EI + selectedMbti.SN + selectedMbti.TF + selectedMbti.JP;
    const profile = mbtiProfiles[mbtiCode];
    mbtiPreviewText.textContent = `${profile.title} (${mbtiCode})`;
  }

  // 초기 미리보기 설정
  updateMbtiPreview();

  // === 이벤트 리스너 등록 ===

  // 감성 질문 시작
  btnStart.addEventListener("click", () => {
    transitionSection(landingSection, quizSection, () => {
      currentQuestionIndex = 0;
      selectedAnswers = [];
      showQuestion(currentQuestionIndex);
    });
  });

  // 처음으로 이동
  btnHome.addEventListener("click", () => {
    transitionSection(resultSection, landingSection);
  });

  // 다시 테스트하기
  btnRestart.addEventListener("click", () => {
    transitionSection(resultSection, quizSection, () => {
      currentQuestionIndex = 0;
      selectedAnswers = [];
      showQuestion(currentQuestionIndex);
    });
  });

  // 결과 복사하기
  btnShareCopy.addEventListener("click", () => {
    if (!currentPoem) return;

    const mbtiCode = selectedMbti.EI + selectedMbti.SN + selectedMbti.TF + selectedMbti.JP;
    const profile = mbtiProfiles[mbtiCode];
    const textToCopy = `[한국시 MBTI - 나의 인생시]\n\n나의 시적 성향: ${profile.title} (${mbtiCode})\n\n[매칭된 인생시]\n제목: ${currentPoem.title}\n시인: ${currentPoem.poet}\n\n${currentPoem.content}\n\n* ${matchReason.textContent}\n\n- 나만의 인생시 확인하기: ${window.location.href}`;

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
        const originalText = btnShareCopy.innerHTML;
        btnShareCopy.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6L9 17l-5-5"/></svg> 복사 완료!`;
        btnShareCopy.style.background = "#2e7d32";
        btnShareCopy.style.color = "#ffffff";

        setTimeout(() => {
          btnShareCopy.innerHTML = originalText;
          btnShareCopy.style.background = "";
          btnShareCopy.style.color = "";
        }, 2000);
      })
      .catch(err => {
        console.error("복사 실패:", err);
        alert("클립보드 복사에 실패했습니다. 시 구절을 직접 드래그하여 복사해 주세요.");
      });
  });

  // === 비즈니스 로직 함수 ===

  // 섹션 전환 애니메이션
  function transitionSection(fromSection, toSection, callback) {
    fromSection.classList.remove("active");
    setTimeout(() => {
      fromSection.style.display = "none";
      toSection.style.display = "block";
      
      if (callback) callback();

      setTimeout(() => {
        toSection.classList.add("active");
      }, 50);
    }, 400);
  }

  // 질문 렌더링
  function showQuestion(index) {
    const question = questions[index];
    
    // 진행 상황 업데이트
    const progress = (index / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    questionNumber.textContent = `${index + 1} / ${questions.length}`;
    
    // 질문 텍스트 및 옵션 추가
    questionText.textContent = question.text;
    optionsContainer.innerHTML = "";

    question.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "btn-option";
      btn.innerHTML = `
        <span class="option-text">${opt.text}</span>
        <svg class="option-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      `;
      btn.addEventListener("click", () => selectOption(opt.value, opt.apple));
      optionsContainer.appendChild(btn);
    });
  }

  // 답변 선택 처리
  function selectOption(value, apple) {
    selectedAnswers.push({ value, apple });
    
    const qContainer = document.querySelector(".question-container");
    optionsContainer.classList.add("fade-out");
    qContainer.classList.add("fade-out");

    setTimeout(() => {
      currentQuestionIndex++;
      if (currentQuestionIndex < questions.length) {
        showQuestion(currentQuestionIndex);
        optionsContainer.classList.remove("fade-out");
        qContainer.classList.remove("fade-out");
      } else {
        // 프로그레스 바 100% 채운 뒤 결과창 이동
        progressBar.style.width = "100%";
        setTimeout(() => {
          showResult();
          optionsContainer.classList.remove("fade-out");
          qContainer.classList.remove("fade-out");
        }, 300);
      }
    }, 250);
  }

  // 결과 화면 노출 및 시 매칭 알고리즘
  function showResult() {
    const userMbti = selectedMbti.EI + selectedMbti.SN + selectedMbti.TF + selectedMbti.JP;

    // 1. 매칭 점수 계산
    let bestPoem = null;
    let highestScore = -1;
    let candidates = [];

    // 사과 선택값 추출 (Q3)
    const appleAnswer = selectedAnswers.find(a => a.apple !== null)?.apple || null;
    // 계절 선택값만 추출 (Q1, Q2)
    const seasonAnswers = selectedAnswers.filter(a => a.value !== null).map(a => a.value);

    window.poems.forEach(poem => {
      let score = 0;
      
      // MBTI 매칭 점수 계산 (각 글자 일치할 때마다 +1.0점, 최대 +4.0점)
      for (let i = 0; i < 4; i++) {
        if (poem.mbti[i] === userMbti[i]) {
          score += 1.0;
        }
      }

      // 계절 감성 질문 매칭 점수 (Q1, Q2: 각 +2.0점, 최대 +4.0점)
      seasonAnswers.forEach(answer => {
        if (poem.seasons && poem.seasons.includes(answer)) {
          score += 2.0;
        }
      });

      // 사과(가치관) 질문 매칭 점수 (Q3: +2.0점)
      if (appleAnswer && poem.apple && poem.apple === appleAnswer) {
        score += 2.0;
      }

      // 최고 점수 갱신 처리
      if (score > highestScore) {
        highestScore = score;
        candidates = [poem];
      } else if (score === highestScore) {
        candidates.push(poem);
      }
    });

    // 2. 가장 점수가 높은 후보 시 중 하나를 무작위 선택
    if (candidates.length > 0) {
      const randIdx = Math.floor(Math.random() * candidates.length);
      currentPoem = candidates[randIdx];
    } else {
      currentPoem = window.poems[0]; // Fallback
    }

    // 3. 감성 텍스트 구성 (계절 2문항 기준)
    const seasonKorMap = { spring: "봄", summer: "여름", autumn: "가을", winter: "겨울" };
    const appleKorMap = { love: "사랑과 낭만", success: "현실과 성취", insight: "지적 영감", healing: "위로와 치유" };
    let seasonText = "";
    if (seasonAnswers[0] === seasonAnswers[1]) {
      seasonText = seasonKorMap[seasonAnswers[0]];
    } else {
      seasonText = `${seasonKorMap[seasonAnswers[0]]}과 ${seasonKorMap[seasonAnswers[1]]}`;
    }
    const appleText = appleAnswer ? ` '${appleKorMap[appleAnswer]}'을 소망하는` : "";

    // 4. UI 렌더링
    const profile = mbtiProfiles[userMbti];
    userMbtiType.innerHTML = `${profile.title} <span class="mbti-badge">${userMbti}</span>`;
    
    poemTitle.textContent = currentPoem.title;
    poetName.textContent = currentPoem.poet;
    
    // 줄바꿈 반영 렌더링
    poemContent.innerHTML = currentPoem.content.replace(/\n/g, "<br>");
    
    // 성향 설명 조합 매칭 사유 노출
    matchReason.innerHTML = `당신은 <strong>${profile.title} (${userMbti})</strong>의 가치관을 지니고 있으며, 오늘의 감성은 <strong>${seasonText}</strong>의 분위기에${appleText} 당신에게 가장 잘 호응하는 시로 ${currentPoem.reason}`;

    // 태그 렌더링
    const hashSpan = document.createElement("div");
    hashSpan.className = "poem-tags";
    const tags = currentPoem.tags || [profile.title, `${seasonKorMap[seasonAnswers[0]] || ''}의 감성`, "실제작품"];
    hashSpan.innerHTML = tags.map(t => `<span class="tag">#${t}</span>`).join(" ");

    // 기존 태그 삭제 후 갱신
    const existingTags = poemContent.parentNode.querySelector(".poem-tags");
    if (existingTags) existingTags.remove();
    poemContent.parentNode.insertBefore(hashSpan, poemContent.nextSibling);

    // 섹션 이동
    transitionSection(quizSection, resultSection);
  }
});

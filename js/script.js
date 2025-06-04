// 👀 스크롤 이벤트 👀
window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // ✅ 스케일 OUT
    const scaleOutElements = document.querySelectorAll('.scale-out');
    let scaleOut = Math.max(0.1, 1 - scrollY / 500); // 1에서 0.1까지 scale 줄이기 / 속도
    scaleOutElements.forEach(el => {
        el.style.transform = `scale(${scaleOut})`;
    });

    // ✅ 스케일 IN
    const scaleInElements = document.querySelectorAll('.scale-in');
    let scaleIn = Math.min(1, 0.1 + scrollY / 1000); // 0.1에서 1까지 scale 늘리기 / 속도
    scaleInElements.forEach(el => {
        el.style.transform = `scale(${scaleIn})`;
    });

    // ✅ 스크롤 페이드인
    const fadeInElements = document.querySelectorAll('.fade-in');
    fadeInElements.forEach(el => {
        const rect = el.getBoundingClientRect();

        // 요소가 화면에 들어오면 (하단에서부터 시작)
        const start = windowHeight * 0.6; // 60% 지점에서 효과 시작
        const end = windowHeight * 0.4;   // 40% 지점에서 효과 종료

        const progress = (start - rect.top) / (start - end);
        const clampedProgress = Math.min(Math.max(progress, 0), 1); // 0 ~ 1 범위 제한

        // opacity 단계적으로 조절
        el.style.opacity = clampedProgress.toFixed(3);
    });
});
// 👀 스크롤 이벤트 👀
let lastScroll = 0;
window.addEventListener('scroll', () => {
    // ✅ 공통 변수
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;

    // ✅ 헤더 .scroll
    const header = document.querySelector(".header");
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop === 0) {
        // 최상단일 때 .active, .scroll 모두 제거
        header.classList.remove("active");
        header.classList.remove("scroll");
    } else if (scrollTop > lastScroll) {
        // 스크롤 내릴 때 .scroll 추가, .active 제거
        header.classList.add("scroll");
        header.classList.remove("active");
    } else {
        // 스크롤 올릴 때 .active 추가, .scroll 제거
        header.classList.add("active");
        header.classList.remove("scroll");
    }

    // 모바일 음수 방지 및 lastScroll 업데이트
    lastScroll = scrollTop <= 0 ? 0 : scrollTop;

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

        const start = windowHeight * 0.6; // 60% 지점에서 효과 시작
        const end = windowHeight * 0.4;   // 40% 지점에서 효과 종료

        const progress = (start - rect.top) / (start - end);
        const clampedProgress = Math.min(Math.max(progress, 0), 1); // 0 ~ 1 범위 제한

        el.style.opacity = clampedProgress.toFixed(3); // opacity 단계적으로 조절
    });
});
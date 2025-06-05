### PA KIDS
클론코딩작업
      
    2025.06.24 ~ing

<br>

---

<br>

### 스크롤 이벤트
>GSAP 를 사용하지 않고 스크롤 이벤트를 활용한 애니메이션 구현

```javascript
// ✅ 공통 변수
const header = document.querySelector(".header");
const scaleOutElements = document.querySelectorAll('.scale-out');
const scaleInElements = document.querySelectorAll('.scale-in');
const fadeInElements = document.querySelectorAll('.fade-in');
const slowEls = document.querySelectorAll('.slow');

let lastScroll = 0;

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // ✅ 헤더 .scroll 제어
    if (scrollTop === 0) {
        header.classList.remove("active", "scroll");
    } else if (scrollTop > lastScroll) {
        header.classList.add("scroll");
        header.classList.remove("active");
    } else {
        header.classList.add("active");
        header.classList.remove("scroll");
    }

    lastScroll = Math.max(0, scrollTop);

    // ✅ 스케일 OUT
    const scaleOut = Math.max(0.1, 1 - scrollY / 500);
    scaleOutElements.forEach(el => {
        el.style.transform = `scale(${scaleOut})`;
    });

    // ✅ 스케일 IN
    const scaleIn = Math.min(1, 0.1 + scrollY / 1000);
    scaleInElements.forEach(el => {
        el.style.transform = `scale(${scaleIn})`;
    });

    // ✅ 스크롤 페이드인
    fadeInElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const start = windowHeight * 0.6;
        const end = windowHeight * 0.4;

        const progress = (start - rect.top) / (start - end);
        const clamped = Math.min(Math.max(progress, 0), 1);

        el.style.opacity = clamped.toFixed(3);
    });

    // ✅ 느리게 움직이는 아이템
    slowEls.forEach(el => {
        const elTop = el.offsetTop;

        if (scrollY + windowHeight > elTop) {
            el.style.transform = `translateY(${scrollY * -0.1}px)`;
        }
    });
});
```

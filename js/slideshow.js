document.addEventListener('DOMContentLoaded', function () {
  const slideItem = document.getElementsByClassName('slide-item');
  const slideContainer = document.querySelector('.slider-container');
  const container = document.querySelector('.slide-show ');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  const slideCount = slideItem.length;

  let currentIndex = 0;
  // 이름만 있고 아직 값을 지정해주지 않은 상태
  let timer = undefined;
  let pagerHTML = '';
  const pagerBtnContainer = document.querySelector('.pager');

  //슬라이더 아이템을 우측으로 정렬
  for (let i = 0; i < slideCount; i++) {
    slideItem[i].style.left = i * 100 + '%';

    pagerHTML = pagerHTML + `<span data-idx="` + i + `">` + i + `</span>`;

    pagerBtnContainer.innerHTML = pagerHTML;
  }

  let paperBtns = document.querySelectorAll('.pager span');

  //하단 버튼 숨기기
  paperBtns[0].style.display = 'none';
  paperBtns[6].style.display = 'none';

  //하단 버튼 색칠 함수

  function paintButton(idx) {
    for (let i = 0; i < paperBtns.length; i++) {
      paperBtns[i].classList.remove('active');
    }
    paperBtns[idx].classList.add('active');
  }

  //슬라이더 이동함수

  function goToSlide(idx) {
    if (currentIndex === slideCount - 1) {
      slideContainer.style.transition = '0s';
    } else {
      slideContainer.style.transition = '0.2s';
    }

    slideContainer.style.left = idx * -100 + '%';

    paintButton(idx);
    currentIndex = idx;
  }

  //버튼 클릭 이벤트

  function nextBtnClickHandler() {
    if (currentIndex === slideCount - 2) {
      console.log('Tlqkf');
      setTimeout(function () {
        currentIndex = 1;
        goToSlide(currentIndex);
        slideContainer.style.transition = '0s';
      }, 201);
    }
    if (currentIndex >= slideCount - 1) {
      currentIndex = 1;
      goToSlide(currentIndex);
    } else {
      goToSlide(currentIndex + 1);
    }
  }

  function prevBtnClickHandler() {
    if (currentIndex <= 1) {
      currentIndex = 0;
      goToSlide(currentIndex);

      setTimeout(function () {
        currentIndex = slideCount - 2;
        goToSlide(currentIndex);
        slideContainer.style.transition = '0s';
      }, 201);
    } else {
      goToSlide(currentIndex - 1);
    }
  }

  nextBtn.addEventListener('click', nextBtnClickHandler);

  prevBtn.addEventListener('click', prevBtnClickHandler);

  //자동 슬라이드
  //4초마다

  //자동 슬라이드 함수
  function autoSlide() {
    timer = setInterval(function () {
      let nextIdx = (currentIndex + 1) % slideCount;
      goToSlide(nextIdx);
      if (currentIndex === slideCount - 1) {
        setTimeout(function () {
          slideContainer.style.transition = '0s';
          nextIdx = 1;
          goToSlide(nextIdx);
        }, 201);
      }
    }, 2000);
  }

  autoSlide();

  function bannerEnterHandler() {
    console.log('hi');
    clearInterval(timer);
  }

  function bannerLeaveHandler() {
    console.log('byebye');
    autoSlide();
  }
  container.addEventListener('mouseenter', bannerEnterHandler);

  container.addEventListener('mouseleave', bannerLeaveHandler);

  //하단 버튼으로 슬라이드 이동하기

  function pagerBtnClickHandler(e) {
    let currentTarget = e.target;

    if (currentTarget.classList.contains('pager')) {
      currentTarget = null;
    } else {
      goToSlide(Number(currentTarget.dataset.idx));
    }
  }

  pagerBtnContainer.addEventListener('click', pagerBtnClickHandler);
  goToSlide(1);
}); //DOMContentLoaded

const initializeCards = () => {

    let currentCardindex = -1;
    let isCardOpen = false; 

    const body = document.querySelector('body');
    const backgroundSquare = document.querySelector('#background-square');
    const pageTitleWrapper = document.querySelector('#page-title-wrapper');
    const cardTitleWrapper = document.querySelector('#card-title-wrapper');
    const cardDetailWrapper = document.querySelector('#card-detail-wrapper');
    const cardDetailImagesWrapper = document.querySelector('#card-images-wrapper');
    const cardDetailNagivation = document.querySelector('#card-detail-navigation');
    const cardDetailNavigationNext = document.querySelector('#button-card-next');
    const cardDetailNavigationPrev = document.querySelector('#button-card-prev');

    const cardsWrapper = document.querySelector('#cards-wrapper')
    const cards = new Array(...document.querySelectorAll('.swiper-slide')).map(el => ({
        'el': el,
        'title': el.getAttribute('data-card-title'),
        'subtitle': el.getAttribute('data-card-subtitle'),
        'images': el.getAttribute('data-card-images').split(', ').map(s => (s.substring(1, s.length-1)))
    }));

    const setCardTtitle = (title, subtitle) => {
        cardTitleWrapper.querySelector('h6').innerHTML = title;
        cardTitleWrapper.querySelector('span').innerHTML = subtitle;
    }

    const setCardImages = (images) => {
        cardDetailImagesWrapper.innerHTML = '';
        images.forEach((image) => {
            const img = document.createElement('img');
            img.src = image;
            cardDetailImagesWrapper.appendChild(img);
        })
    }

    const expandCard = () => {
        const card = cards[currentCardindex];
        if(isCardOpen) return;
        isCardOpen = true;
        setCardTtitle(card.title, card.subtitle);
        setCardImages(card.images);
        pageTitleWrapper.classList.add('hidden');
        cardsWrapper.classList.add('hidden');

        cardTitleWrapper.classList.remove('hidden');
        cardDetailWrapper.classList.remove('hidden');
        cardDetailNagivation.classList.remove('hidden');
        backgroundSquare.classList.remove('bg-arms-yellow');
        backgroundSquare.classList.add('bg-arms-white');
        body.classList.remove('overflow-y-hidden');

        cardTitleWrapper.classList.add('anim-slide');
        cardDetailImagesWrapper.classList.add('anim-slide');
        pageTitleWrapper.classList.remove('anim-slide');
        void pageTitleWrapper.offsetWidth
        cardsWrapper.classList.remove('anim-slide');
        void cardsWrapper.offsetWidth
    }

    const collapseCard = () => {
        if(!isCardOpen) return;
        isCardOpen = false;
        setCardTtitle('', '');
        pageTitleWrapper.classList.remove('hidden');
        cardsWrapper.classList.remove('hidden');
        cardTitleWrapper.classList.add('hidden');

        cardDetailWrapper.classList.add('hidden');
        cardDetailNagivation.classList.add('hidden');
        backgroundSquare.classList.add('bg-arms-yellow');
        backgroundSquare.classList.remove('bg-arms-white');
        body.classList.add('overflow-y-hidden');

        pageTitleWrapper.classList.add('anim-slide');
        cardsWrapper.classList.add('anim-slide');
        cardTitleWrapper.classList.remove('anim-slide');
        void cardTitleWrapper.offsetWidth
        cardDetailImagesWrapper.classList.remove('anim-slide');
        void cardDetailImagesWrapper.offsetWidth
    }

    cards.forEach((card, cardIndex) => {
        card.el.addEventListener('click', () => {
            currentCardindex = cardIndex;
            expandCard();
        });
    });

    cardTitleWrapper.addEventListener('click', () => {
        collapseCard();
    });

    cardDetailNavigationNext.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            collapseCard();
            currentCardindex += 1;
            currentCardindex = (currentCardindex >= cards.length ? 0 : currentCardindex);
            expandCard();
        }, 300);
    });

    cardDetailNavigationPrev.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            collapseCard();
            currentCardindex -= 1;
            currentCardindex = (currentCardindex <= 0 ? cards.length - 1 : currentCardindex);
            expandCard();
        }, 300);
    });

    window.addEventListener('scroll', () => {
        console.log('scroll');
        cardDetailNagivation.style.top = `calc(100% + ${window.scrollY -224}px`
    });

    const targetCard = window.location.href.split("#")[1]?.toUpperCase();
    const cardsSubtitles = cards.map(card => (card.subtitle.toUpperCase()));
    if(cardsSubtitles.includes(targetCard)) {
        currentCardindex = cardsSubtitles.indexOf(targetCard);
        expandCard();
    }
}

initializeCards();
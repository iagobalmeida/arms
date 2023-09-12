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

    const hideElem = (elem, include_anim=true, anim_down=false) => {
        if(include_anim) {
            elem.classList.remove('anim-slide');
            if(anim_down) elem.classList.remove('anim-slide-down');
            elem.classList.add('anim-slide-reverse');
            void elem.offsetWidth
            setTimeout(() => {
                elem.classList.add('hidden');
                elem.classList.remove('anim-slide-reverse');
            }, 300);
        } else {
            elem.classList.add('hidden');
        }
    }

    const showElem = (elem, include_anim=true, anim_down=false) => {
        elem.classList.remove('hidden');
        if(include_anim) {
            elem.classList.add('anim-slide');
            if(anim_down) elem.classList.add('anim-slide-down');
        }
    }

    const expandCard = () => {
        const card = cards[currentCardindex];
        if(isCardOpen) return;
        isCardOpen = true;
        setCardTtitle(card.title, card.subtitle);
        setCardImages(card.images);

        hideElem(cardsWrapper);
        hideElem(pageTitleWrapper);

        showElem(cardTitleWrapper)
        showElem(cardDetailWrapper, false);
        showElem(cardDetailImagesWrapper, true);

        cardDetailNagivation.classList.remove('hidden');

        backgroundSquare.classList.remove('bg-arms-yellow');
        backgroundSquare.classList.add('bg-arms-white');
        body.classList.remove('overflow-y-hidden');
    }

    const collapseCard = () => {
        if(!isCardOpen) return;
        isCardOpen = false;
        setCardTtitle('', '');
        showElem(cardsWrapper, true, true);
        showElem(pageTitleWrapper, true, false);

        hideElem(cardTitleWrapper, false);
        hideElem(cardDetailWrapper, false, true);
        hideElem(cardDetailImagesWrapper, true, true);
        
        cardDetailNagivation.classList.add('hidden');

        backgroundSquare.classList.add('bg-arms-yellow');
        backgroundSquare.classList.remove('bg-arms-white');
        body.classList.add('overflow-y-hidden');
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
            setTimeout(() => {
                currentCardindex += 1;
                currentCardindex = (currentCardindex >= cards.length ? 0 : currentCardindex);
                expandCard();
            }, 400)
        }, 300);
    });

    cardDetailNavigationPrev.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            collapseCard();
            setTimeout(() => {
                currentCardindex -= 1;
                currentCardindex = (currentCardindex <= 0 ? cards.length - 1 : currentCardindex);
                expandCard();
            }, 400)
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
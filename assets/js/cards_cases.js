const initializeCards = () => {

    let currentCardindex = -1;
    let isCardOpen = false; 

    const body = document.querySelector('body');
    const backgroundSquare = document.querySelector('#background-square');
    const pageBackNagivation = document.querySelector('#page-back-nagivation')
    
    const cardTitleWrapper = document.querySelector('#card-title-wrapper');
    const cardsNavigationWrapper = document.querySelector('#card-nagivation-wrapper');
    
    const cardDetailWrapper = document.querySelector('#card-detail-wrapper');
    const cardDetailImagesWrapper = document.querySelector('#card-images-wrapper');
    const cardDetailNagivation = document.querySelector('#card-detail-navigation');
    const cardDetailNavigationNext = document.querySelector('#button-card-next');
    const cardDetailNavigationPrev = document.querySelector('#button-card-prev');

    const cardsWrapper = document.querySelector('#cards-wrapper');    
    const cards = new Array(...document.querySelectorAll('.swiper-slide')).map(el => ({
        'el': el,
        'title': el.getAttribute('data-card-title'),
        'subtitle': el.getAttribute('data-card-subtitle'),
        'images': el.getAttribute('data-card-images').split(', ').map(s => (s.substring(1, s.length-1)))
    }));

    const defaultCardTitle = cardTitleWrapper.querySelector('h4').innerHTML;
    const defaultCardDescription = cardTitleWrapper.querySelector('p').innerHTML;
    const setCardTtitle = (title=defaultCardTitle, subtitle=defaultCardDescription) => {
        cardTitleWrapper.querySelector('h4').innerHTML = title;
        cardTitleWrapper.querySelector('p').innerHTML = subtitle;
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

    const expandCard = (insertHistory=true) => {
        const card = cards[currentCardindex];
        if(isCardOpen) return;
        isCardOpen = true;
        setCardTtitle(card.title, card.subtitle);
        setCardImages(card.images);

        hideElem(cardsWrapper);
        hideElem(cardsNavigationWrapper);

        showElem(cardTitleWrapper);
        cardTitleWrapper.classList.add('text-white');
        showElem(cardDetailWrapper, false);
        showElem(cardDetailImagesWrapper, true);

        showElem(cardDetailNagivation);

        backgroundSquare.classList.remove('bg-arms-yellow');
        backgroundSquare.classList.add('bg-arms-full-black');
        body.classList.remove('overflow-y-hidden');

        if(insertHistory) history.pushState({cardIndex: currentCardindex}, null);
    }

    const collapseCard = () => {
        if(!isCardOpen) return;
        isCardOpen = false;
        window.scrollTo({top:200, behavior:'smooth'});
        setTimeout(() => {
            setCardTtitle();
            showElem(cardsWrapper, true, true);
            showElem(cardsNavigationWrapper);
            
            cardTitleWrapper.classList.remove('text-white');
            hideElem(cardDetailImagesWrapper, true, true);
            
            hideElem(cardDetailNagivation);
            
            backgroundSquare.classList.add('bg-arms-yellow');
            backgroundSquare.classList.remove('bg-arms-full-black');
            body.classList.add('overflow-y-hidden');
        }, 200)
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
        isCardOpen = false;
        currentCardindex += 1;
        currentCardindex = (currentCardindex >= cards.length ? 0 : currentCardindex);
        expandCard();
        setTimeout(() => {
            window.scrollTo({top:200, behavior:'smooth'});
        }, 400)
    });

    cardDetailNavigationPrev.addEventListener('click', () => {
        isCardOpen = false;
        currentCardindex -= 1;
        currentCardindex = (currentCardindex <= 0 ? cards.length - 1 : currentCardindex);
        expandCard();
        setTimeout(() => {
            window.scrollTo({top:200, behavior:'smooth'});
        }, 400)
    });

    pageBackNagivation.addEventListener('click', () => {
        if(isCardOpen) return collapseCard();
        document.querySelector('#logo').click();
    });

    window.addEventListener('scroll', () => {
        console.log('scroll');
        cardDetailNagivation.style.top = `calc(100% + ${window.scrollY -224}px`
    });

    window.addEventListener('popstate', (e) => {
        console.log(e.state)
        if(e.state && e.state.cardIndex) {
            console.log(e.state.cardIndex);
            isCardOpen = false;
            currentCardindex = e.state.cardIndex;
            expandCard(false);
            e.preventDefault();
        } else {
            collapseCard();
        }
    })

    const targetCard = window.location.href.split("#")[1]?.toUpperCase();
    const cardsSubtitles = cards.map(card => (card.subtitle.toUpperCase()));
    if(cardsSubtitles.includes(targetCard)) {
        currentCardindex = cardsSubtitles.indexOf(targetCard);
        expandCard();
    }
}

initializeCards();
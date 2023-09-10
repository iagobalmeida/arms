const initializeCards = () => {
    let currentCardindex = -1;
    let isCardOpen = false; 

    const body = document.querySelector('body');
    const backgroundSquare = document.querySelector('#background-square');
    const pageTitleWrapper = document.querySelector('#page-title-wrapper');
    const cardTitleWrapper = document.querySelector('#card-title-wrapper');
    const cardDetailWrapper = document.querySelector('#card-detail-wrapper');
    const cardImagesWrapper = document.querySelector('#card-images-wrapper');
    const buttonCardNext = document.querySelector('#button-card-next');
    const buttonCardPrev = document.querySelector('#button-card-prev');
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
        cardImagesWrapper.innerHTML = '';
        images.forEach((image) => {
            const img = document.createElement('img');
            img.src = image;
            cardImagesWrapper.appendChild(img);
        })
    }
    console.log('initialized');
    console.log(cards);

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
        backgroundSquare.classList.remove('bg-arms-yellow');
        backgroundSquare.classList.add('bg-arms-white');
        body.classList.remove('overflow-y-hidden');
    }

    const collapseCard = () => {
        if(!isCardOpen) return;
        isCardOpen = false;
        setCardTtitle('', '');
        pageTitleWrapper.classList.remove('hidden');
        cardsWrapper.classList.remove('hidden');
        cardTitleWrapper.classList.add('hidden');
        cardDetailWrapper.classList.add('hidden');
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

    buttonCardNext.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            collapseCard();
            currentCardindex += 1;
            currentCardindex = (currentCardindex >= cards.length ? 0 : currentCardindex);
            console.log(currentCardindex)
            console.log(cards.length)
            expandCard();
        }, 300);
    });

    buttonCardPrev.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
            collapseCard();
            currentCardindex -= 1;
            currentCardindex = (currentCardindex <= 0 ? cards.length - 1 : currentCardindex);
            console.log(currentCardindex)
            console.log(cards.length)
            expandCard();
        }, 300);
    });
}

initializeCards();
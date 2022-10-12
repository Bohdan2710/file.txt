"use strict";

window.addEventListener('DOMContentLoaded', () => {

    //SCREEN-CHECK

    const body = document.querySelector('body');

    const isMobile = {
        Android: function () {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function () {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function () {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };
    if (isMobile.any()) {
        body.classList.add('mobile');
    } else {
        body.classList.add('pc');
    }

    //LOADING

    function loading() {
        const link = document.querySelector('.content-go__link'),
            icon = '#',
            loading = document.querySelector('.content-go__loading');

        link.style.display = 'none';

        for (let i = 1; i <= 4; i++) {

            setTimeout(() => {
                loading.append(icon);
            }, 2000);

            setTimeout(() => {
                loading.append(icon);
            }, 2500);

            setTimeout(() => {
                loading.append(icon);
            }, 2600);

            setTimeout(() => {
                loading.remove();
            }, 4000);

            setTimeout(() => {
                link.style.display = 'flex';
            }, 4500);
        }
    }
    loading();

    //HEADER-SUBMENU
    const navList = document.querySelector('.nav__list');
    const navSubListCategories = document.querySelector('.ul-menu-categories');
    const navSubListTemplate = document.querySelector('.ul-menu-template');
    const arrowSubListCategories = document.querySelector('.list__wrap-icon-categories');
    const arrowSubListTemplate = document.querySelector('.list__wrap-icon-template');

    //VIEW-ALL-STUDIES

    const link = document.querySelector('.view'),
        studies = document.querySelector('.studies__wrap-articles');


    link.addEventListener('click', () => {
        studies.classList.toggle('active');

        if (studies.classList.contains('active')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    //HAMBURGER

    function hamburger() {
        const headerMenu = document.querySelector('.nav__list'),
            underListContact = document.querySelector('.ul-menu-contact'),
            underListCategories = document.querySelector('.ul-menu-categories');

        document.addEventListener('click', e => {
            const target = e.target;

            if (target.closest('.hat__menu-burger')) {

                headerMenu.classList.add('active');
                document.body.classList.add('lock');

            } else if (target.closest('.list__menu-burger')) {

                headerMenu.classList.remove('active');
                document.body.classList.remove('lock');
                underListContact.classList.remove('active');
                underListCategories.classList.remove('active');

            } else if (target.closest('.ul-menu-categories li') || target.closest('.ul-menu-contact li')) {

                headerMenu.classList.remove('active');
                document.body.classList.remove('lock');
                underListCategories.classList.remove('active');
                underListContact.classList.remove('active');

            } else if (target.closest('.button-li-contact')) {

                underListContact.classList.toggle('active');
                underListCategories.classList.remove('active');

            } else if (target.closest('.button-li-categories')) {

                underListCategories.classList.toggle('active');
                underListContact.classList.remove('active');

            } else if (target.closest('.author')) {

                headerMenu.classList.remove('active');
                document.body.classList.remove('lock');
                underListContact.classList.remove('active');
                underListCategories.classList.remove('active');

            }
        });
    }
    hamburger();

    //PARALLAX-EFFECT

    window.addEventListener('scroll', e => {
        document.body.style.cssText += `
            --scrollTop: ${this.scrollY}px;
        `;
    });

    //FOOTER-BACK

    VANTA.GLOBE({
        el: "#footer",
        mouseControls: true,
        touchControls: false,
        gyroControls: false,
        minHeight: 200.00,
        minWidth: 200.00,
        scale: 1.00,
        scaleMobile: 1.00,
        color: 0xff42,
        color2: 0x8de38d,
        size: 0.70,
        backgroundColor: 0x0
    })

    //SLIDER-WRAP-ARTICLES

    const swiperContainer = new Swiper('.wrap-articles__container', {
        // direction: 'vertical',
        loop: true,

        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },

        pagination: {
            el: '.swiper-pagination',

            type: 'fraction',
        },

        preloadImages: false,

        lazy: {
            loadOnTransitionStart: true,
            loadPrevNext: true
        },

        scrollbar: {
            el: '.swiper-scrollbar',
        },


        spaceBetween: 50,

        simulateTouch: false,

        keyboard: {
            enable: true,
            onlyInViewport: true,
            pageUpDown: true,
        }
    });

    //ARROW-PAGE-UP

    const arrowParents = document.querySelector('.button-up');
    const activeArrow = 890;

    function arrowUp() {

        window.addEventListener("scroll", () => {
            const coordinates = window.pageYOffset || document.documentElement.scrollTop;
            if (coordinates > activeArrow) {
                arrowParents.classList.add('active');
            } else {
                arrowParents.classList.remove('active');

            }
        });
        arrowParents.addEventListener('click', e => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth',
            });
        });


    }
    arrowUp();


    //POST-FORMS

    const forms = document.querySelectorAll('form');
    const mainWrapper = document.querySelector('.wrapper');

    const message = {
        loading: 'img/form/tail-spin.svg',
        complete: 'Done!',
        fail: 'Error, try again'
    };

    function addModalMessage(messageModal) {
        //ADD-PARENTS-MODAL-IN-WRAPPER

        const backgroundModal = document.createElement('div');
        backgroundModal.classList.add('modal-bac');
        mainWrapper.append(backgroundModal);

        //ADD-CHILDMODAL-IN-PARENTS-MODAL

        const showMessage = document.createElement('div');
        showMessage.classList.add('modal');
        showMessage.innerHTML = `
            <p>${messageModal}</p>
        `;
        backgroundModal.append(showMessage);

        //REMOVE-MODAL

        setTimeout(() => {
            backgroundModal.style.display = "none";
        }, 3000);
    }

    forms.forEach(el => {
        postData(el);
    });

    async function handlingPostData(url, method, data) {
        const res = await fetch(url, {
            method: method,
            headers: {
                "Content-type": 'application/json'
            },
            body: data,
        });

        return res.json();
    }

    function postData(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const wrapImg = document.createElement('div');
            wrapImg.classList.add('modal-bac');
            mainWrapper.append(wrapImg);

            const spinner = document.createElement('img');
            spinner.src = message.loading;
            spinner.classList.add('loading');
            wrapImg.append(spinner);


            const formData = new FormData(form);

            const json = JSON.stringify(Object.fromEntries(formData.entries()));

            handlingPostData('http://localhost:3000/request', 'POST', json)
                .then(data => {
                    console.log(data);
                    addModalMessage(message.complete);
                    wrapImg.remove();
                })
                .catch(() => {
                    addModalMessage(message.fail);
                    wrapImg.remove();
                })
                .finally(() => {
                    form.reset();
                });
        });
    }

});







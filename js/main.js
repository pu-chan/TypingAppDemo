'use strict';
{
    let words = [
        // 'STARBUCKS COFFEE', 
        // 'Drip Coffee', 
        'Starbucks Latte', 
        // 'SAKURA Blossom Cream Latte', 
        // 'Coffe Americano', 
        // 'Soy Latte',
        // 'Coffe Mocha',
        // 'White Mocha',
        // 'Caramel Macchiato',
        // 'Cappuccino',
        // 'Chai Tea Latte',
        // 'Matcha Tea Latte',
        // 'Dark Mocha Chip Frappuccino',
        // 'Caramel Frappuccino',
        // 'Coffee Frappuccino',
        // 'Matcha Frappuccino',
        // 'Vanilla Frappuccino',
        // 'Mango Passion Tea Frappuccino',
        // 'STRAWBERRYVERYMUCHFRAPPUCCINO',
        // 'Short Tall Grande Venti',
        // 'Hot / Iced',
        // 'Extra Caramel Sauce',
    ];

    // ゲームの度に、単語をシャッフルして表示

    function shuffle() {
        for (let lastWord = words.length - 1; lastWord > 0; lastWord--) {
          const num = Math.floor(Math.random() * (lastWord + 1));
          [words[num], words[lastWord]] = [words[lastWord], words[num]];
        }
        return words;
      }

    // 定数, 変数
    const container = document.getElementById('container');
    const mask = document.getElementById('mask');
    const mask_a = document.getElementById('mask_a');
    const modal = document.getElementById('modal');
    const modal_a = document.getElementById('modal_a');
    const modalMessage = document.getElementById('modalMessage');
    const modal_aMessage = document.getElementById('modal_aMessage');
    const close = document.getElementById('close');
    const target = document.getElementById('target');
    const order = document.getElementById('order');
    const timer = document.getElementById('timer');
    
    let i = 0;
    let j;
    let wordContent = [];
    const timeLimit = 100 * 1000;
    let startTime;
    let isPlaying = false;
    const messages = [
        "Let's take a coffee break ! ",
        "Let's try again with a cup of coffee ! ",
        "Let's practice over a cup of coffee ! ",
    ];
    let ran = Math.floor(Math.random() * messages.length);

    timer.textContent = '100.00';
    modalMessage.textContent = messages[ran];
    modal_aMessage.textContent = 'Congratulations!';
    j = words.length;
    order.textContent = j;

    // ゲームスタート前
    target.textContent = 'click to start';


    // 単語の表示
    function createWord() {
        wordContent = words[i].split('').map(function(value) {
        
        const span = document.createElement('span');
        span.textContent = value;
        if(words[i].length > 20) {
            span.classList.add('smaller');
        }
        if(words[i] === 'STRAWBERRYVERYMUCHFRAPPUCCINO'||
            words[i] === 'SAKURA Blossom Cream Latte') {
            span.classList.add('lovely');
        }
        target.appendChild(span);

        return span;
    });

        order.textContent = j;
    }

    // モーダル画面
    function callMordal() {
        modal.classList.remove('hidden');
        mask.classList.remove('hidden');
        close.addEventListener('mouseover', () => {
            modal.classList.add('hidden');
            mask.classList.add('hidden');
        });
    }

    function callMordal_a() {
        mask_a.classList.remove('hidden');
        setTimeout(()=> {
            modal_a.classList.remove('hidden');
        }, 300);
    }

    // タイマー
    function updateTime() {
       const timeLeft = startTime + timeLimit - Date.now(); 
       timer.textContent = (timeLeft / 1000).toFixed(2); 

       const timeoutId = setTimeout(() => {
            updateTime();
       }, 10);

       if(timeLeft < 0) {
           isPlaying = false;
           clearTimeout(timeoutId);
           setTimeout(()=> {
               callMordal();
            }, 100);
           
           timer.textContent = '0.00';
           target.textContent = 'click to replay';
       }

       if(target.textContent === 'やったね！') {
            clearTimeout(timeoutId);
       }
    }

    // タイピング
    window.addEventListener('keyup', e => {
        if(!isPlaying) {
            return;
         }
        if (e.key === wordContent[0].textContent) {
            if(wordContent[0].textContent === ' ') {
                wordContent[0].textContent = '★';
                wordContent[0].classList.add('star');
                wordContent.shift();
            }else {
                wordContent[0].classList.add('correct');
                wordContent.shift();
            }
        }

        if(!wordContent.length) {
            if(i < words.length - 1) {
                target.textContent = '';
                i++;
                j--;
                createWord();
            }else {
                isPlaying = false;
                setTimeout(()=> {
                    callMordal_a();
                }, 100);
                target.textContent = 'やったね！';
                target.style.color = '#fff';
            }
        }
    });

    // 画面をクリックしてスタート
    container.addEventListener('click', () => {
        if(isPlaying) {
            return;
        }
        isPlaying = true;
        i = 0;
        j = words.length;

        target.textContent = '';
        startTime = Date.now();
        shuffle();
        createWord();
        updateTime();
    });

    // スタイル
    const bgimgs = [
        'img/bg01.jpg',
        'img/bg02.jpg',
        'img/bg03.jpg',
        'img/bg04.jpg',
        'img/bg05.jpg',
        'img/bg06.jpg',
        'img/bg07.jpg',
    ];

    let bgRan = Math.floor(Math.random() * bgimgs.length);
    const body = document.querySelector('body');
    body.style.backgroundImage = 'url(' + `${bgimgs[bgRan]}` + ')';

    const img = document.querySelector('img');
    img.src = 'img/icon01.png';

    img.addEventListener('mouseover', () => {
        img.src = 'img/icon02.png';
    });

    img.addEventListener('mouseout', () => {
        img.src = 'img/icon01.png';
    });

}
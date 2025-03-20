const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

const hearts = document.querySelectorAll('.like-glyph'); 
const modal = document.querySelector('#modal');
const modalMessage = document.querySelector('#modal-message');

modal.classList.add('hidden');

hearts.forEach(heart => {
  heart.addEventListener('click', () => {
    mimicServerCall()
      .then(() => {
        if (heart.textContent === EMPTY_HEART) {
          handleHeartSuccess(heart);
        } else {
          handleHeartUnsuccess(heart);
        }
      })
      .catch((error) => {
        handleHeartFailure(error);
      });
  });
});

function handleHeartSuccess(heart) {
  heart.textContent = FULL_HEART;
  heart.classList.add('activated-heart');
}

function handleHeartUnsuccess(heart) {
  heart.textContent = EMPTY_HEART;
  heart.classList.remove('activated-heart');
}

function handleHeartFailure(error) {
  modalMessage.textContent = error;
  modal.classList.remove('hidden');
  
  setTimeout(() => {
    modal.classList.add('hidden');
  }, 3000);
}

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}

window.onload = function() {
  setTimeout(function() {
    document.getElementById('thankyou-popup').style.display = 'flex';
  }, 2000);
};

function closePopup() {
  document.getElementById('thankyou-popup').style.display = 'none';
}
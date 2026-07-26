// Elements
var nameInput = document.getElementById('displayName');
var emailInput = document.getElementById('email');

var newPassword = document.getElementById('newPassword');
var confirmPassword = document.getElementById('confirmPassword');

var profilePicture = document.getElementById('profilePicture');
var avatarPreview = document.getElementById('avatarPreview');

var saveBtn = document.getElementById('saveBtn');
var resetBtn = document.getElementById('resetBtn');

var popupOverlay = document.getElementById('popupOverlay');
var popupMessage = document.getElementById('popupMessage');
var popupClose = document.getElementById('popupClose');

var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function showPopup(message) {
  popupMessage.textContent = message;
  popupOverlay.classList.add('active');
}

function hidePopup() {
  popupOverlay.classList.remove('active');
}

popupClose.addEventListener('click', hidePopup);
popupOverlay.addEventListener('click', function (e) {
  if (e.target === popupOverlay) {
    hidePopup();
  }
});

function clearErrorStyles() {
  nameInput.classList.remove('input-error');
  emailInput.classList.remove('input-error');
  confirmPassword.classList.remove('input-error');
}

// Live preview of uploaded profile picture
profilePicture.addEventListener('change', function (e) {
  var file = e.target.files[0];
  if (file) {
    var reader = new FileReader();
    reader.onload = function (event) {
      avatarPreview.src = event.target.result;
    };
    reader.readAsDataURL(file);
  }
});

function validateForm() {
  clearErrorStyles();

  var nameEmpty = nameInput.value.trim() === '';
  var emailEmpty = emailInput.value.trim() === '';

  if (nameEmpty || emailEmpty) {
    if (nameEmpty) nameInput.classList.add('input-error');
    if (emailEmpty) emailInput.classList.add('input-error');
    showPopup('Name and Email are required');
    return false;
  }

  if (!emailPattern.test(emailInput.value.trim())) {
    emailInput.classList.add('input-error');
    showPopup('This is not correct format of email');
    return false;
  }

  if (newPassword.value.trim() !== '' || confirmPassword.value.trim() !== '') {
    if (newPassword.value !== confirmPassword.value) {
      confirmPassword.classList.add('input-error');
      showPopup('New Password and Confirm Password do not match');
      return false;
    }
  }

  return true;
}

saveBtn.addEventListener('click', function () {
  if (!validateForm()) {
    return;
  }
  showPopup('Settings saved successfully');
});

resetBtn.addEventListener('click', function () {
  document.querySelectorAll('.settings-card input[type="text"], .settings-card input[type="email"], .settings-card input[type="password"]').forEach(function (el) {
    el.value = '';
  });

  document.getElementById('language').selectedIndex = 0;

  document.getElementById('emailNotif').checked = true;
  document.getElementById('pushNotif').checked = false;
  document.getElementById('weeklyDigest').checked = true;

  document.getElementById('publicProfile').checked = false;
  document.getElementById('activityStatus').checked = true;
  document.getElementById('searchIndexing').checked = false;
  document.getElementById('showEmail').checked = false;
  document.getElementById('shareData').checked = true;
  document.getElementById('twoFactor').checked = false;

  avatarPreview.src = 'https://via.placeholder.com/64x64.png?text=%20';
  profilePicture.value = '';

  clearErrorStyles();
});

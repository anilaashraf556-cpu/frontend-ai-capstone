document.getElementById('saveBtn').addEventListener('click', function () {
  var status = document.getElementById('statusMsg');
  status.style.display = 'block';
  setTimeout(function () {
    status.style.display = 'none';
  }, 2500);
});

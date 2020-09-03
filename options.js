function save_options() {
    let boxing = document.getElementById('boxing-notification').checked;
    let mma = document.getElementById('mma-notification').checked;
    chrome.storage.sync.set({
      notificationMMA: mma,
      notificationBoxing:  boxing
    }, () => {
      var status = document.getElementById('status');
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 750);
    });
  }

  function restore_options() {
    chrome.storage.sync.get([
        'notificationMMA', 'notificationBoxing'], (items) => {
      document.getElementById('boxing-notification').checked = items.notificationBoxing;
      document.getElementById('mma-notification').checked = items.notificationMMA;
    });
  }
  document.addEventListener('DOMContentLoaded', restore_options);
  document.getElementById('save-button').addEventListener('click',
      save_options);
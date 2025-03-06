document.addEventListener('DOMContentLoaded', function () {
    const noteInput = document.getElementById('note');
    const saveButton = document.getElementById('save');
  
    // Load saved note on popup open
    chrome.storage.local.get(['note'], function (result) {
      if (result.note) {
        noteInput.value = result.note;
      }
    });
  
    // Save note on button click
    saveButton.addEventListener('click', function () {
      const note = noteInput.value;
      chrome.storage.local.set({ 'note': note }, function () {
        alert('Note saved locally!');
      });
    });
  });
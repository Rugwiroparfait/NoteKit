chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'syncNote') {
        console.log('Syncing note:', message.note);

        chrome.identity.getAuthToken({ interactive: true}, function (token) {
            if (chrome.runtime.lastError) {
                console.error(chrome.runtime.lastError);
                return;
            }

            fetch('https://keep.googleapis.com/v1/notes', {
                methods: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title : message.note})
            })
            .then(response => response.json())
            .then(data => console.log('Note synced successfully:', data))
            .catch(error => console.error('Error syncing note', error));
        });
    }
});
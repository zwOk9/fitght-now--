var myNotificationID = null;

/* For demonstration purposes, the notification creation 
 * is attached to the browser-action's `onClicked` event.
 * Change according to your needs. */
chrome.browserAction.onClicked.addListener(function() {
    chrome.notifications.create("", {
        type:    "basic",
        iconUrl: "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png",
        title:   "REMINDER",
        message: "It's time to go to this super-cool site !\nProceed ?",
        contextMessage: "It's about time...",
        buttons: [{
            title: "Yes, get me there",
            iconUrl: "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png"
        }, {
            title: "Get out of my way",
            iconUrl: "http://cdn.sstatic.net/stackexchange/img/logos/so/so-icon.png"
        }]
    }, function(id) {
        myNotificationID = id;
    });
});

/* Respond to the user's clicking one of the buttons */
chrome.notifications.onButtonClicked.addListener(function(notifId, btnIdx) {
    if (notifId === myNotificationID) {
        if (btnIdx === 0) {
            window.open("...");
        } else if (btnIdx === 1) {
            saySorry();
        }
    }
});

/* Add this to also handle the user's clicking 
 * the small 'x' on the top right corner */
chrome.notifications.onClosed.addListener(function() {
    saySorry();
});

/* Handle the user's rejection 
 * (simple ignore if you just want to hide the notification) */
function saySorry() {
    alert("Sorry to bother you !");
}
function checkUserKey() {
    function getCookie(name) {
        let cookies = document.cookie.split('; ');
        for (let i = 0; i < cookies.length; i++) {
            let [cookieName, cookieValue] = cookies[i].split('=');
            if (cookieName === name) return cookieValue;
        }
        return null;
    }
    
    let userKey = getCookie("userKey");
    if (!userKey) {
        alert("You need a key to proceed.");
        window.location.href = "/key.html";
    }
}

function navigate() {
    checkUserKey();
    const urlInput = document.getElementById('url-input').value;
    const isUrl = urlInput.startsWith('https://') || urlInput.startsWith('http://');
    const query = isUrl ? urlInput : `https://duckduckgo.com/?q=${encodeURIComponent(urlInput)}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(query)}`;

    fetch(proxyUrl)
    .then(response => response.json())
    .then(data => {
        const contentFrame = document.getElementById('content-frame');
        const parser = new DOMParser();
        const doc = parser.parseFromString(data.contents, 'text/html');
        const base = document.createElement('base');
        base.href = query;
        doc.head.appendChild(base);
        contentFrame.srcdoc = doc.documentElement.outerHTML;
        Array.from(contentFrame.contentDocument.links).forEach(link => {
            link.addEventListener('click', event => {
                event.preventDefault();
                document.getElementById('url-input').value = link.href;
                navigate();
            });
        });
        addToHistory(urlInput);
    })
    .catch(error => {
        document.getElementById('content-frame').srcdoc = `Error fetching URL: ${error}`;
    });
}

document.addEventListener("DOMContentLoaded", checkUserKey);

function checkUserKey() {
    const userKey = localStorage.getItem('userKey');
    if (!userKey) {
        window.location.href = 'key.html';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    checkUserKey();
    displayHistory();
});

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

function addToHistory(url) {
    const history = JSON.parse(localStorage.getItem('history')) || [];
    history.push(url);
    localStorage.setItem('history', JSON.stringify(history));
    displayHistory();
}

function displayHistory() {
    const historyDiv = document.getElementById('history');
    historyDiv.innerHTML = (JSON.parse(localStorage.getItem('history')) || []).map(url =>
        `<div class="history-item" onclick="document.getElementById('url-input').value='${url}';navigate();">${url}</div>`
    ).join('');
}

function executeJavascript(jsUrl, openInNewTab = false) {
    const jsCode = jsUrl.substring(11);
    if (openInNewTab) {
        const newWindow = window.open('about:blank', '_blank');
        newWindow.document.write(`<script>${jsCode}</script>`);
        newWindow.document.close();
    } else {
        eval(jsCode);
    }
}

function runConsole() {
    try {
        eval(document.getElementById('console-input').value);
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
}

document.addEventListener('DOMContentLoaded', displayHistory);

function reloadPage() {
    document.getElementById('content-frame').contentWindow.location.reload();
}

function addBookmark() {
    const url = document.getElementById('url-input').value;
    const bookmarks = document.getElementById('bookmarks');
    const bookmark = document.createElement('div');
    bookmark.className = 'bookmark';
    bookmark.textContent = url;
    bookmark.onclick = () => {
        document.getElementById('url-input').value = url;
        navigate();
    };
    bookmarks.appendChild(bookmark);
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    document.body.style.backgroundColor = isDark ? '#333' : '#121212';
    document.body.style.color = isDark ? '#f0f0f0' : '#ffffff';
}

function toggleConsole() {
    document.getElementById('console-input').classList.toggle('hidden');
}

function toggleHistory() {
    document.getElementById('history').classList.toggle('hidden');
}

function toggleQuickUrls() {
    document.getElementById('quick-urls').classList.toggle('hidden');
}

function quickNavigate(url) {
    document.getElementById('url-input').value = url;
    navigate();
}

function fetchContent() {
    const url = document.getElementById('urlInput').value;

    if (!url) {
        alert("Please enter a valid URL.");
        return;
    }

    const validUrl = url.startsWith('http://') || url.startsWith('https://');
    if (!validUrl) {
        alert("Please enter a URL with 'http://' or 'https://'");
        return;
    }

    fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const metaTag = doc.querySelector('meta[property="og:image"]');

            if (metaTag && metaTag.getAttribute('content')) {
                let imageUrl = metaTag.getAttribute('content');
                document.getElementById('imageLink').innerHTML = `Image Link: <a href="${imageUrl}" target="_blank">${imageUrl}</a>`;
            } else {
                document.getElementById('imageLink').innerHTML = 'No OG Image link found.';
            }
        })
        .catch(error => {
            console.error('Error fetching content:', error);
            alert('Failed to fetch content from the provided URL.');
        });
}

function fetchContentAndOpen(url) {
    fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const metaTag = doc.querySelector('meta[property="og:image"]');

            if (metaTag && metaTag.getAttribute('content')) {
                let imageUrl = metaTag.getAttribute('content');
                let vlcUrl = `vlc://${imageUrl}`;

                // Display the link as a clickable element to open in VLC
                document.getElementById('imageLink').innerHTML = `
                    <a href="${vlcUrl}" target="_blank">Click here to open the image in VLC</a>
                `;
            } else {
                document.getElementById('imageLink').innerHTML = 'No OG Image link found.';
            }
        })
        .catch(error => {
            console.error('Error fetching content:', error);
            alert('Failed to fetch content from the provided URL.');
        });
}

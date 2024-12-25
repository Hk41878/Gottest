function fetchContentAndOpen(url) {
    fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
        .then(response => response.text())
        .then(data => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(data, 'text/html');
            const metaTag = doc.querySelector('meta[property="og:image"]');

            if (metaTag && metaTag.getAttribute('content')) {
                let imageUrl = metaTag.getAttribute('content');
                // Open the image URL in a new tab
                window.open(imageUrl, '_blank');
            } else {
                alert('No OG Image link found.');
            }
        })
        .catch(error => {
            console.error('Error fetching content:', error);
            alert('Failed to fetch content from the provided URL.');
        });
}

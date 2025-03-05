function pasteClipboard() {
    navigator.clipboard.readText().then(text => {
        document.getElementById("videoLink").value = text;
    }).catch(err => {
        alert("Failed to paste: " + err);
    });
}

function fetchOGLink() {
    let url = document.getElementById("videoLink").value.trim();
    if (!url) {
        alert("Please enter a valid WD My Cloud video link.");
        return;
    }

    document.getElementById("result").classList.add("hidden");

    fetch(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
        .then(response => response.text())
        .then(data => {
            let parser = new DOMParser();
            let doc = parser.parseFromString(data, 'text/html');
            let metaTag = doc.querySelector('meta[property="og:image"]');

            if (metaTag && metaTag.getAttribute('content')) {
                let imageUrl = metaTag.getAttribute('content');
                document.getElementById("ogLink").value = imageUrl;
                document.getElementById("result").classList.remove("hidden");
            } else {
                alert("OG link not found!");
            }
        })
        .catch(error => {
            console.error("Error fetching content:", error);
            alert("Failed to fetch content from the provided URL.");
        });
}

function copyToClipboard() {
    let copyText = document.getElementById("ogLink");
    copyText.select();
    document.execCommand("copy");
    alert("Copied to clipboard!");
}

function playInVLC() {
    let ogLink = document.getElementById("ogLink").value;
    if (!ogLink) {
        alert("No OG link found!");
        return;
    }
    window.location.href = `vlc://${ogLink}`;
}

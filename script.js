// Lấy giá Crypto từ CoinGecko
async function fetchCryptoPrices() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum,solana&vs_currencies=usd');
        const data = await response.json();
        document.getElementById('prices').innerHTML = `
            <p>Bitcoin: $${data.bitcoin.usd.toLocaleString()}</p>
            <p>Ethereum: $${data.ethereum.usd.toLocaleString()}</p>
            <p>Solana: $${data.solana.usd.toLocaleString()}</p>
        `;
    } catch (error) {
        document.getElementById('prices').innerHTML = '<p>Lỗi khi tải giá. Vui lòng thử lại sau.</p>';
    }
}

// Lấy tin tức từ CryptoPanic
async function fetchCryptoNews() {
    try {
        const response = await fetch('https://cryptopanic.com/api/v1/posts/?auth_token=a7afadb4107b54e9018157ca99ced0f588fbe903&public=true');
        const data = await response.json();
        const newsDiv = document.getElementById('news');
        newsDiv.innerHTML = '';
        data.results.slice(0, 5).forEach(post => {
            newsDiv.innerHTML += `<p><a href="${post.url}" target="_blank">${post.title}</a></p>`;
        });
    } catch (error) {
        document.getElementById('news').innerHTML = '<p>Lỗi khi tải tin tức. Vui lòng thử lại sau.</p>';
    }
}

// Cập nhật dữ liệu khi tải trang
fetchCryptoPrices();
fetchCryptoNews();

// Cập nhật định kỳ
setInterval(fetchCryptoPrices, 60000); // Giá: 1 phút
setInterval(fetchCryptoNews, 300000);  // Tin tức: 5 phút
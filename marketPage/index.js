const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      'x-cg-demo-api-key': 'CG-B9g6UX1cwQWzY2SD7L9Lp6UJ'
    }
  };
  
  fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin%2Cethereum%2Clitecoin%2Ccardano%2Cdogecoin%2Ctether&vs_currencies=usd&include_24hr_change=true', options)
    .then(response => response.json())
    .then(json => {
      const container = document.querySelector('.container');
      const coins = Object.getOwnPropertyNames(json);
  
      for (let coin of coins) {
        const coinInfo = json[coin];
        const price = coinInfo?.usd;
        const change = coinInfo?.usd_24h_change;
  
        // Check if both price and change are defined before using them
        if (price !== undefined && change !== undefined) {
          container.innerHTML += `
            <div class="coin ${change < 0 ? 'falling' : 'rising'}">
              <div class="coin-logo">
                <img src="img/${coin}.png">
              </div>
              <div class="coin-name">
                <h3>${coin}</h3>
                <span>/USD</span>
              </div>
              <div class="coin-price">
                <span class="price">$${price}</span>
                <span class="change">${change.toFixed(5)}</span>
              </div>
            </div>
          `;
        } else {
          console.warn(`Data for ${coin} is missing or incomplete.`);
        }
      }
    })
    .catch(error => console.error('Error:', error));
  
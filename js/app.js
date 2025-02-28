function calculateCarbon() {
  const km = document.getElementById('transport').value;
  const emissionFactor = 0.12;
  const carbonFootprint = km * emissionFactor;
  document.getElementById('carbon-result').textContent = `Ваш вуглецевий слід: ${carbonFootprint.toFixed(2)} кг CO2`;
}

document.addEventListener("DOMContentLoaded", () => {
  loadEcoTips();
  loadCityRanking();
});

function loadEcoTips() {
  const tips = [
    {
      text: "Використовуйте багаторазові сумки замість пластикових",
      image: "img/packege.webp",
      description: "Використання багаторазових сумок зменшує використання пластикових пакетів, що забруднюють навколишнє середовище."
    },
    {
      text: "Сортуйте сміття та здавайте його на переробку",
      image: "img/sort.webp",
      description: "Сортування допомагає зменшити відходи та сприяє переробці корисних матеріалів."
    },
    {
      text: "Економте електроенергію, вимикаючи непотрібні прилади",
      image: "img/light.png",
      description: "Економія електроенергії допомагає знизити викиди вуглецю та зберегти ресурси."
    },
    {
      text: "Використовуйте велосипед для коротких поїздок",
      image: "img/bicycle.png",
      description: "Велосипед — це екологічний транспорт, який не забруднює повітря та зменшує викиди CO2."
    },
    {
      text: "Замість одноразових пляшок використовуйте багаторазові фляги",
      image: "img/bottle.png",
      description: "Багаторазові фляги зменшують кількість пластикових відходів та економлять гроші."
    },
    {
      text: "Купуйте якомога менше запакованих продуктів",
      image: "img/food2.png",
      description: "Зменшення споживання пакованих продуктів сприяє зменшенню пластикових відходів."
    },
    {
      text: "Купуйте свіжі продукти місцевого виробництва",
      image: "img/food.png",
      description: "Покупка місцевих продуктів підтримує економіку та знижує викиди через транспортування."
    },
    {
      text: "Носіть власну кружку для кави",
      image: "img/coffecup.png",
      description: "Власна кружка дозволяє уникати використання одноразових пластикових чашок і знижує кількість відходів."
    },
    {
      text: "Купуйте одяг у місцевих виробників або на секонд-хенді",
      image: "img/clothes.png",
      description: "Місцеве виробництво та покупка в секонд-хендах допомагає знижувати викиди і підтримує сталий розвиток."
    },
  ];

  const tipsList = document.getElementById('tips-list');
  tips.forEach(tip => {
    const li = document.createElement('li');
    li.innerHTML = `
      <span>${tip.text}</span>
      <p class="tip-description">${tip.description}</p>
      <img src="${tip.image}" alt="Eco tip image">
    `;
    tipsList.appendChild(li);
  });
}


async function loadCityRanking() {
  const apiKey = '5b74c36948d9e0dce91614f2b7bc3374a7190b94';
  const cities = [
    'oslo', 'stockholm', 'kyiv', 'london', 'paris', 'new-york',
    'tokyo', 'berlin', 'amsterdam', 'madrid'
  ];
  const cityScores = [];

  try {
    for (let city of cities) {
      const response = await fetch(`https://api.waqi.info/feed/${city}/?token=${apiKey}`);
      const data = await response.json();

      if (data.status === 'ok') {
        cityScores.push({
          name: city.charAt(0).toUpperCase() + city.slice(1),
          score: data.data.aqi // AQI (Air Quality Index)
        });
      } else {
        cityScores.push({
          name: city.charAt(0).toUpperCase() + city.slice(1),
          score: 'Не доступно'
        });
      }
    }

    const cityList = document.getElementById("city-list");
    cityScores.forEach(city => {
      let li = document.createElement("li");
      const score = city.score === 'Не доступно' ? city.score : `${city.score}%`;
      li.textContent = `${city.name} - Екологічність: ${score}`;
      cityList.appendChild(li);
    });

  } catch (error) {
    console.error('Помилка завантаження даних про якість повітря:', error);
  }
}

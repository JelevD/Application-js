function attachEvents() {

    const location = document.getElementById('location');
    const btn = document.getElementById('submit');
    const divForcast = document.getElementById('forecast');
    const divCurrant = document.getElementById('current');
    const divUpcoming = document.getElementById('upcoming');

    btn.addEventListener('click', (getLocation));

    let codeForecast;

    async function getLocation() {

        let responsNow = await fetch(`http://localhost:3030/jsonstore/forecaster/locations`);
        let data = await responsNow.json();

        for (let i = 0; i < data.length; i++) {

            if (data[i].name == location.value) {

                codeForecast = data[i].code;
               
            }
        }
        location.value = '';

        forecastNow()
        forecastThreeDays()


        function symbolContent(weather) {
            let currSymbol;

            switch (weather) {
                case 'Sunny': currSymbol = '☀';
                    break;
                case 'Partly sunny': currSymbol = '⛅';
                    break;
                case 'Overcast': currSymbol = '☁';
                    break;
                case 'Rain': currSymbol = '☂';
                    break;
            }
            return currSymbol;
        }
        async function forecastNow() {

            let forcastNow = `http://localhost:3030/jsonstore/forecaster/today/${codeForecast}`;
            const responsNow = await fetch(forcastNow);
            const dataNow = await responsNow.json();
           

            const divEl = document.createElement('div');
            divEl.className = 'forecasts';

            const spanSymbol = document.createElement('span');
            spanSymbol.className = 'condition symbol';
            spanSymbol.textContent = symbolContent(dataNow.forecast.condition);

            const spanCondition = document.createElement('span');
            spanCondition.className = 'condition';

            const span1 = document.createElement('span');
            span1.className = 'forecast-data';
            span1.textContent = dataNow.name;
            const span2 = document.createElement('span');
            span2.className = 'forecast-data';
            span2.textContent = `${dataNow.forecast.low}°/${dataNow.forecast.high}°`;
            const span3 = document.createElement('span');
            span3.className = 'forecast-data';
            span3.textContent = dataNow.forecast.condition;

            divEl.appendChild(spanSymbol);
            spanCondition.appendChild(span1);
            spanCondition.appendChild(span2);
            spanCondition.appendChild(span3);
            divEl.appendChild(spanCondition);
            divCurrant.appendChild(divEl);
            divForcast.style.display = 'block';

        }

        async function forecastThreeDays() {

            let urlThreeDays = `http://localhost:3030/jsonstore/forecaster/upcoming/${codeForecast}`;

            const responsThreeDays = await fetch(urlThreeDays);
            const dataThreeDays = await responsThreeDays.json();

            const divInfo = document.createElement('div');
            divInfo.className = 'forecast-info';

            const spanUpcoming1 = document.createElement('span');
            spanUpcoming1.className = 'upcoming';
            const spanUpcoming2 = document.createElement('span');
            spanUpcoming2.className = 'upcoming';
            const spanUpcoming3 = document.createElement('span');
            spanUpcoming3.className = 'upcoming';

            const spanUp1 = document.createElement('span');
            spanUp1.className = 'symbol';
            spanUp1.textContent = symbolContent(dataThreeDays.forecast[0].condition);
            const spanUp1_1 = document.createElement('span');
            spanUp1_1.className = 'forecast-data';
            spanUp1_1.textContent = `${dataThreeDays.forecast[0].low}°/${dataThreeDays.forecast[0].high}°`;
            const spanUp1_2 = document.createElement('span');
            spanUp1_2.className = 'forecast-data';
            spanUp1_2.textContent = dataThreeDays.forecast[0].condition;

            const spanUp2 = document.createElement('span');
            spanUp2.className = 'symbol';
            spanUp2.textContent = symbolContent(dataThreeDays.forecast[1].condition);
            const spanUp2_1 = document.createElement('span');
            spanUp2_1.className = 'forecast-data';
            spanUp2_1.textContent = `${dataThreeDays.forecast[1].low}°/${dataThreeDays.forecast[1].high}°`;
            const spanUp2_2 = document.createElement('span');
            spanUp2_2.className = 'forecast-data';
            spanUp2_2.textContent = dataThreeDays.forecast[1].condition;

            const spanUp3 = document.createElement('span');
            spanUp3.className = 'symbol';
            spanUp3.textContent = symbolContent(dataThreeDays.forecast[2].condition);
            const spanUp3_1 = document.createElement('span');
            spanUp3_1.className = 'forecast-data';
            spanUp3_1.textContent = `${dataThreeDays.forecast[2].low}°/${dataThreeDays.forecast[2].high}°`;
            const spanUp3_2 = document.createElement('span');
            spanUp3_2.className = 'forecast-data';
            spanUp3_2.textContent = dataThreeDays.forecast[2].condition;

            spanUpcoming1.appendChild(spanUp1);
            spanUpcoming1.appendChild(spanUp1_1);
            spanUpcoming1.appendChild(spanUp1_2);
            spanUpcoming2.appendChild(spanUp2);
            spanUpcoming2.appendChild(spanUp2_1);
            spanUpcoming2.appendChild(spanUp2_2);
            spanUpcoming3.appendChild(spanUp3);
            spanUpcoming3.appendChild(spanUp3_1);
            spanUpcoming3.appendChild(spanUp3_2);

            divInfo.appendChild(spanUpcoming1);
            divInfo.appendChild(spanUpcoming2);
            divInfo.appendChild(spanUpcoming3);

            divUpcoming.appendChild(divInfo);

        }
    }

}

attachEvents();
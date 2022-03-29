let dataValut = [];
let app = document.querySelector('.app');
let list = document.querySelector('.list');

const requestURL = 'https://www.cbr-xml-daily.ru/daily_json.js';

(async () => {
    let response = await fetch(requestURL);
    let request = await response.json();

    dataValut.push(request);

    render();
})();

function render() {
    dataValut.forEach((it, ix) => {
        for (let value of Object.values(it.Valute)) {
            let { CharCode, Name, Previous, Value } = value;

            let change = (-((Previous - Value) / Previous) * 100).toFixed(1);

            let msg = `
                <tr data-bs-toggle="tooltip" title="${Name}">
                    <td class="${CharCode}">${CharCode}</td>
                    <td class="${CharCode}">${Value} руб.</td>
                    <td class="${CharCode}">${change} %</td>
                </tr>
            `;

            list.innerHTML += msg;
        };
    });
};
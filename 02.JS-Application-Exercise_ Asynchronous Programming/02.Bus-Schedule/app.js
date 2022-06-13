function solve() {

    const label = document.querySelector('#info');
    const departBtn = document.querySelector('#depart');
    const arriveBtn = document.querySelector('#arrive');

    let stop = {
        next: 'depot'
    }
    async function depart() {
        try {
            departBtn.disabled = true;
            const url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

            const res = await fetch(url);
           stop = await res.json();

            label.textContent = `Next stop ${stop.name}`;

            arriveBtn.disabled = false;
        } catch (error) {
            label.textContent = 'Error';
            departBtn.disabled = true;
            arriveBtn.disabled = true;
        }
    }
    function arrive() {
        label.textContent = `Arriving at ${stop.name}`;

        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();
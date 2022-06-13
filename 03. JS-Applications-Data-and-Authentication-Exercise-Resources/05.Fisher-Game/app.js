const mainDiv = document.getElementById('catches');

function attachEvents() {
    document.querySelector('.load').addEventListener('click', async (event) => {

        const result = await listallCatches();
        renderingCatchers(result)
    });
   
}

attachEvents();



async function getCatcher(id) {
    const response = await fetch('http://localhost:3030/data/catches/' + id)

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message);
    }

    const result = await response.json();

    console.log(result);
}

async function listallCatches() {

    const response = await fetch('http://localhost:3030/data/catches');

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message);
    }

    const data = await response.json();

    return data;
}

async function createNewCatch(input) {

    const response = await fetch('http://localhost:3030/data/catches', {
        method: 'post',
        headers: { 'Content-Type': 'application/js' },
        body: JSON.stringify(input)
    });

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message);
    }

    const result = await response.json();

    console.log(result);
}

async function updateCatch(id, input) {
    const response = await fetch('http://localhost:3030/data/catches/' + id, {
        method: 'put',
        headers: { 'Content-Type': 'application/js' },
        body: JSON.stringify(input)
    });

    if (response.ok == false) {
        const error = await response.json();
        return alert(error.message);
    }

    const result = await response.json();

    console.log(result);

}

async function deleteCatch(id) {
    const response = await fetch('http://localhost:3030/data/catches/' + id, {
        method: 'delete',
    });
}

function renderingCatchers(input) {
    mainDiv.innerHTML = ''
    input.forEach(line => {
        const divCatch = e('div', 'catch', '');
        divCatch.appendChild(e('label','', 'Angler'));
        divCatch.appendChild(eInputs('input','text', 'angler', line.angler));
        divCatch.appendChild(e('label','', 'Weight'));
        divCatch.appendChild(eInputs('input','number', 'weight', line.weight));
        divCatch.appendChild(e('label','', 'Species'));
        divCatch.appendChild(eInputs('input','text', 'species', line.species));
        divCatch.appendChild(e('label','', 'Location'));
        divCatch.appendChild(eInputs('input','text', 'location', line.location));
        divCatch.appendChild(e('label','', 'Bait'));
        divCatch.appendChild(eInputs('input','text', 'bait', line.bait));
        divCatch.appendChild(e('label','', 'Capture Time'));
        divCatch.appendChild(eInputs('input','number', 'captureTime', line['captureTime ']));
        const btnUpdate = e('button','update','Update');
        btnUpdate.disabled=true;
        btnUpdate.addEventListener('click', (ev) => {
        });
        divCatch.appendChild(btnUpdate);
        const btnDelete = e('button','delete','Delete');
        btnDelete.disabled=true;
        btnDelete.addEventListener('click', (ev) => {
        });
        divCatch.appendChild(btnDelete);
        mainDiv.appendChild(divCatch);
    });

}

function e(type, className, content) {

    const element = document.createElement(type);

    if (className) {

        element.className = className;
    }

    if (content) {
        element.textContent = content
    }

    return element;
}

function eInputs(type, inputType, className, value) {
    const inputs = document.createElement(type);

    if (inputType) {
        inputs.type = inputType;
    }
    if (className) {
        inputs.className = className;
    }
    if (value) {
        inputs.value = value;
    }

    return inputs;
}
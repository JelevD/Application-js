async function getInfo() {

    const buses = document.getElementById('buses');
    const stopId = document.getElementById('stopId').value;

    const url = `http://localhost:3030/jsonstore/bus/businfo/${stopId}`

    try{
        buses.replaceChildren();
    const res = await fetch(url);
    if (res.status != 200) {
        throw new Error('lqlqql')
    }
    const data = await res.json();
    console.log(data)
    document.getElementById('stopName').textContent = data.name;
    Object.entries(data.buses).forEach(b => {
        const liElement = document.createElement("li");
        liElement.textContent = `Bus ${b[0]} arrives in ${b[1]} minutes`
        buses.appendChild(liElement);
    })
    }catch (error) {
    document.getElementById('stopName').textContent = 'Error';

    }


}
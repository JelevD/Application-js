function attachEvents() {

    document.getElementById('btnCreate').addEventListener('click', async () => {

        const person = document.getElementById('person').value;
        const phone = document.getElementById('phone').value;

        await createPerson({person,phone});
        const ulEl = document.getElementById('phonebook');
        ulEl.innerHTML = '';
        getPhoneBook();

        document.getElementById('person').value = '';
        document.getElementById('phone').value = '';
      
    });

    document.getElementById('btnLoad').addEventListener('click', async() => {

        getPhoneBook();
    });

    document.querySelector('ul').addEventListener('click', (event) => {
        
        if(event.target.textContent == 'Delete'){
            const id = event.target.parentNode.className;

            deletePerson(id);
            const ulEl = document.getElementById('phonebook');
            ulEl.innerHTML = '';
            getPhoneBook();
        }
        
    });
}

attachEvents();



async function getPhoneBook(){

    const response = await fetch('http://localhost:3030/jsonstore/phonebook');
    const data = await response.json();

    const ulEl = document.getElementById('phonebook');
    
     Object.values(data).forEach(line => {
         const liEl =  e('li',`${line._id}`,`${line.person}: ${line.phone}`);
         liEl.appendChild(e('button','','Delete'));
         ulEl.appendChild(liEl)
     });
    
    
}

async function createPerson(input) {
    await fetch('http://localhost:3030/jsonstore/phonebook', {
        method: 'post',
        headers: { 'Content-Type': 'application/js' },
        body: JSON.stringify(input)
    });

}

async function deletePerson(id){
    
    await fetch('http://localhost:3030/jsonstore/phonebook/' + id, {
        method: 'delete',
    
    });

}

function e(type, className, content){

const element = document.createElement(type)

if(className){
    element.className = className;
}

if(content){
    element.textContent = content;
}

return element;

}
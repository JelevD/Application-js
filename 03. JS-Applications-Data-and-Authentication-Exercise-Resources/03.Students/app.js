async function solve() {

    const baseUrl = `http://localhost:3030/jsonstore/collections/students`;
    const tBody = document.querySelector(`#results tbody`);

    updateTable(baseUrl, tBody);

    document.querySelector(`#form`).addEventListener(`submit`, async (e) => {

        e.preventDefault();

        try {

            await postRequest(e, baseUrl);

            updateTable(baseUrl, tBody);

            e.target.reset();

        } catch (error) {
            alert(error.message)
        }

        async function postRequest(e, url) {

            const formData = new FormData(e.target);
            const firstName = formData.get(`firstName`);
            const lasttName = formData.get(`lastName`);
            const facultyNumber = formData.get(`facultyNumber`);
            const grade = formData.get(`grade`);

            if (firstName == `` ||
                lasttName == `` ||
                facultyNumber == `` ||
                grade == ``) {

                throw new Error(`Fields must not be empty!`);
            }

            await fetch(url, {
                method: `post`,
                headers: { "Content-Type": `application/json` },
                body: JSON.stringify({ firstName, lasttName, facultyNumber, grade })
            });
        }
    });

    async function updateTable(url, tBody) {

        const students = await getStudents(url);

        tBody.innerHTML = ``;

        createRows(students, tBody);

        async function getStudents(url) {

            const response = await fetch(url);
            const students = await response.json();

            return students;
        }

        function createRows(students, tBody) {

            for (let i = 0; i < Object.keys(students).length; i++) {

                let newRow = tBody.insertRow();

                let student = Object.values(students)[i];
                delete student._id;

                Object.keys(student).forEach(k => {
                    newRow.insertCell().textContent = student[k];
                });
            }
        }
    }
}

solve();
document.addEventListener('DOMContentLoaded', () => {
  const tbody = document.querySelector('#table-body');
  const form = document.querySelector('#dog-form');

  const fetchDogs = () => {
    fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(json => renderDogs(json));
  }

  const renderDogs = (json) => {
    json.forEach(dog => {
      const tr = document.createElement('tr');
      const name = document.createElement('td');
      const breed = document.createElement('td');
      const sex = document.createElement('td');
      const edit = document.createElement('button');
      name.innerText = dog.name;
      breed.innerText = dog.breed;
      sex.innerText = dog.sex;
      edit.innerText = 'Edit Dog';
      tr.appendChild(name);
      tr.appendChild(breed);
      tr.appendChild(sex);
      tr.appendChild(edit);
      tbody.appendChild(tr);

      edit.addEventListener('click', () => {
        const items = [name, breed, sex]
        inputs = form.querySelectorAll('*');
        for(let i = 0; i < inputs.length; i++) {
          if (i < 3) {
            inputs[i].value = items[i].innerText;
          }
        }

        form.addEventListener('submit', (event) => {
          event.preventDefault();
          fetch(`http://localhost:3000/dogs/${dog.id}`, {
            method: 'PATCH',
            headers: 
            {
              "Content-Type": "application/json",
              "Accept": "application/json",
            },
            body: JSON.stringify({
              name: inputs[0].value,
              breed: inputs[1].value,
              sex: inputs[2].value
            })
          }).then(() => {
            tbody.querySelectorAll('*').forEach(n => n.remove());
            fetchDogs()
          })
          for(let i = 0; i < inputs.length; i++) {
            if (i < 3) {
              inputs[i].value = ''
            }
          }
        });
      });
    });
  }

  fetchDogs()
})
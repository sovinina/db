
const path =window.location.pathname.split('.')[0]
async function getPeople(){
    let res = await fetch("api"+path, {
        method: 'GET',
    });
    if (res.ok) {
        let json = await res.json()
        json.rows.forEach((person)=>{
            let div = document.createElement('div')
            div.classList.add('block')
            let name = document.createElement('p')
            let birthAge = document.createElement('p')
            let phone = document.createElement('p')
            let workId = document.createElement('p')
            name.innerHTML = 'Имя: ' + person.name
            birthAge.innerHTML = 'Год рождения: ' + person.birthAge
            phone.innerHTML = 'Тел. номер: ' + person.phone
            workId.innerHTML = 'ID работы: ' + person.workId
            div.appendChild(name)
            div.appendChild(birthAge)
            div.appendChild(phone)
            div.appendChild(workId)
            document.querySelector('.cards').appendChild(div)
        })
    } else {
        console.log(res.status);
    }
}
async function getWork(){
    let res = await fetch("api/work/", {
        method: 'GET'
    });
    if (res.ok) {
        let json = await res.json()
        json.rows.forEach((work)=>{
            let div = document.createElement('div')
            div.classList.add('block')
            let title = document.createElement('p')
            let code = document.createElement('p')
            let pay = document.createElement('p')
            title.innerHTML = 'Название: ' + work.title
            code.innerHTML = 'Код: ' + work.code
            pay.innerHTML = 'Зарплата: ' + work.pay
            div.appendChild(title)
            div.appendChild(code)
            div.appendChild(pay)
            document.querySelector('.cards').appendChild(div)
        })
    } else {
        console.log(res.status);
    }
}

if(path ==='/people'){
    getPeople()
    getWorkTitle()
}
else{
    getWork()
}




async function getWorkTitle(){
    let res = await fetch("/api/work", {
        method: 'GET'
    })
    let json = await res.json()
    json.rows.forEach((work)=>{
        let option = document.createElement('option')
        option.setAttribute('value', work.id)
        option.innerHTML = work.title
        document.getElementById('workId').appendChild(option)
    })
}



const form = document.querySelector('form')

form.addEventListener('submit', async function(event){
    event.preventDefault()
    const formData = new FormData(form)
    const urlEncoded = new URLSearchParams(formData)
    try{
        const res = await fetch('/api'+path,{
            method:'POST',
            body:urlEncoded,
            headers:{'Authorization':localStorage.getItem('token')}
        })
        if(res.status ===200){
            location.reload()
        }
        else{
            alert(await res.json())
        }
    }
    catch (e) {
        console.log(e)
    }
})
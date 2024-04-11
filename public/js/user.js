
const form =document.querySelector('form')
form.addEventListener('submit', async function(event){
    event.preventDefault()
    const formData = new FormData(form)
    const urlEncoded = new URLSearchParams(formData)
    const path ='api/user'+window.location.pathname.split('.')[0]
    try{
        const res = await fetch(`${path}`,{
            method:'POST',
            body:urlEncoded,
        })
        if(res.status ===200){
            localStorage.setItem('token', await res.json())
            window.location.href = '/menu.html'
        }
        else{
            alert(await res.json())
        }
    }
    catch (e) {
        console.log(e)
    }

})



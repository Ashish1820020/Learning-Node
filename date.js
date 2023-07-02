module.exports = () =>{
    let date = new Date();
    let day = date.getDate();
    const options = {month: 'long', weekday: 'long', day: 'numeric'  }
    
    return value = date.toLocaleDateString('us-en', options);
}
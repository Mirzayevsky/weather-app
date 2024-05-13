
const search = document.getElementById('search')
const searchButton = document.getElementById('search-icon')
const cityDeg = document.querySelector('.main-deg')
const cityLocation = document.querySelector('.location')
const weatherIcon = document.getElementById('weather')
const condition = document.querySelector('.about')
const tempMinMax = document.querySelector('.average')
const dateAre = document.querySelector('.date')

const KEY =  '970c15ac6bf302969a5f4ff4fd988965'
const base = 'https://api.openweathermap.org/data/2.5/weather'

//  request 
const getData = async (city) => {
    const query = `?q=${city}&units=metric&appid=${KEY}`
    const request =  await fetch(base + query)
    const data = await request.json()
    return data
}

const getWeather = async (city) => {
  const data = await getData(city)
  return data
}

const updateUi = (resonse) => {
    const {main,weather,name} = resonse
    const {temp_min,temp_max} = main
    const {round} = Math
    let now = new Date()
    console.log(resonse)
    dateAre.innerText = dateBuilder(now)
    cityDeg.textContent = `${ Math.round(main.temp)}˚c`   
    cityLocation.textContent = `${name},${resonse.sys.country}`
    condition.textContent = `${weather[0].main}`
    weatherIcon.src = `./images/${weather[0].main}.svg`
    tempMinMax.textContent = `Min˚c ${round(temp_min)} / Max˚c${round(temp_max)}`  

}

searchButton.addEventListener('click',()=>{
const inputValue = search.value.trim()
 getWeather(inputValue)
 .then((data)=>{
    updateUi(data)
 })
})


function dateBuilder(arg){
   let months = ['January', 
    'February', 
    'March',
    'April',
    'May', 
    'June', 
    'July', 
    'August',
    'September', 
    'October',
    'November',
    'December'
]

    let days = [
        'Yakshanba',
        'Dushanba',
        'Seshanba',
        'Chorshanba',
        'Payshanba',
        'Juma',
        'Shanba',
    ]
    let day = days[arg.getDay()]
    let date = arg.getDate()
    let month = months[arg.getMonth()]
    let year = arg.getFullYear()
  
    return `${day} ${date} ${month} ${year}`
}



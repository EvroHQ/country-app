const countriesContainer = document.querySelector('.countries-container')
const rangeValue = document.getElementById('rangeValue')
const inputRange = document.getElementById('inputRange')
const inputSearch = document.getElementById('inputSearch')

let countries = []
let displayedCountries = []

const fetchCountries = async () => {
  try {
    const response = await fetch('https://restcountries.com/v3.1/all')
    if (response.ok) {
      const data = await response.json()
      countries = data
      displayedCountries = countries.slice(0, inputRange.value)
      displayCountries()
    } else {
      console.error('Failed to fetch data.')
    }
  } catch (error) {
    console.error('Error fetching data:', error)
  }
}

function updateRangeValue() {
  const value = inputRange.value
  rangeValue.textContent = value
  displayedCountries = countries.slice(0, value)
  displayCountries()
}

function displayCountries() {
  countriesContainer.innerHTML = displayedCountries
    .map((country) => {
      return `
      <div class="card">
        <img src="${country.flags.png}" />
        <h3>${country.name.common}</h3>
        <p>${country.capital}</p>
        <p>Population : ${country.population}</p>
      </div>
    `
    })
    .join('')
}

// Listen to the "input" event of the range to detect value changes
inputRange.addEventListener('input', updateRangeValue)

// Call the initial function to display the initial value
updateRangeValue()

// Listen to the "input" event of the search input to detect value changes
inputSearch.addEventListener('input', () => {
  const searchValue = inputSearch.value.toLowerCase()
  displayedCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(searchValue)
  })
  displayCountries()
})

// Ascending sort by population (you can choose a different criterion if needed)
document.getElementById('minToMax').addEventListener('click', () => {
  displayedCountries.sort((a, b) => a.population - b.population)
  displayCountries()
})

// Descending sort by population (you can choose a different criterion if needed)
document.getElementById('maxToMin').addEventListener('click', () => {
  displayedCountries.sort((a, b) => b.population - a.population)
  displayCountries()
})

// Alphabetical sort by common name
document.getElementById('alpha').addEventListener('click', () => {
  displayedCountries.sort((a, b) => {
    const nameA = a.name.common.toLowerCase()
    const nameB = b.name.common.toLowerCase()
    if (nameA < nameB) return -1
    if (nameA > nameB) return 1
    return 0
  })
  displayCountries()
})

fetchCountries()

import { useState, useEffect, useContext } from "react"
import useBreedList from './useBreedList.js'
import Results from "./Results.jsx"
import ThemeContext from "./ThemeContext.jsx"

const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"]

export default function SearchParams() {
    
    const [location, setLocation] = useState("")
    const [animal, setAnimal] = useState("")
    const [breed, setBreed] = useState("")
    const [pets, setPets] = useState([])
    const [breeds] = useBreedList(animal)
    const [ theme, setTheme ] = useContext(ThemeContext)


    useEffect(() => {
        requestPets()
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    async function requestPets() {
        const res = await fetch(`http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`)
        const data = await res.json()

        setPets(data.pets)
    }


    function changeLocation(event) {
        setLocation(event.target.value)
    }

    function changeAnimal(event) {
        setAnimal(event.target.value)
        setBreed("")
    }

    function changeBreed(event) {
        setBreed(event.target.value)
    }

    function changeTheme(event) {
        setTheme(event.target.value)
    }

    function submitForm(event) {
        event.preventDefault();
        requestPets()
    }


    return (
        <div className="search-params">
            <div className="form-container">
            <form onSubmit={submitForm}>
                    <label htmlFor="location">
                        Location
                        <input
                            id="location"
                            value={location}
                            placeholder="Location"
                            onChange={changeLocation}
                        />
                    </label>

                    <label htmlFor="animal">
                        Animal
                        <select
                            id="animal"
                            value={animal}
                            onChange={changeAnimal}
                            onBlur={changeAnimal} >
                            
                                {/* option 1 (first one is always selected by default )*/}
                                <option></option>

                                {/* rest of the options */}
                                {ANIMALS.map(animal => {
                                    return (
                                        <option key={animal} value={animal}>
                                            {animal
                                        }</option>
                                    )
                                })} 
                        </select>
                    </label>

                    <label htmlFor="breed">
                        Breed
                        <select
                            disabled={!breeds.length}
                            id="breed"
                            value={breed}
                            onChange={changeBreed}
                            onBlur={changeBreed} >

                                <option></option>
                                {breeds.map((breed) => (
                                <option key={breed} value={breed}>
                                    {breed}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label htmlFor="theme">
                        Theme
                        <select
                            value = {theme}
                            onChange = {changeTheme}
                            onBlur = {changeTheme}
                        >
                            <option value="peru">Peru</option>
                            <option value="darkblue">Dark Blue</option>
                            <option value="#2EC9FF">Light Blue</option>
                            <option value="brown">Brown</option>
                            <option value="#9246FF">Medium Velvet</option>
                            <option value="#FF2153">Hot Pink</option>
                        </select>
                    </label>

                <button style={ {backgroundColor: theme} } >Search</button>
            </form>
            
            </div>
            <h2 className="all-pets" style={ {borderBottom: `2px solid ${theme}`} }>All Pets</h2>
            <Results pets={pets} />

        </div>
    )
}
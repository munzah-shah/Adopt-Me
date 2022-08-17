import Pet from './Pet.jsx'

export default function Results({ pets }) {


    return (
        <div>
            
            {
                !pets.length ?
                (
                    <h1>No Pets Found</h1>
                ) : 
                (
                    pets.map((pet) => (
                        <Pet
                            id={pet.id}
                            name = {pet.name}
                            animal = {pet.animal}
                            breed = {pet.breed}
                            images = {pet.images}
                            location = {`${pet.city}, ${pet.state}`}
                            key = {pet.id}
                        />
                    ))
                )
            }
        </div>
    )
}
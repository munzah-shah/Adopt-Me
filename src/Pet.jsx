import { Link } from "react-router-dom"

export default function Pet(props) {

    let hero = "http://pet-images.dev-apis.com/pets/none.jpg"

    if(props.images.length) {
        hero = props.images[0]
    }

    return (
        <div>
            <Link to={`/details/${props.id}`} className="pet">
                <div className="image-container">
                    <img src={hero} alt={props.name}></img>
                </div>
                <div className="info">
                    <h1>{props.name}</h1>
                    <h2>{props.animal} - {props.breed} - {props.location}</h2>
                </div>
            </Link>
        </div>
    )
}
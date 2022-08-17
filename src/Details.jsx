import { useParams } from "react-router-dom"
import { Component, useContext } from "react"
import Carousel from "./Carousel.jsx"
import ErrorBoundary from "./ErrorBoundary.jsx"
import ThemeContext from "./ThemeContext.jsx"
import Modal from './Modal.jsx'


// Class Based React 
class Details extends Component {

    state = { loading: true, showModal: false}

    async componentDidMount() {
        const res = await fetch(`http://pets-v2.dev-apis.com/pets?id=${this.props.params.id}`)
        const data = await res.json()

        this.setState(Object.assign(
            {loading: false},
            data.pets[0]
        ))
    }

    toggleModal = () => {
        this.setState({showModal: !this.state.showModal})
    }

    render() {
        if(this.state.loading) {
            return <h2>Loading...</h2>
        }

        
        const {animal, breed, city, state, description, name, images, showModal} = this.state

        return (
            <div className="details">
                <Carousel images={images} />
                <div>
                    <h1>{name}</h1>
                    <h2>
                        {animal} - {breed} - {city}, {state}
                    </h2>

                    {/* hard way - Giving button the color with theme consumer
                    <ThemeContext.Consumer>
                        {
                            ([theme]) => (
                                <button style={ {backgroundColor: theme } }>Adopt {name}</button>
                            )
                        }
                    </ThemeContext.Consumer> */}

                    {/* easy way - Giving button the color with theme consumer*/}
                    <button style={ {backgroundColor: this.props.theme } } onClick={this.toggleModal} > Adopt {name}</button>
                    <p>{description}</p>

                    {/* logic for show modal */}
                    {
                        showModal ? (
                            <Modal>
                                <div>
                                    <h2>Would you like to adopt {name}?</h2> 
                                    <div className="buttons">
                                        <a href="https://bit.ly/pet-adopt" target="_blank" rel="noreferrer" style={ {backgroundColor: this.props.theme } }>Yes</a>
                                        <button onClick={this.toggleModal} style={ {backgroundColor: this.props.theme } }>No</button>
                                    </div>
                                </div>
                            </Modal>
                        ) : null
                    }
                </div>
            </div>
        )
    }
}

function WrappedDetails() {

    const params = useParams()
    const [theme] = useContext(ThemeContext)

    return(
        <ErrorBoundary>
            <Details params = {params} theme = {theme} />
        </ErrorBoundary>
    )
}

export default WrappedDetails;













//Function Based React
// export default function Details() {

//     const { id } = useParams()
//     return (
//         <div>
//             <h2>hi, this is details page! and i have an id of: {id}</h2>
//         </div>
//     )
// }
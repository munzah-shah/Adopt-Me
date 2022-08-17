import { useState, useEffect, useDebugValue } from "react";

const localCache = {}

export default function useBreedList(animal) {
    const [breedList, setBreedList] = useState([])
    const [status, setStatus] = useState("unloaded")
    useDebugValue("Number of values in the local Cache rn: " +Object.keys(localCache).length)

    useEffect(() => {
        if(!animal) {
            setBreedList([])
        }
        else if(localCache[animal]) {
            setBreedList[localCache[animal]]
        }
        else {
            requestBreedList()
        }

        async function requestBreedList() {
            setBreedList([])
            setStatus("loading")
            const res = await fetch(`https://pets-v2.dev-apis.com/breeds?animal=${animal}`)
            const data = await res.json()

            localCache[animal] = data.breeds || [];
            setBreedList(localCache[animal]);
            setStatus("loaded");
        }
    }, [animal])

    return [breedList, status]
}

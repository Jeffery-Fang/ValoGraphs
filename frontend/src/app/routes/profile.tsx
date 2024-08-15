import { useParams } from 'react-router-dom'

function App() {
    const { name, tag } = useParams()

    return (
        <>
            <div>{name}</div>
            <div>{tag}</div>
        </>
    )
}

export default App

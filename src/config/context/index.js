import { createContext } from "react"

const UserContext = createContext()

const Context = () => {
    <UserContext.Provider>
        <h2>hello</h2>
    </UserContext.Provider>
}

export default Context
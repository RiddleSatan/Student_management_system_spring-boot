import { createContext, useState } from "react";


export const MyContext=createContext();

export const ContextProvider = ({ children }) => {
    const [value, setValue] = useState([]);
    const [edit,setEdit]=useState({
         name: "",
    age: "",
    email: "",
    courseId: "",
    });
    const [course,setCourse]=useState([])

    return (
        <MyContext.Provider value={{ setValue, value,edit,setEdit,setCourse,course }}>
            {children}
        </MyContext.Provider>
    );
}


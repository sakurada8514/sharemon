import axios from "axios";
import react from "react";

const List1 = () => {
    return (
        <div>
            <button onClick={logout}>logout</button>
        </div>
    );
};

function logout() {
    axios.get("/api/logput").then((res) => {
        console.log(res);
    });
}

export default List1;

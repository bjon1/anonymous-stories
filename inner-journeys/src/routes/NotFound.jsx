import { Link } from "react-router-dom";

const NotFound = () => {

    return(
        <div>
            Not Found
            <Link to='/'>
                <button>Back Home</button>
            </Link>
        </div>
    )
}

export default NotFound;
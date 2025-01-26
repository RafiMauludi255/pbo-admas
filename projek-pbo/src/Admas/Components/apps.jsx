import { Link } from "react-router-dom"

export default function Apps({ data1, data2 }) {
    return (
        <div className="btnApp">
            <Link to="/pages/cuti"><button>{data1}</button></Link>
            <Link to="/pages/izin"><button style={{border: "1px solid #1bacea", color: "#1bacea", background: "transparent"}}>{data2}</button></Link>
        </div>
    )
}
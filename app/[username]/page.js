import REact from "react"

const Username = ({params}) => {
    return (
        <div className="text-white">
           { params.Username}
        </div>
    )
}

export default Username;
export default function Image (props) {
    const {src, job} = props;

    return (
        <img
            src={src}
            onError={(err) => err.target.setAttribute("src", "./img/error.png")}
            alt={job}
        />
    )
}
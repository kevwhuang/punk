export default function Remove(props) {
    return (
        <i
            className="material-symbols-outlined beer__delete"
            onClick={() => props.removeBeer(props.id)}>
            delete
        </i>
    );
}

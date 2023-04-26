export default function Favorite(props) {
    return (
        <i
            className={props.isFavorite
                ? 'material-symbols-outlined beer__heart--filled'
                : 'material-symbols-outlined beer__heart'}
            onClick={() => props.favoriteBeer(props.id)}>
            favorite
        </i>
    );
}

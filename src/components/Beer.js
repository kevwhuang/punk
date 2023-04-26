import Favorite from './Favorite';
import Remove from './Remove';

function Beer(props) {
    const { inventory, filter, heartView, setInventory } = props;
    let display = [...inventory];

    if (heartView) {
        display = display.filter(e => e.isFavorite);
    }

    if (filter) {
        const search = [];

        for (const e of display) {
            const nameShort = e.name.indexOf(' ') === -1
                ? e.name : e.name.slice(0, e.name.indexOf(' '));

            nameShort.toLowerCase().includes(filter.toLowerCase().trim()) && search.push(e);
        }

        display = [...search];
    }

    function removeBeer(id) {
        const copy = [...inventory];

        for (let i = 0; i < copy.length; i++) {
            if (copy[i].id === id) {
                copy.splice(i, 1);
                setInventory([...copy]);
                break;
            }
        }
    }

    function favoriteBeer(id) {
        const copy = [...inventory];

        for (let i = 0; i < copy.length; i++) {
            if (copy[i].id === id) {
                copy[i].isFavorite = !copy[i].isFavorite;
                setInventory([...copy]);
                break;
            }
        }
    }

    return (
        <main>
            <ul>
                {display.map((beer, i) => {
                    const { id, name, date, ibu, abv, tag, summary, image, isFavorite } = beer;
                    const nameShort = name.indexOf(' ') === -1 ? name : name.slice(0, name.indexOf(' '));
                    const tagShort = tag.length <= 50 ? tag : `${tag.slice(0, tag.indexOf(' ', 40))} …`;

                    return (
                        <li className="beer" key={i}>
                            <Remove id={id} removeBeer={removeBeer} />
                            <Favorite id={id} isFavorite={isFavorite} favoriteBeer={favoriteBeer} />
                            <img className="beer__image" src={image} alt={tag} title={summary} />
                            <div className="beer__info">
                                <p className="beer__info--title">{nameShort}</p>
                                <p className="beer__info--date">
                                    sku {id.toString().padStart(3, '0')} | since {date.slice(-4)}
                                </p>
                                <p className="beer__info--stats">IBU {ibu} / ABV {abv}</p>
                                <p className="beer__info--tag">{tagShort.replaceAll('.', '')}</p>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </main>
    );
}

export default Beer;

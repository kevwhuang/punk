import React from 'react';
import axios from 'axios';

axios.defaults.baseURL = 'https://api.punkapi.com/v2/beers';

function Beer() {
    const [inventory, setInventory] = React.useState([]);

    React.useEffect(() => {
        const beers = [];

        axios.all(
            [
                axios('?page=1&per_page=80'),
                axios('?page=2&per_page=80'),
                axios('?page=3&per_page=80'),
                axios('?page=4&per_page=80'),
                axios('?page=5&per_page=80'),
            ])
            .then(res => {
                console.log(`Remaining limit: ${res[0].headers['x-ratelimit-remaining']}`);
                return res;
            })
            .then(axios.spread((...res) => {
                for (const e of res) {
                    for (const data of e.data) {
                        beers.push({
                            id: data.id,
                            name: data.name,
                            date: data.first_brewed,
                            ibu: data.ibu,
                            abv: data.abv,
                            tag: data.tagline,
                            summary: data.description,
                            image: data.image_url ?? 'https://images.punkapi.com/v2/keg.png',
                        });
                    }
                }
            }))
            .then(() => setInventory(beers))
            .catch(err => console.log(err.response.data));
    }, []);

    return (
        <main>
            <ul>
                {inventory.map((beer, i) => {
                    const { id, name, date, ibu, abv, tag, summary, image } = beer;
                    const nameShort = name.indexOf(' ') === -1 ? name : name.slice(0, name.indexOf(' '));
                    const tagShort = tag.length <= 50 ? tag : `${tag.slice(0, tag.indexOf(' ', 40))} …`;

                    return (
                        <li className="beer" key={i}>
                            <i className="material-symbols-outlined beer__delete">
                                delete
                            </i>
                            <i className="material-symbols-outlined beer__heart">
                                favorite
                            </i>
                            <img className="beer__image" src={image} alt={tag} title={summary} />
                            <div className="beer__info">
                                <p className="beer__info--title">{nameShort}</p>
                                <p className="beer__info--date">sku {id.toString().padStart(3, '0')} |
                                    since {date.slice(-4)}
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

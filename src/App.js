import React from 'react';
import axios from 'axios';

import Beer from './components/Beer';
import Copyright from './components/Copyright';
import Navbar from './components/Navbar';

axios.defaults.baseURL = 'https://api.punkapi.com/v2/beers';

function App() {
    const [inventory, setInventory] = React.useState([]);
    const [filter, setFilter] = React.useState('');
    const [heartView, setHeartView] = React.useState(false);

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
                console.log(`Requests remaining: ${res[0].headers['x-ratelimit-remaining']}`);
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
                            isFavorite: false,
                        });
                    }
                }
            }))
            .then(() => setInventory(beers))
            .catch(err => console.log(err.response.data));
    }, []);

    return (
        <>
            <Navbar
                inventory={inventory}
                heartView={heartView}
                setInventory={setInventory}
                setFilter={setFilter}
                setHeartView={setHeartView}
            />
            <Beer
                inventory={inventory}
                filter={filter}
                heartView={heartView}
                setInventory={setInventory}
            />
            <Copyright />
        </>
    );
}

export default App;
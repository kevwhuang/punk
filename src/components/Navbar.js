import { useState } from 'react';

import logo from '../media/punk.ico';

function Navbar(props) {
    const { inventory, heartView } = props;
    const { setInventory, setFilter, setHeartView } = props;
    const [sortSkuDirection, setSortSkuDirection] = useState('desc');
    const [sortYearDirection, setSortYearDirection] = useState('desc');

    function filterBeer(event) {
        setFilter(event.target.value);
    }

    function sortSku() {
        const copy = [...inventory];

        if (sortSkuDirection === 'asc') {
            copy.sort((a, b) => a.id > b.id ? 1 : -1);
            setSortSkuDirection('desc');
        } else {
            copy.sort((a, b) => a.id < b.id ? 1 : -1);
            setSortSkuDirection('asc');
        }

        setInventory([...copy]);
    }

    function sortYear() {
        const copy = [...inventory];

        if (sortYearDirection === 'asc') {
            copy.sort((a, b) => a.year > b.year ? 1 : -1);
            setSortYearDirection('desc');
        } else {
            copy.sort((a, b) => a.year < b.year ? 1 : -1);
            setSortYearDirection('asc');
        }

        setInventory([...copy]);
    }

    function toggleFavorites() {
        setHeartView(!heartView);
    }

    return (
        <nav>
            <ul className="navbar">
                <input
                    className="navbar__search"
                    placeholder="search by name …"
                    maxLength="20"
                    onChange={filterBeer}
                />
                <button
                    className="navbar__sort-sku"
                    onClick={sortSku}>
                    Sort by SKU
                </button>
                <button
                    className="navbar__sort-year"
                    onClick={sortYear}>
                    Sort by Year
                </button>
                <button
                    className={heartView ? 'navbar__favorites active' : 'navbar__favorites'}
                    onClick={toggleFavorites}>
                    Favorites
                </button>
                <a
                    href="https://punkapi.com/documentation/v2"
                    title="Powered by Punk API"
                    target="_blank">
                    <img className="navbar__logo" src={logo} alt="Logo of Punk API." />
                </a>
            </ul>
        </nav>
    );
}

export default Navbar;

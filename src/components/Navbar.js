import logo from '../media/punk.ico';

function Navbar() {
    return (
        <nav >
            <ul className="navbar">
                <input className="navbar__search" placeholder="search by name ..." maxLength="20" />
                <button className="navbar__sort-sku">
                    Sort by SKU
                </button>
                <button className="navbar__sort-year">
                    Sort by Year
                </button>
                <button className="navbar__favorites">
                    Favorites
                </button>
                <a href="https://punkapi.com/documentation/v2"
                    title="Powered by Punk API"
                    target="_blank">
                    <img className="navbar__logo" src={logo} alt="" />
                </a>
            </ul>
        </nav>
    );
}

export default Navbar;

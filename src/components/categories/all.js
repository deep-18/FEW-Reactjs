import ProductList from '../productList';
import Categories from '../categories';
import Header from '../header';
import Random from '../../utils/masonry';

const All = (e) => {
    const colormain = "#683E2D";
    return (
        <div className="section" style={{backgroundColor: "#683E2D"}}>
            <div className="overlay-all">
                <Header color="white"/>
                <Categories />
                <ProductList  className="All" name="product" colorR="#683E2D"/>
            </div>
        </div>
    );
}
export default All;
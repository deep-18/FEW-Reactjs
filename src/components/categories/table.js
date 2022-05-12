import ProductList from '../productList';
import Categories from '../categories';
import Header from '../header';
import Random from '../../utils/masonry';
const Table = () => {
    const colorR = "#411811";
    return (
        <div className="section" style={{backgroundColor: colorR, transition: "ease-in-out"}}>
            <div className="overlay-all" style={{backgroundColor: "#411811"}}>
                <Header color="white"/>
                <Categories />
                <ProductList name="table" colorR={colorR}/>
            </div>
        </div>
    );
}
export default Table;
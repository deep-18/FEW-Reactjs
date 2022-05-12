import ProductList from '../productList';
import Categories from '../categories';   
import Header from '../header';
import Random from '../../utils/masonry';
const Bed = () => {
    const colorR = "#411811";
    return (
        <div className="section" style={{backgroundColor: "#411811"}}>
            <div className="overlay-all" style={{backgroundColor: "#411811"}}>
                <Header color="white"/>
                <Categories />
                <ProductList name="bed" colorR="#411811"/>            
            </div>
        </div>
    );
}
export default Bed;
import ProductList from '../productList';
import Categories from '../categories';
import Header from '../header';
import Random from '../../utils/masonry';
const Sofa = () => {
    const colorR = "#C47878";
    return (
        <div className="section" style={{backgroundColor: colorR}}>
            <div className="overlay-all" style={{backgroundColor: "#C47878"}}>
                <Header color="white"/>
                <Categories />
                <ProductList name="sofa" colorR={colorR}/>
            </div>
        </div>
    );
}
export default Sofa;
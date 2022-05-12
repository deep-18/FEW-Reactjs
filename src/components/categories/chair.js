import ProductList from '../productList';
import Categories from '../categories';
import Header from '../header';
import Random from '../../utils/masonry';
const Chair = () => {
    const colorR = "#411811";
    return (
        <div className="section" style={{backgroundColor: colorR}}>
            <div className="overlay-all" style={{backgroundColor: "#411811"}}> 
                <Header color="white"/>
                <Categories />
                <ProductList name="chair" colorR={colorR}/>
            </div>
        </div>
    );
}
export default Chair;
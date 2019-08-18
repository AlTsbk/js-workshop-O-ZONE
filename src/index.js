import getData from './modules/getData';
import renderCards from './modules/renderCards';
import checkboxToggle from './modules/checkboxToggle';
import cartToggle from './modules/cartToggle';
import addGoods from './modules/addGoods';
import actionPage from './modules/actionPage';
import renderCatalog from './modules/renderCatalog';

(async function(){
    const data = await getData();
    renderCards(data);
    checkboxToggle();
    cartToggle();
    addGoods();
    actionPage();
    renderCatalog();

}());
    
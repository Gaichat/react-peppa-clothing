import React from "react";
import SHOP_DATA from "./shop.data";
import CollectionPreview from "../../components/collection-preview/collection-preview.component";

class ShopPage extends React.Component {
    //we need to have access to state in constructor -> pass props as parameter
    constructor(props) {
        super(props);
        this.state = {
            collections: SHOP_DATA
        }
    }

    render() {
        const {collections} = this.state;
        return (
            <div className='shop-page'>
                {collections
                    .map(({id, ...OtherCollectionsProps}) => (
                    <CollectionPreview key={id} {...OtherCollectionsProps} />
                    )
                )}
            </div>
        )
    }
}
export default ShopPage;
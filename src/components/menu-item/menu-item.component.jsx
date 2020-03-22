import React from 'react';
import './menu-item.styles.scss';
import { withRouter } from 'react-router-dom';
/*match.url
* with match url, you dont need to hardcode your url,
* it is useful if you want to dynamically rebuild full route,
currently the it only nested 1 level deep, where the match url is empty string,
* the utility is much obvious if we have nested route like /a/b/c/d and if you want to route to /e
without match url, you cannot rebuild your route dynamically and route to
* the correct page, you have to hardcode it instead, or else you only route to /e but not /a/b/c/d/e
* */

const MenuItem = ({title, imageUrl, size, linkUrl, match, history}) => (
    <div className={`${size} menu-item`} onClick={() => (history.push(`${match.url}${linkUrl}`))}>
        <div style={{
            backgroundImage: `url(${imageUrl})`
        }} className='background-image'>
        </div>
        <div className='content'>
            <h1 className='title'>{title.toUpperCase()}</h1>
            <span className='subtitle'>SHOP NOW</span>
        </div>
    </div>
);

export default withRouter(MenuItem);
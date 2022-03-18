import React, { useState } from 'react';
import { Menu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

function MenuBar() {
    //stores the value of the highlighted tab
  const pathname = window.location.pathname;
    //populates a variable with the path of the current url within the browser
  const path = pathname === '/' ? 'home' : pathname.substring(1);
  // defines the path variable, removing the first character, and translating the "/" path to "home"
  const [activeItem, setActiveItem] = useState(path);
  // highlights the correct tab based on the page, using the path variable
  const handleItemClick = (e, { name }) => setActiveItem(name);



    return (

        <Menu pointing secondary size="massive" color="blue">
          <Menu.Item
            name='home'
            //defines the name of the tab
            active={activeItem === 'home'}
            //populates the activeItem variable
            onClick={handleItemClick}
            as={Link}
            // gives us the ability to make use of the React link function
            to="/"
            // 
          />

          <Menu.Menu position='right'>
         <Menu.Item
            name='login'
            active={activeItem === 'login'}
            onClick={handleItemClick}
            as={Link}
            to="/login"
          />
          <Menu.Item
            name='register'
            active={activeItem === 'register'}
            onClick={handleItemClick}
            as={Link}
            to="/register"
          />
          </Menu.Menu>
        </Menu>

    )
}
export default MenuBar;

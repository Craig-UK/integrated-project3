import React, { useContext, useState } from 'react';
import { Header, Menu, Image, MenuMenu } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import pic from '../components/GCU-SOCIAL-LOGO3.png';
import { AuthContext } from '../context/auth';

function MenuBar() {
  const { user, logout } = useContext(AuthContext);
  //stores the value of the highlighted tab
  const pathname = window.location.pathname;
  //populates a variable with the path of the current url within the browser
  const path = pathname === '/' ? 'home' : pathname.substring(1);
  // defines the path variable, removing the first character, and translating the "/" path to "home"
  const [activeItem, setActiveItem] = useState(path);
  // highlights the correct tab based on the page, using the path variable
  const handleItemClick = (e, { name }) => setActiveItem(name);

  const menuBar = user ? (
    
    <Menu pointing secondary size="massive" color="black">
          <Menu.Item>
            <Image
            name='home'
            src={pic}
            size="small"
            //defines the name of the tab
            active={activeItem === 'dash'}
            as={Link}
            // gives us the ability to make use of the React link function
            to="/dash"
            // 
            />
            </Menu.Item>
          <Menu.Menu position='right' style={{bottom: '0.8em'}}>
         <Menu.Item
            name={user.username}
            active={activeItem === 'user'}
            as={Link}
            // gives us the ability to make use of the React link function
            to="/user"
          />

         <Menu.Item
            name='logout'
            onClick={logout}
          />
          </Menu.Menu>
        </Menu>

  ) : (
    <Header>
    <Menu pointing secondary size="massive" color="black">
          <Menu.Item>
      <Image
      name='home'
      src={pic}
      size="tiny"
      //defines the name of the tab
      active={activeItem === 'dash'}
      as={Link}
      // gives us the ability to make use of the React link function
      to="/dash"
      // 
      />
     </Menu.Item>

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
        </Header>
  )

  return menuBar;
}
export default MenuBar;

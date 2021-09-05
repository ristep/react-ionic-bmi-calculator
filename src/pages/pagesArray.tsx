
import { heartOutline, heartSharp, homeOutline, homeSharp, informationOutline, informationSharp, logInOutline, logInSharp } from 'ionicons/icons';
import About from './About';
import Favorites from './Favorites';
import Home from './Home';
import Login from './Login';

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
  component: JSX.Element;
}

export const pagesArray: AppPage[] = [
  {
    title: 'Home',
    url: '/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
    component: <Home /> 
  },
  {
    title: 'About',
    url: '/About',
    iosIcon: informationOutline,
    mdIcon: informationSharp,
    component: <About />
  },
  {
    title: 'Favorites',
    url: '/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
    component: <Favorites />
  },
  {
    title: 'Login',
    url: '/Login',
    iosIcon: logInOutline,
    mdIcon: logInSharp,
    component: <Login />
  }
];

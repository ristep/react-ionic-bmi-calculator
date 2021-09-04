
import { heartOutline, heartSharp, homeOutline, homeSharp, informationOutline, informationSharp, logInOutline, logInSharp } from 'ionicons/icons';

interface AppPage {
  url: any ;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

export const appPages: AppPage[] = [
  {
    title: 'Home',
    url: '/Home',
    iosIcon: homeOutline,
    mdIcon: homeSharp,
  },
  {
    title: 'About',
    url: '/About',
    iosIcon: informationOutline,
    mdIcon: informationSharp,
  },
  {
    title: 'Favorites',
    url: '/Favorites',
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
  {
    title: 'Login',
    url: '/Login',
    iosIcon: logInOutline,
    mdIcon: logInSharp,
  }
];

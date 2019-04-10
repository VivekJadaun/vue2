import StocksGrid from "./components/StocksGrid.vue";
import PortfolioGrid from "./components/PortfolioGrid.vue";
import Overview from "./components/Overview.vue";

export const routes = [
    { path: '', component: Overview, name: 'home' },
    { path: '/portfolio', component: PortfolioGrid, name: 'portfolio' },
    { path: '/stocks', component: StocksGrid, name: 'stocks' },
    { path: '*', redirect: { name: 'home' } }
];
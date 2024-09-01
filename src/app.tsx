import './style.css';
import {createRoot} from "react-dom/client";
import { Header } from './components/header/index';
import { Footer } from './components/footer';
import { Main } from './components/main';

const rootElement = document.getElementById('root');

const root = createRoot(rootElement)
root.render(
    <div className='layout'>
        <Header/>
        <Main/>
        <Footer/>
    </div>
)
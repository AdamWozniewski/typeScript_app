import * as express from 'express';
import * as bodyParser from 'body-parser';
import { IndexRoute } from './routes/index';
import { ProductsRoutes } from './routes/products';

import * as path from 'path';

export class Server {
    private app: express.Express;

    constructor() {
        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({
            extended: true
        }));

        this.setRoutes();
        this.setStaticRoutes();
    }

    private setRoutes() {
        const router: express.Router = express.Router();
        // router.use(IndexRoute.routes('/'));
        router.use(ProductsRoutes.routes('/products'));
        this.app.use(router);
    }

    private setStaticRoutes() {
        this.app.use('/node_modules', express.static(
            path.join(__dirname, '../node_modules')
        ));

        this.app.use(express.static(
            path.join(__dirname, '../client')
        ))
    }

    // Statyczna metoda do uruchonienia aplikacji
    public static bootstrap() : Server {
        return new Server();
    }

    // metoda służąca jedynie dla tej statycznej za start na zadanym porcie
    startServer() {
        this.app.listen(3000, () => {
            console.log("Aplikacja działa na porcie 3000");
        })
    }
}
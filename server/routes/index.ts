import { Router, Response, Request } from 'express';

export class IndexRoute {

    public static routes(nameOfHome: string): Router {
        let router : Router = Router();
        let indexRoute: IndexRoute = new IndexRoute();
        router.get(nameOfHome, indexRoute.index.bind(indexRoute));
        return router; // zwraca nazwę strony w postaci obiektu express.Router()
    }

    public index(req: Request, res: Response){
        res.send("hello Wurld!11!!")
    }
}
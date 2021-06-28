import { Request, Response } from 'express';

class IndexController {

    index (req: Request, res: Response) {
        res.json({'text': 'API Is /api/games'});
    }

}

export const indexController = new IndexController(); //Una forma de exportar la constante
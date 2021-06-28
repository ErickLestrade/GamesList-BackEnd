import { Request, Response } from 'express';

import pool from '../database';

class GamesController {

    public async list (req: Request, res: Response): Promise<void> {
        pool.query('SELECT * FROM games', function (err, result, fields) {
            if (err)
                throw err;
            res.json(result);
        }); //crea un query donde sí existe un error, lo arroja, en caso de que no crea el json
    }

    public async getOne (req: Request, res: Response): Promise<any>{    //el método puede o no devolver un resultado
        const { id } = req.params;
        pool.query('SELECT * FROM games WHERE id = ?', [id], function (err, result, fields) {
            if (err)
                throw err;
            if (result.length > 0) {
                console.log(result[0]);
                return res.json(result[0]);
            }
            res.status(404).json({text: "The game doesn't exist"});
        }); //crea un query donde sí existe un error, lo arroja, en caso de que no crea el json
    }

    public async create (req: Request, res: Response):  Promise<void>{ //para definir el método como void, pues no regresa nada, más no es necesario
        pool.query('INSERT INTO games set ?', [req.body]);
        res.json({message: 'Game Saved'});
    }

    public async delete(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        pool.query('DELETE FROM games WHERE id = ?', [id], function (err, result, fields) {
            if (err)
                throw err;
            res.json({message: 'The game was deleted'});
        }); //crea un query donde sí existe un error, lo arroja, en caso de que no crea el json
    }

    public async update(req: Request, res: Response): Promise<void>{
        const { id } = req.params;
        pool.query('UPDATE games SET ? WHERE id = ?', [req.body,id], function (err, result, fields) {
            if (err)
                throw err;
            res.json({message: 'The game was updated'});
        }); //crea un query donde sí existe un error, lo arroja, en caso de que no crea el json
    }
}

const gamesController = new GamesController();
export default gamesController;
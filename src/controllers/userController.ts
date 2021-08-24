import { Request, Response } from 'express';
import { User } from '../models/User';

export const nome = (req: Request, res: Response) => {
    let nome: string = req.query.nome as string;
    let idade: string = req.query.idade as string;

    res.render('pages/nome', {
        nome,
        idade
    });
};

export const idadeForm = (req: Request, res: Response) => {
    res.render('pages/idade');
};

export const idadeAction = (req: Request, res: Response) => {
    let mostrarIdade: boolean = false;
    let idade: number = 0;

    if(req.body.ano) {
        let anoNascimento: number = parseInt(req.body.ano as string);
        let anoAtual: number = new Date().getFullYear();
        idade = anoAtual - anoNascimento;
        mostrarIdade = true;
    }

    res.render('pages/idade', {
        idade,
        mostrarIdade
    });
};

export const store = async (req: Request, res: Response) => {
    if(req.body.name) {
        let name = req.body.name as string;
        let age: number = parseInt(req.body.age as string);

        let newUser = User.build({name});

        if(age && !isNaN(age)) {
            newUser.age = age;
        }

        try {
            await newUser.save();
        } catch (e) {
            console.log('Erro ao inserir o usuário: ', e);
        }
    }

    res.redirect('/');
}
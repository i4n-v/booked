import React from 'react';
import { Container, Typography } from '@mui/material';
import FaqCard from '../../components/FacCard';


import { Box, styled } from "@mui/material";

const FaqScreen = styled(Box)(({ theme }) => ({
    overflowY: 'auto', // Adiciona scroll caso a altura dos cards ultrapasse a altura do elemento pai
    padding: "10px 68px",
    width: '100%',

    "& > .title": {
        maxWidth: "1400px",
        font: theme.font.xl,
        color: theme.palette.secondary.dark,
        padding: '100px 0px 40px 0px',
        justifyContent: 'flex-start',
        zIndex: 2,
    },
    [theme.breakpoints.down("md")]: {
        "& > .title": {
            font: theme.font.lg,
            maxWidth: "600px",
        },
    },
    [theme.breakpoints.down("sm")]: {
        "& > .title": {
            font: theme.font.md,
            maxWidth: "400px",
        },
    },
}));

const faqs = [
    {
        question: 'Como posso recuperar minha senha?',
        answer: 'Na página de login, haverá uma opção para recuperação da sua senha, onde pediremos seu e-mail para recuperação da senha.',
    },
    {
        question: 'Como posso entrar em contato?',
        answer: 'Através de e-mail ou pela solução de dúvidas comuns expostas na plataforma.',
    },
    {
        question: 'O que acontece com meus dados?',
        answer: 'Nós garantimos a privacidade e segurança de seus dados. Eles serão utilizados apenas para fins de operação da plataforma e nunca serão compartilhados com terceiros sem sua autorização.',
    },
    {
        question: 'Como aumentar a visibilidade dos meus livros publicados?',
        answer: '...',
    },
    {
        question: 'Qualquer usuário pode ler meus livros?',
        answer: 'Sim, qualquer usuário da plataforma pode ler seus livros publicados. No entanto, os usuários precisam estar logados na plataforma para acessar o conteúdo dos livros.',
    },
    {
        question: 'Como consigo lucrar com meus livros?',
        answer: 'Para lucrar com seus livros na plataforma, você pode optar por disponibilizá-los gratuitamente ou cobrar um valor determinado por você. ',
    },
    {
        question: 'Outro problema?',
        answer: '...',
    },
];



const Questions: React.FC = () => {
    return (
        <div style={{
            height: '976px',
            display: 'flex',
            justifyContent: 'flex-start',

        }} >
            <FaqScreen >
                <Typography component="h1" className='title'>
                    Dúvidas frequentes
                </Typography>
                {faqs.map((faq, index) => (
                    <FaqCard key={index} question={faq.question} answer={faq.answer} color={index % 2 === 0 ? 'white' : 'grey.300'} />
                ))}
            </FaqScreen>
        </div>
    );
};

export default Questions;

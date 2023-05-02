import React from 'react';
import { Container, Typography } from '@mui/material';
import FaqCard from '../../components/FacCard';

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
        question: 'Posso ler os livros diretamente na plataforma?',
        answer: 'Sim, a plataforma possui um leitor de livros integrado, permitindo que você leia os livros sem precisar baixá-los ou abrir em outro aplicativo.',
    },
    {
        question: 'Qualquer usuário pode ler meus livros?',
        answer: 'Sim, qualquer usuário da plataforma pode ler seus livros publicados. No entanto, os usuários precisam estar logados na plataforma para acessar o conteúdo dos livros.',
    },
    {
        question: 'Como consigo lucrar com meus livros?',
        answer: 'Para lucrar com seus livros na plataforma, você pode optar por disponibilizá-los gratuitamente ou cobrar um valor determinado por você. ',
    },
];

const Questions: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
            width: '100vw',
            /* backgroundColor: "grey" */

        }} >
            <Container   >
                <Typography variant="h4" component="h1"
                    sx={{
                        font: (t) => t.font.xl,
                        color: (t) => t.palette.secondary.dark,
                        mb: 4,
                    }}>
                    Dúvidas frequentes
                </Typography>

                {faqs.map((faq, index) => (
                    <FaqCard key={index} question={faq.question} answer={faq.answer} color={index % 2 === 0 ? 'white' : 'grey.300'} />
                ))}
            </Container>
        </div>
    );
};

export default Questions;

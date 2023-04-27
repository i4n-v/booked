import React from 'react';
import { Container, Typography } from '@mui/material';
import FaqCard from '../../components/QuestionCard';

const faqs = [
    {
        question: 'Como posso recuperar minha senha?',
        answer: 'Na página de login, haverá uma opção para recuperação da sua senha, onde pediremos seu e-mail para recuperação da senha.',
    },
    {
        question: 'Como posso entrar em contato?',
        answer: '',
    },
    {
        question: 'O que acontece com meus dados?',
        answer: '',
    },
    {
        question: 'Como aumentar a visibilidade dos meus livros publicados?',
        answer: '',
    },
    {
        question: 'Qualquer usuário pode ler meus livros?',
        answer: '',
    },
    {
        question: 'Como consigo lucrar com meus livros?',
        answer: '',
    },
];

const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'orange'];

const Questions: React.FC = () => {
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '90vh',
            /* width: '100vw',
            backgroundColor: "grey" */

        }} >
            <Container   >
                <Typography variant="h4" component="h1"
                    sx={{
                        font: (t) => t.font.xl,
                        color: (t) => t.palette.secondary.dark,
                        mb: 4
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

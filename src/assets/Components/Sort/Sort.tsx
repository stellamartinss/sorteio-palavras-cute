'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextareaAutosize,
  TextField,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';


const INITIAL_VALUE =
  'Macacão, Chupeta, Mamãe, Titio, Banheira, Chuquinha, Manta, Trocador, Bebê, Dinda, Mordedor, Vovó, Berço, Sabonete, Moisés, Titia, Mamadeira, Macacão, Móbile, Brinquedo, Enxoval, Chocalho, Culote, Pelúcia, Dindo, Baby, Vovô, Babador, Lencinho, Manta, Leite, Cueiro, Papai, Naninha, Body, Babador, Pagão, Móbile, Sabonete, Fralda, Colinho, Algodão, Carrinho, Papinha, Sapatinho';

export const Sort = () => {
  const [inputText, setInputText] = useState(INITIAL_VALUE);
  const [selectedWord, setSelectedWord] = useState<string | null>('****');
  const [previousSelectedWords, setPreviousSelectedWords] = useState<string[]>(
    []
  );
  const [animateWord, setAnimateWord] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSort = (withAnimation: boolean) => {
    let words = inputText
      .split(',')
      .map((word) => word.trim())
      .filter((word) => word);

    if (words.length > 0) {
      const randomIndex = Math.floor(Math.random() * words.length);
      const randomWord = words[randomIndex];

      words = words.filter((item) => item !== randomWord);
      setInputText(words.join(',').replaceAll(' ', ''));
      setSelectedWord(randomWord);

      setPreviousSelectedWords((prev) =>
        previousSelectedWords.includes(randomWord)
          ? prev
          : [...prev, randomWord]
      );
    }
  };

  useEffect(() => {
    localStorage.setItem('PREVIOUS_SELECTED', previousSelectedWords.join(','));
  }, [previousSelectedWords]);

  return (
    <Box>
      <Dialog
        open={open}
        fullWidth={true}
        maxWidth='lg'
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle
          id='alert-dialog-title'
          style={{ backgroundColor: '#fffcf0', color: '#f48fa9' }}
        >
          Palavras a serem sorteadas
        </DialogTitle>
        <Box
          className='mx-2'
          style={{ padding: '20px', backgroundColor: '#fffcf0' }}
        >
          <TextareaAutosize
            className='px-3'
            style={{ width: '100%' }}
            placeholder='Adicione palavras separadas por vírgula'
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </Box>
        <DialogActions style={{ backgroundColor: '#fffcf0' }}>
          <Button style={{ color: '#597066' }} onClick={handleClose}>
            Fechar
          </Button>
          <Button style={{ color: '#597066' }} onClick={handleClose} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      <Box
        component='span'
        style={{
          fontSize: '10px',
          color: '#baa88e',
          fontFamily: 'monospace',
          cursor: 'pointer'
        }}
        onClick={() => handleClickOpen()}
      >
        <SettingsIcon /> 
      </Box>
      <Box component='div' sx={{ display: 'block', marginTop: '200px' }}>
        <Box className='flex flex-col items-center p-6 space-y-4'>
          {/* Exibição da palavra com animação */}
          {selectedWord && (
            <Box
              className='mt-4 w-64 text-center'
              style={{ textAlign: 'center', marginBottom: '100px' }}
            >
              <motion.div
                key={selectedWord}
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.1 }}
                transition={{ duration: 1.5 }}
              >
                <Box
                  component='span'
                  style={{
                    fontSize: '200px',
                    color: '#f48fa9',
                    fontWeight: 'bolder',
                  }}
                >
                  {selectedWord}
                </Box>
              </motion.div>
            </Box>
          )}

          {/* Botões */}
          <Box style={{ textAlign: 'center' }}>
            <Button
              style={{ color: '#597066' }}
              onClick={() => handleSort(false)}
            >
              Sortear
            </Button>
          </Box>

          {/* Histórico de palavras sorteadas */}
          <Box
            style={{
              textAlign: 'center',
              marginBottom: '10px',
              position: 'absolute',
              bottom: '10px',
            }}
          >
            <Box
              component='span'
              style={{
                fontSize: '14px',
                color: '#baa88e',
                fontFamily: 'monospace',
              }}
            >
              {previousSelectedWords.join(', ')}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

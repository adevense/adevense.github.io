import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import'./style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
function App() {
  const [senhaCorreta, setSenhaCorreta] = useState(''); // Palavra a ser digitada
  const [senhaAtual, setSenhaAtual] = useState(''); // Palavra que o usuário está digitando
  const [pontuacao, setPontuacao] = useState(0); // Pontuação do usuário
  const [tempoDecorrido, setTempoDecorrido] = useState(0); // Tempo decorrido
  const [pausado, setPausado] = useState(false); // Estado de pausa

  const palavrasAleatorias = ['coco','abacaxi', 'banana', 'morango', 'laranja', 'uva','gabriel','tribunal','barco','carro','fruta','bola','paralelepipedo','triceratopes','policial','roupa','casa','predio','coxa','orelha','calvice','manual','teste','testosterona','elevado','positivo','dinossauro','jogo','celeste','pedro','interface','fome','brasil','angola','japao','codigo','espirito','pausa','tempo','chamada','video','juvenil','anime','texto','idolo','latim','alem','tradutor','calma','casar','novamente','minutos','horas','segundos','metros','centimetros','pontos','tempo','desejo','rubi','aquamarine','jailson','alex','carlos','agora','pronto','volei','corrida','carros','ave','galinha','porco','bode','cabra','calo','caio','final','alegria','sono','triste','comeco','cobra','ajuda','trabalho','relatorio','relato','ato','rato','sapo','cavalo','amor','serie','antes','depois','latim','pneumoultramicroscopicossilicovulcanoconiotico','pneumoultramicroscopicossilicovulcanoconiose','paraclorobenzilpirrolidinonetilbenzimidazol','piperidinoetoxicarbometoxibenzofenona','dimetilaminofenildimetilpirazolona','contrarrevolucionario','desconstitucionalizar','desincompatibilizacao','desinstitucionalizado','desprofissionalizacao','desproporcionadamente','extraterritorialidade','inconstitucionalidade','inconstitucionalmente','interconfessionalismo','interdisciplinaridade','interdisciplinarmente','multidimensionalidade','multidisciplinaridade','pluridimensionalidade','pluridisciplinaridade','transdisciplinaridade','robocop']; // Lista de palavras aleatórias
  const cronometroId = useRef(null);
  const teclasRef = useRef(null);
  const bolinhasRef = useRef(null);

  useEffect(() => {
    gerarNovaPalavraCorreta();
  }, []);

  useEffect(() => {
    if (!pausado && senhaAtual.length === senhaCorreta.length && senhaAtual !== senhaCorreta) {
      setSenhaAtual('');
      gerarNovaPalavraCorreta();
    } else if (senhaAtual === senhaCorreta) {
      atualizaPontuacao();
      setSenhaAtual('');
      gerarNovaPalavraCorreta();
    }
    atualizaBolinhas();
  }, [senhaAtual]);

  useEffect(() => {
    if (!pausado) {
      cronometroId.current = setInterval(() => {
        setTempoDecorrido(prevTempo => prevTempo + 1);
      }, 1000);
    }
    return () => clearInterval(cronometroId.current);
  }, [pausado]);

  const gerarNovaPalavraCorreta = () => {
    const novaPalavra = palavrasAleatorias[Math.floor(Math.random() * palavrasAleatorias.length)];
    setSenhaCorreta(novaPalavra);
    setTempoDecorrido(0);
  };

 
const atualizaBolinhas = () => {
  if (bolinhasRef.current) {
    bolinhasRef.current.innerHTML = '';
    for (let i = 0; i < senhaCorreta.length; i++) {
      const sublinhado = document.createElement('u');
      sublinhado.textContent = senhaCorreta[i];

      if (i < senhaAtual.length) {
        if (senhaAtual[i] === senhaCorreta[i]) {
          sublinhado.classList.add('correta');
        } else {
          sublinhado.classList.add('incorreta');
        }
      }

      bolinhasRef.current.appendChild(sublinhado);
    }
  }
};

  
const atualizaPontuacao = () => {
  const pontosPorLetra = 1;
  const pontuacaoAtual = senhaCorreta.length * pontosPorLetra;
  setPontuacao(prevPontuacao => prevPontuacao + pontuacaoAtual);
};

useEffect(() => {
  if (senhaAtual === senhaCorreta) {
      atualizaPontuacao();
      setSenhaAtual('');
      gerarNovaPalavraCorreta();
  }
}, [senhaAtual, senhaCorreta]);

  const handleKeyDown = (event) => {
    if (pausado) return;

    const tecla = event.key;

    if (tecla === 'Backspace') {
      event.preventDefault();
      if (senhaAtual.length > 0) {
        setSenhaAtual(senhaAtual.slice(0, -1));
      }
    } else if (/^[a-zA-Z]$/.test(tecla)) {
      teclasRef.current.textContent = tecla.toUpperCase();
      teclasRef.current.classList.add('pulsado');

      if (senhaAtual.length < senhaCorreta.length) {
        const novaSenhaAtual = senhaAtual + tecla.toLowerCase();
        setSenhaAtual(novaSenhaAtual);

        if (novaSenhaAtual[novaSenhaAtual.length - 1] !== senhaCorreta[novaSenhaAtual.length - 1]) {
          setPontuacao(prevPontuacao => Math.max(prevPontuacao - 1, 0));
        }
      }
    }
  };

  const handlePausar = () => {
    setPausado(prevPausado => !prevPausado);
    if (pausado) {
      clearInterval(cronometroId.current);
    }
  };



  
  return (
    <div className="App" onKeyDown={handleKeyDown} tabIndex="0">
      <header className="App-header" >
        <button id="pausar-button" onClick={handlePausar}>
          {pausado ? 'Retomar' : 'Pausar'}
        </button>
        <div className="informations">
          <div className="pontuacao">
            Pontuação: <span id="pontuacao">{pontuacao}</span>
          </div>
          <div className="cronometro">
            Tempo: <span id="cronometro">{tempoDecorrido}</span> segundos
          </div>
        </div>
        <div id="teclas" ref={teclasRef}></div>
        <div className="senha">
          <p>
            Digite a palavra "<span id="palavra-correta">{senhaCorreta}</span>"
          </p>
          <div className="bolinhas" ref={bolinhasRef}></div>
        </div>      <iframe width="100" height="100"  autoplay="1" mute="1"
src="https://www.youtube.com/embed/jfKfPfyJRdk">
</iframe>
      </header>
      By Inácio Azevedo
    </div>
  );
}

export default App;

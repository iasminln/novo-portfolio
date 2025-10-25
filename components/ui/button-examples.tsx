// Exemplos de uso dos componentes de botão
import Button from './button';
import ButtonSecondary from './button-secondary';
import ThemeToggle from './theme-toggle';

export default function ButtonExamples() {
  const handleClick = () => {
    console.log('Botão clicado!');
  };

  return (
    <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <h2>Exemplos de Uso dos Botões</h2>
      
      {/* Botões com onClick */}
      <div>
        <h3>Botões com onClick:</h3>
        <Button onClick={handleClick}>Botão Principal</Button>
        <ButtonSecondary onClick={handleClick}>Botão Secundário</ButtonSecondary>
      </div>

      {/* Botões com links */}
      <div>
        <h3>Botões com links:</h3>
        <Button href="#sobre">Ir para Sobre</Button>
        <ButtonSecondary href="https://github.com">GitHub</ButtonSecondary>
      </div>

      {/* Botões desabilitados */}
      <div>
        <h3>Botões desabilitados:</h3>
        <Button disabled>Botão Desabilitado</Button>
        <ButtonSecondary disabled>Secundário Desabilitado</ButtonSecondary>
      </div>

      {/* Botões com classes customizadas */}
      <div>
        <h3>Botões com classes customizadas:</h3>
        <Button className="custom-button">Botão Customizado</Button>
        <ButtonSecondary className="custom-secondary">Secundário Customizado</ButtonSecondary>
      </div>

      {/* Theme Toggle */}
      <div>
        <h3>Toggle de Tema:</h3>
        <ThemeToggle />
      </div>
    </div>
  );
}

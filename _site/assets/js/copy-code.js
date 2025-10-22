// Mejorado: Agregar botones de copiar con diseño Medium
document.addEventListener('DOMContentLoaded', function() {
  // Encontrar todos los bloques de código
  const codeBlocks = document.querySelectorAll('.highlight');
  
  codeBlocks.forEach((block) => {
    // Crear contenedor mejorado
    const codeContainer = document.createElement('div');
    codeContainer.className = 'code-block';
    
    // Obtener el lenguaje (si está especificado)
    const languageClass = Array.from(block.classList).find(cls => cls.startsWith('language-'));
    const language = languageClass ? languageClass.replace('language-', '') : 'code';
    
    // Crear header con lenguaje y botón
    const codeHeader = document.createElement('div');
    codeHeader.className = 'code-header';
    
    const languageSpan = document.createElement('span');
    languageSpan.className = 'language';
    languageSpan.textContent = language;
    
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-code-btn';
    copyButton.textContent = 'Copiar';
    copyButton.setAttribute('aria-label', 'Copiar código al portapapeles');
    
    // Ensamblar el header
    codeHeader.appendChild(languageSpan);
    codeHeader.appendChild(copyButton);
    
    // Mover el contenido del bloque original al nuevo contenedor
    const originalContent = block.cloneNode(true);
    
    // Ensamblar el nuevo bloque
    codeContainer.appendChild(codeHeader);
    codeContainer.appendChild(originalContent);
    
    // Reemplazar el bloque original
    block.parentNode.replaceChild(codeContainer, block);
    
    // Funcionalidad de copiar
    copyButton.addEventListener('click', async () => {
      const codeElement = originalContent.querySelector('pre code') || originalContent.querySelector('pre');
      const codeText = codeElement ? codeElement.textContent : originalContent.textContent;
      
      try {
        await navigator.clipboard.writeText(codeText);
        
        // Feedback visual mejorado
        copyButton.textContent = '¡Copiado!';
        copyButton.classList.add('copied');
        
        setTimeout(() => {
          copyButton.textContent = 'Copiar';
          copyButton.classList.remove('copied');
        }, 2000);
      } catch (err) {
        console.error('Error al copiar: ', err);
        
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = codeText;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        
        copyButton.textContent = 'Copiado!';
        copyButton.classList.add('copied');
        setTimeout(() => {
          copyButton.textContent = 'Copiar';
          copyButton.classList.remove('copied');
        }, 2000);
      }
    });
  });
});
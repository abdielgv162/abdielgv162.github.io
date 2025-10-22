---
layout: page
title: "Prueba de Código"
permalink: /code-test/
---

## Ejemplo de código Python

```python
def fibonacci(n):
    """Calcula el n-ésimo número de Fibonacci"""
    if n <= 1:
        return n
    else:
        return fibonacci(n-1) + fibonacci(n-2)

# Ejemplo de uso
for i in range(10):
    print(f"Fibonacci({i}) = {fibonacci(i)}")
```

## Ejemplo de código JavaScript

```javascript
function saludar(nombre) {
    return `¡Hola, ${nombre}!`;
}

// Uso con arrow function
const despedir = (nombre) => {
    return `¡Adiós, ${nombre}!`;
};

console.log(saludar("Mundo"));
```

## Ejemplo de código HTML

```html
<!DOCTYPE html>
<html>
<head>
    <title>Mi Página</title>
</head>
<body>
    <h1>¡Hola Mundo!</h1>
    <p>Bienvenido a mi sitio web</p>
</body>
</html>
```
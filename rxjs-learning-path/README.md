# Operadores Rxjs

## Introducción

Este proyecto muestra cómo utilizar RxJS para manejar flujos de datos asíncronos de manera eficiente y legible. RxJS es una biblioteca poderosa para la programación reactiva en JavaScript, y sus operadores son fundamentales para transformar, filtrar y combinar flujos de datos.

## Importancia de Usar Operadores de RxJS

### 1. **Transformación de Datos**

Los operadores como `map` permiten transformar los datos de un flujo de manera sencilla y declarativa. Esto es útil para aplicar funciones a cada elemento del flujo sin necesidad de escribir bucles explícitos.

```javascript
const { of } = rxjs;
const { map } = rxjs.operators;

of(1, 2, 3)
  .pipe(map(x => x * 2))
  .subscribe(console.log); // Salida: 2, 4, 6
```

### 2. **Filtrado de Datos**

Operadores como `filter` permiten incluir o excluir elementos de un flujo basándose en condiciones específicas. Esto es esencial para trabajar con datos que necesitan ser validados o filtrados antes de ser procesados.

```javascript
const { of } = rxjs;
const { filter } = rxjs.operators;

of(1, 2, 3, 4, 5)
  .pipe(filter(x => x % 2 === 0))
  .subscribe(console.log); // Salida: 2, 4
```

### 3. **Manejo de Flujos Asíncronos**

Operadores como `switchMap` permiten manejar flujos asíncronos de manera eficiente, cancelando solicitudes anteriores si se emite un nuevo valor. Esto es especialmente útil en escenarios como solicitudes HTTP dependientes.

```javascript
const { fromEvent } = rxjs;
const { ajax } = rxjs.ajax;
const { switchMap } = rxjs.operators;

fromEvent(document, 'click')
  .pipe(switchMap(() => ajax.getJSON('https://api.example.com/data')))
  .subscribe(console.log);
```

### 4. **Composición de Flujos**

RxJS permite componer flujos de datos complejos de manera declarativa, lo que mejora la legibilidad y mantenibilidad del código. Operadores como `mergeMap`, `concatMap` y `forkJoin` son esenciales para combinar múltiples flujos de datos.

```javascript
const { of } = rxjs;
const { mergeMap } = rxjs.operators;

of('a', 'b', 'c')
  .pipe(mergeMap(letter => of(letter.toUpperCase())))
  .subscribe(console.log); // Salida: A, B, C
```

## Conclusión

El uso de operadores en RxJS es crucial para escribir código limpio, legible y eficiente. Estos operadores permiten transformar, filtrar y combinar flujos de datos de manera declarativa, lo que facilita el manejo de la lógica asíncrona y mejora la mantenibilidad del código.


### Ejemplo de Callback hell:

````javascript
const { fromEvent } = rxjs;

// Simulamos un evento de clic
fromEvent(document, 'click').subscribe(() => {
  facturaService.obtenerFactura(1).subscribe(factura1 => {
    if (factura1.isPagada) {
      const idFactura1 = factura1.id;
      facturaService.obtenerDetalleFactura(idFactura1).subscribe(detalle1 => {
        if (detalle1.isValido) {
          const idDetalle1 = detalle1.id;
          facturaService.obtenerHistorialFactura(idDetalle1).subscribe(historial1 => {
            if (historial1.isCompleto) {
              const finalValue = historial1.valor;
              console.log(finalValue);
            }
          });
        }
      });
    }
  });
});
````

### Ejemplo de código simplificado con map, filter y switchMap:

````javascript
const { fromEvent } = rxjs;
const { map, filter, switchMap } = rxjs.operators;

// Simulamos un evento de clic
fromEvent(document, 'click')
  .pipe(
    switchMap(() => facturaService.obtenerFactura(1)),
    filter(factura1 => factura1.isPagada),
    map(factura1 => factura1.id),
    switchMap(idFactura1 => facturaService.obtenerDetalleFactura(idFactura1)),
    filter(detalle1 => detalle1.isValido),
    map(detalle1 => detalle1.id),
    switchMap(idDetalle1 => facturaService.obtenerHistorialFactura(idDetalle1)),
    filter(historial1 => historial1.isCompleto),
    map(historial1 => historial1.valor)
  )
  .subscribe(
    finalValue => console.log(finalValue),
    error => console.error(error)
  );
````

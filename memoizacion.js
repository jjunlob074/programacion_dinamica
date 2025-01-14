// Contadores de llamadas
const callCounters = {
    fibonacci_recursive: 0,
    fibonacci_recursive_memoization: 0,
    fibonacci_tabulation: 0,
    fibonacci_number_aureo: 0
  };
  
// Recursivo sin optimización
// Complejidad: O(2^n) debido a que cada llamada recursiva genera dos llamadas adicionales.
// Muy ineficiente para valores grandes de n.
function fibonacci_recursive(n) {
  callCounters.fibonacci_recursive++;
  if (n <= 1) return n;
  return fibonacci_recursive(n - 1) + fibonacci_recursive(n - 2); // REALIZA MUCHAS VECES LAS MISMAS OPERACIONES
}

// Recursivo con memoización
// Complejidad: O(n) ya que cada valor de fibonacci solo se calcula una vez y se almacena en el memo.
// Uso eficiente de la caché dinámica.
function fibonacci_recursive_memoization(n, memo = {}) {
  callCounters.fibonacci_recursive_memoization++;
  if (n <= 1) return n;
  if (memo[n]) return memo[n]; // Evita cálculos redundantes, si ya lo calculé antes, lo devuelvo y no lo vuelvo a calcular
  memo[n] = fibonacci_recursive_memoization(n - 1, memo) + fibonacci_recursive_memoization(n - 2, memo);
  return memo[n];
}

// Iterativo con tabulación
// Complejidad: O(n) con espacio adicional O(n) para almacenar la tabla de resultados.
// No usa recursión, por lo que no hay sobrecarga de pila.
function fibonacci_tabulation(n) {
  if (n <= 1) return n;
  let fib = [0, 1]; // Tabla que almacena los valores, que uso para calcular los siguientes valores
  for (let i = 2; i <= n; i++) {
    callCounters.fibonacci_tabulation++;
    fib[i] = fib[i - 1] + fib[i - 2];
  }
  return fib[n];
}

// Fórmula del número áureo
// Complejidad: O(1) ya que se basa en una fórmula cerrada sin recurrir a bucles o recursión.
// Muy eficiente para calcular directamente valores de Fibonacci, el poder de las matemáticas.
function fibonacci_number_aureo(n) {
  callCounters.fibonacci_number_aureo++;
  const SQRT_5 = Math.sqrt(5);
  const PHI = (1 + SQRT_5) / 2;
  const PSI = (1 - SQRT_5) / 2;

  return Math.round((Math.pow(PHI, n) - Math.pow(PSI, n)) / SQRT_5);
}

// Función para medir el rendimiento de cada implementación
function measurePerformance(fn, n) {
  callCounters[fn.name] = 0; //RESET CONTADOR
  const start = performance.now();
  const result = fn(n);
  const end = performance.now();
  console.log(`Function: ${fn.name}, n: ${n}, Result: ${result},Calls: ${callCounters[fn.name]}, Time: ${(end - start).toFixed(4)} ms`);
}

// Pruebas con diferentes valores de n
const nValues = [10, 20, 30, 35, 40];

nValues.forEach(n => {
  console.log("-------------------------------------------------");
  console.log(`Testing with n = ${n}`);
  // Nota: fibonacci_recursive puede ser extremadamente lento para n > 45
  measurePerformance(fibonacci_recursive, n); // O(2^n)
  measurePerformance(fibonacci_recursive_memoization, n); // O(n)
  measurePerformance(fibonacci_tabulation, n); // O(n)
  measurePerformance(fibonacci_number_aureo, n); // O(1)
});

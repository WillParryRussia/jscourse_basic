'use strict'

// Циклы, массивы, структуры данных: домашнее задание

// task1 : С помощью цикла do...while написать алгоритм для вывода чисел от 0 до 10, чтобы результат выглядел
// таким образом: 0 - это ноль, 1 - это нечётное число, 2 - это чётное число и так далее до 10.
let beginTask1 = 0;
do {
	if(beginTask1 === 0) {
		console.log(`${beginTask1} is a null`);
	} else if (beginTask1 % 2) {
		console.log(`${beginTask1} is an odd number`);
	} else {
		console.log(`${beginTask1} is an even number`);
	}
	beginTask1++;
} while(beginTask1 < 11);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// task2 : Вывести с помощью цикла for числа от 0 до 9, НЕ используя тело цикла
for(let i = 0; i < 10; console.log(i++)) {};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// task3 : Нарисовать горку с помощью console.log (использовать цикл for), как показано на схеме
// *
// ***
// *****
// *******
// *********
// У данной горки должно быть 20 рядов
// Дополнительно: решить эту задачу используя concole.log однократно, то-есть сначала собрать строку
for (let i = 0, str = '*'; i < 20; i++, str += "**") {
	console.log(str);
}

let pyramid = '';
for (let i = 0; i < 20; i++) {
	pyramid += '*';

	for (let j = 0; j < i; j++) {
		pyramid += '**';
	}

	pyramid += '\n';
}
console.log(pyramid);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// task4 : С помощью цикла while вывести все простые числа в промежутке от 0 до 100. Можно без оптимизации
// Простое число это то число, которое без остатка делится только на себя и на 1 (1, 3, 5, 7, 11 ...)
let beginTask4 = 1;
while(beginTask4 <= 100) {
	if (isPrimeNumber(beginTask4)) {
		console.log(beginTask4);
	}
	beginTask4++;
}
/**
 * Функция проверяет, является ли переданное в качестве аргумента число простым
 * @param {int} number Число, которое надо проверять  
 * @returns {boolean} Возвращает истину если число простое и ложь, если не является простым
 */

function isPrimeNumber (number){
	if (number === 1) {
		return false;
	}
	let primeBase = [2, 3, 5, 7, 9];
	for (let i = 0; i < primeBase.length; i++) {
		if (number % primeBase[i] === 0 && number !== primeBase[i]) {
			return false;
		}
	}
	return true;
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// task5 : Дан массив (создать такой же и с такими же значениями) - [[2,4,6],[1,5,10],[7,4,1]]
// 5.1. Найти массив, у которого сумма всех чисел максимальна, вывести в console.log индекс этого массива
// 5.2. Получить и вывести в console.log минимальное значение найденное в массиве, который был получен в первом
// подзадании

let arrTask5_1 = [[2,4,6], [1,5,10], [7,4,1], [0,0,2]];
let arrTask5_2 = [[-2, -4, -6], [-1, -5, -10], [-7, -4, -1], [0,0,-20]];

/**
 * Функция, которая внутри массива массивов чисел находит тот массив, у которого наибольшая сумма элементов
 * @param {Array} arr Массив с массивами чисел
 * @returns {number} Возвращается индекс массива-элементов у которого наибольшая сумма элементов
 */
function findIndexBiggestArray (arr) {
	let biggestSumOfArray = calculateSumArr(arr[0]);
	let searchedIndex = 0;

	for (let i = 1; i < arr.length; i++) {
		let sumOfCurrentArray = calculateSumArr(arr[i]);
		if (sumOfCurrentArray > biggestSumOfArray) {
			biggestSumOfArray = sumOfCurrentArray;
			searchedIndex = i;
		}
	}
	return searchedIndex;
}
/**
 * Функция, которая находит сумму элементов переданного массива чисел
 * @param {Array} arr Массив, в котором нужно посчитать сумму элементов
 * @returns {int} Возвращает сумму всех элементов массива
 */
function calculateSumArr (arr) {
	let sum = arr[0];
	for (let i = 1; i < arr.length; i++) {
		sum = sum + arr[i];
	}
	return sum;
}

/**
 * Функция, которая находит наименьшее число в переданном массиве чисел
 * @param {Array} arr Массив, в котором функция будет искать наименьшее число
 * @returns {number} Возвращается наименьшее число из массива
 */
function findLeastValue(arr) {
	let leastValue = arr[0];
	for (let i = 1; i < arr.length; i++) {
		if (i === 0 || arr[i] < leastValue) {
			leastValue = arr[i];
		}
	}
	return leastValue;
}
/**
 * Функция возвращает индекс наибольшего числа в переданном массиве чисел
 * @param {Array} arr Целевой массив, в котором ищется наибольшее число
 * @returns {number} Возвращается индекс наибольшего числа массива
 */
function findBiggestValueIndex(arr) {
	let biggestValue = arr[0], searchedIndex = 0;
	arr.forEach((element, idx) => {
		if(element > biggestValue) {
			biggestValue = element;
			searchedIndex = idx;
		}
	});
	return searchedIndex;
}
// Обратный перебор массива
let arrTest = [5, 'hello', 3.14, 'one more string'];
for (let i = arrTest.length - 1; i >= 0; i--) {
	console.log(`Under index ${i} is storing value ${arrTest[i]}`);
}

//Additional decisions////////////////////////////////////////////////////////////////
function a (arr) {
	let searchedIndex = 0;
	for (let i =1; i < arr.length; i++) {
		if (calculateSumArr(arr[i]) > calculateSumArr(arr[searchedIndex])) {
			searchedIndex = i;
		}
	}
	return searchedIndex;
}

function a1 (arr) {
	let biggestSum, searchedIndex = 0;
	arr.forEach((element, idx) => {
		let sum = calculateSumArr(element);
		if (idx === 0 || biggestSum < sum) {
			biggestSum = sum;
			searchedIndex = idx; 
		}
	})
	return searchedIndex;
}

function a2 (arr) {
	let arrOfSums = arr.map((element) => {
		return calculateSumArr(element);	
	})
	return findBiggestValueIndex(arrOfSums);
}


console.log('FIBA: ' + findIndexBiggestArray(arrTask5_1));
console.log('FIBA: ' + findIndexBiggestArray(arrTask5_2));

console.log('A: ' + a(arrTask5_1));
console.log('A: ' + a(arrTask5_2));

console.log('A1: ' + a1(arrTask5_1));
console.log('A1: ' + a1(arrTask5_2));


console.log('A2: ' + a2(arrTask5_1));
console.log('A2: ' + a2(arrTask5_2));
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
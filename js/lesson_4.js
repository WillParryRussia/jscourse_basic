"use strict";

function formPositions() {
	const numbers = [];

	while(numbers.length < 4) {
		let number = Math.trunc(Math.random() * 10);

		if(!numbers.includes(number)) {
			numbers.push(number);	
		}
	}
	return numbers;
}
function compareTwoArrs(arr1, arr2) {
	if(arr1.length !== arr2.length) {
		return false;
	}
	for (let i = 0; i < arr1.length; i++) {
		if (arr1[i] !== arr2[i]) {
			return false;
		}
	}
	return true;
}
function getOxesAndCows(arr1, arr2) {
	let cows = 0, oxes = 0;
	for(let i = 0; i < arr1.length; i++) {
		if (arr1[i] === arr2[i]) {
			oxes++;
		} else if (arr2.includes(arr1[i])) {
			cows++;
		}
	}
	return `you have ${cows} cows and ${oxes} oxes`;
}
function gameOxesAndCows() {
	let init = formPositions();
	console.log(`hint ${init}`);
	let userArr = [];
	let counts = 0;
	
	while (true) {
		
		for (let i = 1; i < 5; i++) {
			let number = +prompt(`Введи ${i}-e число от 0 для 9, НО если хотите выйти из игры введите символ -1`);
			if(number === -1) {
				return `see you later`;
			}
			userArr.push(number);
		}

		counts++;
		if(compareTwoArrs(init, userArr)) {
			return `Congratulate, you  have won and it took ${counts} counts!`;
		}

		alert(`Your numbers are ${userArr} and ${getOxesAndCows(init, userArr)}`);
		console.log(`${userArr} -> ${getOxesAndCows(init, userArr)}`);
		userArr = [];
	}
}

// Перебор массива рекурсией
let simpleNumbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
function enumerateArray (arr) {
	if(arr.length > 0) {
		console.log(arr[0]);
		enumerateArray(arr.splice(1, arr.length - 1));	
	}
}

// Objects in JS

// DTO (Data Transfer Object) - объекты, которые хранят только свойства

// Symbol : новый примитивный тип данных. Его преимущество в том, что можно добавить в объект свойство,
// которое ни один переборщик или метод не покажет. Полезно при совместно работе над объектом
let myObj = {};

myObj['foo1'] = 'bar_prop';

Object.defineProperty(myObj, 'foo2', {value: 'bar_prop2', enumerable: false, writable: false});

let foo0 = Symbol('foo');
myObj[foo0] = 'bar_symb';

// Фактически объект имеет три свойства, но при переборе покажет максимум два
for (const prop in myObj) {}; 		// Только одно свойство (foo)
Object.keys(myObj);					// Только одно свойство (foo)
Object.getOwnPropertyNames(myObj);	// Только два свойства (foo, foo2)

// Дополнительно можно добавить итерирование для объекта, чтобы перебирать через for...of
let myObj2 = {
	prop1: 1,
	prop2: 2,
	prop3: 3,
	[Symbol('foo')]: 'bar',
	[Symbol.iterator]: function* () {
		yield 'prop1';
		yield 'prop2';
		yield 'prop3';
	}
}
for(const prop of myObj2) {
	//console.log(`Свойство ${prop} имеет значение ${myObj2[prop]}`);
}

// Задания по четвёртому уроку по курсу Базовый JS
// Пусковые кнопки каждого задания находятся в самом низу этого файла

// 1. Написать функцию, преобразующую число в объект. Передавая на вход число от 0 до 999, 
// мы должны получить на выходе объект, в котором в соответствующих свойствах описаны единицы, десятки и сотни. 
// Например, для числа 245 мы должны получить следующий объект: {‘единицы’: 5, ‘десятки’: 4, ‘сотни’: 2}. 
// Если число превышает 999, необходимо выдать соответствующее сообщение с помощью console.log и вернуть пустой объект.
// -- Если я правильно понял, то вообще пустой объект, без прототипа

/**
 * Функция, которая преобразовывает переданное число в объект, где свойства это разряды
 * @param {int} number Число, которое будет конвертироваться в объект
 * @returns {{hundreds: int, dozens: int, units: int}} Функция вернёт объект, который будет содержать три свойства: разряды
 * единицы (units), разряды десяток (dozens), разряды сотен (hundreds)
 */ 
function convertNumToObj (number) {
	if (!Number.isInteger(number) || number > 999 || number < 0) {
		console.log(`Вы ввели некорректное значение значение`);
		return Object.create(null);
	}

	return Object.create(null, {
		'hundreds': {value: Math.floor(number / 100)},
		'dozens': {value: Math.floor(number / 10) % 10},
		'units': {value: Math.floor(number % 10)}
	})

}

// 2. Для игры, реализованной на уроке:  
// 2.1. Добавить возможность вывода хода номер N
// 2.2. Добавить возможность ходить по диагонали цифрами 1, 3, 7, 9, а также необходимо сделать так, чтобы пользователь 
// не мог совершить шаг в стенку, т.е. при направлении в стенку игрок оставался на том же месте где стоял.

// DTO
/**
 * Объект с основными настройками игры
 * @property {int} rowsCount Количество строк на карте
 * @property {int} colsCount Количество колонок на карте
 * @property {int} startPositionX Начальная позиция игрока по X координате
 * @property {int} startPositionY Начальная позиция игрока по Y координате
 * @property {string} emptyField Символ на карте, обозначающий пустое место
 */
const settings = {
	rowsCount: 10,
	colsCount: 10,
	startPositionX: 1,
	startPositionY: 2,
	emptyField: 'X'
};
/**
 * Объект, который описывает игровую фигуру на карте
 * @property {int} Позиция игрока по X коордиинате
 * @property {int} Позиция игрока по Y коордиинате
 * @property {string} playerFigure Символ на карте, обозначающий игрока
 * @property {int} turn Номер хода игрока
 */
const player = {
	x: null,
	y: null,
	playerFigure: '0',
	turn: 0,
	/**
	 * Геттер, который возвращает количество ходов, которое сделал игрок с верным склонением слова ход
	 * @returns {string} Возвращает конкатеированную строку из количества ходов и склонённого слова ход
	 */
	get numberOfTurns() {
		let declinedWord = 'ход';
		let lastTwoDigits = this.turn % 100;
		if (lastTwoDigits > 5 && lastTwoDigits < 21) {
			declinedWord += 'ов';
			return `${this.turn} ${declinedWord}`;
		}
		switch (lastTwoDigits %= 10) {
			case 1:
				break;
			case 2:
			case 3:
			case 4:
				declinedWord += 'а';
				break;
			default:
				declinedWord += 'ов';
				break;	
		}
		return `${this.turn} ${declinedWord}`;
	},
	/**
	 * Метод, который назначает игроку его местоположение на карте из объекта настроек settings
	 * @param {int} startX аргумент, который задаёт положение по X координате
	 * @param {int} startY аргумент, который задаёт положение по Y координате
	 */
	init(startX, startY) {
		this.x = startX;
		this.y = startY;
	},
	/**
	 * Метод, который изменяет "двигает" игрока по карте, фактически просто изменяя координаты в настройках,
	 * если через аргумент передано число 2 - то двигает вниз, если 4 - то двигает влево, если 6 - вправо, 
	 * если 8 - вверх, если 1 - вниз и влево, если 3 - вниз и вправо, если 7 - вверх и влево, 9 - вверх и вправо
	 * @param {{x: int, y: int}} nextCoordinates передаются новые и валидные координаты игрока
	 */
	move(nextCoordinates) {
		this.x = nextCoordinates.x;
		this.y = nextCoordinates.y;
	},
	/**
	 * Метод, которые вычисляет следующие координаты игрока после смещения
	 * @param {int} direction Вектор движения игрока
	 * @return {{x: int, y: int}} Отдаёт координаты следующего местоположения игрока
	 */
	getNextCoordinates(direction) {
		const nextCoordinates = {
			x: this.x,
			y: this.y
		};

		if (direction > 0 && direction < 4) {
			nextCoordinates.y++;
		} else if (direction > 6 && direction < 10) {
			nextCoordinates.y--;
		}

		if (direction === 1 || direction === 4 || direction === 7) {
			nextCoordinates.x--;
		} else if (direction === 3 || direction === 6 || direction === 9) {
			nextCoordinates.x++;
		}

		return nextCoordinates;
	}
};
/**
 * Объект, который является основным для игры, описывает основные методы игры
 * @property {Object} settings Содержит указатель на Объект настроек settings
 * @property {Object} player Содержит указатель на Объект игрока player
 */
const game = {
	settings,
	player,

	/**
	 * Основной метод, который отрабатывает саму игру. Сначала рендерит стартовое поле, а затем запускает
	 * бесконечный цикл, с помощью которого передвигается игрок по карте.
	 */
	run() {
		this.player.init(this.settings.startPositionX, this.settings.startPositionY);
		while (true) {
			this.render();
			let direction = this.getDirection();
			if (direction === -1) {
				alert('See you later');
				return;
			}

			const nextCoordinates = this.player.getNextCoordinates(direction);
			if (this.validateNextStep(nextCoordinates)) {
				this.player.move(nextCoordinates);
				this.player.turn++;	
			}

			this.render();
		}
	},
	/**
	 * Метод, который отрисовывает карту игровую карту и фигурку игрока в консоли.
	 */
	render() {
		let map = '';
		for (let row = 0; row < this.settings.rowsCount; row++) {
			for (let col = 0; col < this.settings.colsCount; col++) {
				if (this.player.x === col && this.player.y === row) {
					map += `${this.player.playerFigure} `;
				} else {
					map += `${this.settings.emptyField} `;
				}
			}
			map += '\n';
		}
		console.clear();
		console.log(`Игрок сделал ${this.player.numberOfTurns}`);
		console.log(map);
	},
	/**
	 * Метод, который получает от игрока направление движения и проверяет его на валидность. При успешной валидации
	 * возвращает вектор направления движения. Вектора валидных движений хранятся в массиве. 
	 * @returns {int} direction Возвращает вектор движения игрока в виде цифры
	 */
	getDirection() {
		const availableDirections = [-1, 1, 2, 3, 4, 6, 7, 8, 9];
		while(true) {
			const direction = +(prompt('Enter the direction u want to step in and -1 if u want to exit'));
			if (!availableDirections.includes(direction)) {
				alert(`U enter an invalid number, for transition u need to enter any number of these: ${availableDirections.join(' or ')}`);
				continue;
			}
			return direction;
		}
	},
	/**
	 * Метод, который проверяет возможность игрока сделать ход по заданному вектору. Он может сделать ход, если там нет стены
	 * @param {{x: int, y: int}} Объект, в котором будут передаваться координаты, куда наш игрок намеревается сходить
	 * @returns {boolean} Возврашает ИСТИНУ если ход может быть сделан или ЛОЖЬ, если следующий ход ведёт в стену
	 */
	validateNextStep(nextCoordinates) {
		let x = nextCoordinates.x;
		let y = nextCoordinates.y;
		let maxX = this.settings.rowsCount;
		let maxY = this.settings.colsCount;

		if(x >= 0 && x < maxX && y >= 0 && y < maxY) {
			return true;
		}
		return false;
	}
};

// 3. На базе игры, созданной на уроке, реализовать игру «Кто хочет стать миллионером?»

/**
 * Объект, с основными настройками игры "Кто хочет стать миллионером"
 * @property {Array} monetaryMilestones Массив, которые содержит массив сушествующих несгораемых сумм
 * @property {Array} monetaryAmount Свойство, которое содержит суммы денег, которые выигрывает пользователь
 * @property {int} amountOfQueestions Свойство, которое хранит количество вопросов в игре, опираясь на базу данных вопросов
 */
const settingsMillionaire = {
	monetaryMilestones: [],
	monetaryAmount: [0],
	amountOfQuestions: 0,

};
/**
 * Объект, который реализует механизмы использования подсказок в игре
 * @property {[{name: string, number: int}]} lifelinesList Названия подсказок, которые может использовать игрок и их номера для ввода
 * lifelinesList
 */
const lifelinesMillionaire = {
	lifelinesList: [
		{name: 'Звонок другу', methodName: 'phoneAFriend', number: 5},
		{name: '50 на 50', methodName: 'fiftyFifty', number: 6},
		{name: 'Помощь зала', methodName: 'askTheAudience', number: 7}],
	/**
	 * Метод, реализующий подсказку Звонок Другу. В данном методе не будет использоваться настоящий звонок, а 
	 * ответ будет выбираться с вероятностью в 90% верный вариант или неверный, если игрок неудачлив
	 */
	phoneAFriend(bodyQA, playerTurn) {
		alert('Вы звоните своему другу ... ');
		
		// Формируем массив неверных вариантов
		let wrongAnswers = [];
		
		for (let i = 0; i <= bodyQA.answers.length; i++) {
			if (i !== bodyQA.rightAnswer) {
				wrongAnswers.push(i);
			}
		}
		let luckyChance = Math.random();
		
		if (luckyChance > .9) {
			let randomArrayIndex = Math.trunc(Math.random() * (wrongAnswers.length - 0) + 0);
			luckyChance = wrongAnswers[randomArrayIndex];
		} else {
			luckyChance = bodyQA.rightAnswer;
		}
		alert(`Ваш друг думает, что ответ на этот вопрос: "${bodyQA.answers[luckyChance]}", то-есть под номером "${luckyChance + 1}"`);
	},
	/**
	 * Метод, реализующий подсказку 50 на 50. В данном методе убираются два неверных ответа
	 */
	fiftyFifty(bodyQA) {
		alert('Итак, подсказка 50 на 50');
		// Формируем массив двух случайных неверных вариантов
		let wrongAnswers = [];

		while (wrongAnswers.length !== 2) {
			let random = Math.trunc(Math.random() * (bodyQA.answers.length - 0) + 0);
			if (random !== bodyQA.rightAnswer && !wrongAnswers.includes(random)) {
				wrongAnswers.push(random);
			}
		}
		let message = `Компьютер говорит, что два неверных варианта это:\n`;
		message += `"${bodyQA.answers[wrongAnswers[0]]}" под номером ${wrongAnswers[0] + 1}\n`;
		message += `"${bodyQA.answers[wrongAnswers[1]]}" под номером ${wrongAnswers[1] + 1}`;
		alert(message);
	},
	/**
	 * Метод, реализующий подсказку Помощь зала. Опять же, данный метод не будет использовать реальный зал, а все ответы
	 * получат проценты голосов. Вероятность правильного ответа 65%
	 */
	askTheAudience(bodyQA, playerTurn) {
		alert('Давайте узнаем, что думает зал ... ');
		let wrongAnswers = [];
		
		for (let i = 0; i <= bodyQA.answers.length; i++) {
			if (i !== bodyQA.rightAnswer) {
				wrongAnswers.push(i);
			}
		}
		let luckyChance = Math.random();
		
		if (luckyChance > .65) {
			let randomArrayIndex = Math.trunc(Math.random() * (wrongAnswers.length - 0) + 0);
			luckyChance = wrongAnswers[randomArrayIndex];
		} else {
			luckyChance = bodyQA.rightAnswer;
		}

		alert(`Большая часть зала думает, что ответ на этот вопрос "${bodyQA.answers[luckyChance]}" под номером "${luckyChance + 1}"`);
	}
};
/**
 * Данный объект (Генератор диалога) будет генерировать относительно уникальный текстовый контент,
 * симулирующий разговор ведущего с игроком, чтобы разнообразить игру и приблизить её к настоящей
 * игре
 * @property {}
 */

const dialogGenerator = {
	parenthesis: ['', 'Итак, ', 'Внимание, ', 'Тем временем, ', 'К настоящему моменту, ', 'Ох, ', 'Сейчас, ', 'Ладно, ', 'Резюмируя, ', 'Так, '],
	youHave: ['у вас на счету', 'на вашем счете', 'вы имеете ', 'на вашем депозите ', 'ваш выигрыш ', 'ваш счет составляет ', 'вы уже можете забрать '],
	it: ['Это', 'На очереди', 'Впереди', 'У вас впереди', 'Прямо сейчас', 'Грядёт', 'Наконец', 'Настало время задать', 'Вот вам', 'Готовы? Поехали, '],
	onAStack: ['на кону', 'разыгрываются', 'ставка -', 'очередная сумма', 'новый предел', 'в розыгрыше', 'на столе', 'вы можете выиграть', 'играются'],
	congratulations: ['Поздравляю ', 'Мои поздравления, ', 'Обалдеть, ', 'Надо же, ', 'Так держать, ', 'Вот это мозг, ', 'Возрадуйтесь же, ']
};
/**
 * Объект, который содержит информация об игроке
 * @property {int} moneyAmount Свойство, которое содержит количество денег, которое на балансе игрока
 * @property {int} moneyMilestone Свойство, которое содержит количество денег на несгораемом счету
 * @property {int} turn Свойство, которое указывает какой ход у игрока
 * @property {Array} avalaibleLiffelines Свойство, которое указывает какие подсказки есть у игрока.
 * @property {Array} lifelinesRegisteredNumbers Зарегистрированные номера подсказок, попадут в массив после инициализации и парсинга массива
 * @property {string} playerName Свойство, которое содержит в себе имя игрока
 * @property {{question: string, answers: [string], rightAnswer: int}} bodyQA Данное свойство будет хранить текущий выбранный объект с 
 * вопросом, ответами и правильным ответом, случайным образом выбранный из базы данных вопросов
 * @property {string} formattedQuestion Свойство, которое будет хранить строку для вывода в удобном для пользователя формате. Данная строка
 * будет генерироваться с помощью объекта conversionalMatrix
 * @property {int || NaN} enteredAnswer Свойство, которое хранит введённый пользователем ответ. Вообще пользователь может ввести любое значение, но
 * оно будет трансформировано в int, либо в NaN если не удастся привести к числовому значению (в таком случае пользователь проиграет игру)
 */
const playerMillionaire = {
	moneyAmount: 0,
	moneyMilestone: 0,
	turn: 0,
	avalaibleLifelines: lifelinesMillionaire.lifelinesList.slice(0),
	lifelinesRegisteredNumbers: [],
	playerName: null,
	bodyQA: null,
	formatQuestion: null,
	enteredAnswer: null
};
/**
 * Объект, который содержит основную базу вопросов, разнесённую по категориям, в зависимости от сумму, на которую
 * претендует игрок
 * @property {1...15: {value: int, milestone: boolean, db: [{question: string, answers: [string], rightAnswer: int}]}}
 * [1 ... 15] -свойства, каждый из которых содержит стопку вопросов 
 * для определённой суммы денег, где единица это самые легкие вопросы, а 15 - самые тяжёлые
 */
const questionsMillionaire = {
	1:{
		value: 500,
		milestone: false,
		db: [
			{
				question: 'Сколько будет два плюс два?',
				answers: ['Четыреста', 'Пять', 'Десять', 'Четыре'],
				rightAnswer: 3
			},
			{
				question: 'Что больше два или десять?',
				answers: ['Десять', 'Два', 'Они равны', 'Это нельзя сравнивать'],
				rightAnswer: 0
			},
			{
				question: 'Что говорят кошечки?',
				answers: ['Гав-гав', 'Мееее', 'Мяу-мяу', 'Вы больной?'],
				rightAnswer: 2
			},
			{
				question: 'Что растёт в огороде?',
				answers: ['Лук','Арбалет','Пистолет','Пулемет'],
				rightAnswer: 0
			},
			{
				question: 'Как продолжается поговорка, взялся за гуж, не говори что не ..',
				answers: ['Дюж','Ёж','Уж','Муж'],
				rightAnswer: 0
			}]
	},
	2: {
		value: 1000,
		milestone: false,
		db: [
			{
				question: 'Сколько будет два умножить на два?',
				answers: ['Четыре', 'Один', 'Десять', 'Восемь'],
				rightAnswer: 0
			},
			{
				question: 'Что говорят собачки?',
				answers: ['Мяу-мяу', 'Гав-гав', 'Уии-уии', 'Вы реально больной, я звоню в полицию!'],
				rightAnswer: 1
			},
			{
				question: 'Как зовут ведущего игры?',
				answers: ['Я не помню', 'Денис', 'Вы кто такие?', 'Кто я?'],
				rightAnswer: 1
			},
			{
				question: 'Как называют микроавтобусы, совершающие поездки по определённым маршрутам?',
				answers: ['Рейсовка','Путевка','Курсовка','Маршрутка'],
				rightAnswer: 3
			},
			{
				question: 'Какую компанию основал Билл Гейтс?',
				answers: ['Майкрософт','Минисофт','Макрософт','Мегасофт'],
				rightAnswer: 0
			}]
	},
	3: {
		value: 2000, 
		milestone: false, 
		db: [
			{
				question: 'О чём писал Грибоедов, отмечая, что он «нам сладок и приятен»?',
				answers: ['Дым отечества','Дух купечества','Дар пророчества','Пыл девичества'],
				rightAnswer: 0
			},
			{
				question: 'Назовите столиц Турции',
				answers: ['Стамбул','Анкара','Анталья','Испарта'],
				rightAnswer: 1 
			},
			{
				question: 'В каком году началась Вторая Мировая Война?',
				answers: ['1933','1941','1939','1945'],
				rightAnswer: 2
			},
			{
				question: 'Назовите столицу Словакии',
				answers: ['Бухарест','Братислава','Прага','Будапешт'],
				rightAnswer: 1
			},
			{
				question: 'Одна из популярнейших игр компании Близзард в жанре MOBA',
				answers: ['Овербрейн','Овервотч','Оверлейд','Вотчовер'],
				rightAnswer: 1
			},
			{
				question: 'Какое слово в более полной мере характеризует серию игр Fallout',
				answers: ['Постапокалипсис','Сессионный шутер','Королевская битва','Хоррор-экшен'],
				rightAnswer: 0
			},
			{
				question: 'Назовите имя гения',
				answers: ['Хидео Кодзима','Сато Судзуки','Такада Аоки','Накано Хаттори'],
				rightAnswer: 0
			}]
	},
	4: {
		value: 3000, 
		milestone: false, 
		db: [			
			{
				question: 'Какого персонажа нет в известной считалке «На золотом крыльце сидели»?',
				answers: ['Сапожника','Кузнеца','Короля','Портного'],
				rightAnswer: 1
			},
			{
				question: 'Как называется группа слонов?',
				answers: ['Группа','Стадо','Косяк','Прайд'],
				rightAnswer: 1 
			},
			{
				question: 'Кто относится к одноклеточным?',
				answers: ['Медузы','Кораллы','Амёбы','Головастики'],
				rightAnswer: 2
			},
			{
				question: 'Как переводится аббревитура настольной игры D&D?',
				answers: ['Драконы и Демоны','Подземелья и Драконы','Рок и Судьба','Скачай и Раздай'],
				rightAnswer: 1
			},
			{				question: 'Назовите столицу Израиля',
				answers: ['Тель-авив','Иерусалим','Эйлат','Хайфа'],
				rightAnswer: 1
			}]
	},
	5: {
		value: 5000, 
		milestone: true, 
		db: [
			{
				question: 'Какой специалист занимается изучением неопознанных летающих объектов?',
				answers: ['Кинолог','Уфолог','Сексопатолог','Психиатр'],
				rightAnswer: 1
			},
			{
				question: 'Как звали главного героя-хоббита в трилогии Властелин Колец?',
				answers: ['Сэмуэль Гэнджи','Перегрин Тук','Фродо Бэггинс','Мериадок Брендибак'],
				rightAnswer: 2
			},
			{
				question: 'Как звали главного героя в аниме-сериале Наруто?',
				answers: ['Узумаки Наруто','Учиха Наруто','Шикамару Наруто','Даттебайо Наруто'],
				rightAnswer: 0
			},
			{
				question: 'Какое настоящее имя Дарта Вейдера?',
				answers: ['Энакин Скайуокер','Люк Скайуокер','Падме Амидала','Оби-Ван Кеноби'],
				rightAnswer: 0
			},
			{
				question: 'Как называется первая книга трилогии Филиппа Пуллмана "Тёмные начала"?',
				answers: ['Янтарный телескоп','Золотой компас','Чудесный нож','Оскфорд Лиры'],
				rightAnswer: 1
			},
			{
				question: 'Какой национальный цветок в Японии?',
				answers: ['Хризантема','Сакура','Ромашка','Лилия'],
				rightAnswer: 1
			},
			{
				question: 'Какая планета ближе всего к Солнцу?',
				answers: ['Меркурий','Венера','Земля','Марс'],
				rightAnswer: 0
			}]
	},
	6: {
		value: 10000, 
		milestone: false, 
		db: [			
			{
				question: 'Как называется вода, с изотопом дейтерием вместо атома водорода?',
				answers: ['Легкая','Средняя','Тяжелая','Невесомая'],
				rightAnswer: 2
			},
			{
				question: 'Чего боится человек с танатофобией?',
				answers: ['Насекомых','Хирургических операций','Смерти','Открытого пространства'],
				rightAnswer: 2
			},
			{
				question: 'Тонкие плёнки меди на просвет имеют … цвет',
				answers: ['Красно-жёлтый','Зеленовато-голубой','Сине-красный','Бесцветные'],
				rightAnswer: 1
			},
			{
				question: 'Кислород был открыт ... ',
				answers: ['Менделеевым','Ломоносовым','Пристли','Кислородовым'],
				rightAnswer: 2
			},
			{
				question: 'Кто 1-м получил Нобелевскую премию по литературе?',
				answers: ['Романист','Драматург','Поэт','Эссеист'],
				rightAnswer: 2
			}]
	},
	7: {
		value: 15000, 
		milestone: false, 
		db: [			
			{
				question: 'Что такое десница?',
				answers: ['Бровь','Глаз','Шея','Рука'],
				rightAnswer: 3
			},
			{
				question: 'Какой химический элемент впервые открыт на солнце?',
				answers: ['Литий','Гелий','Цирконий','Скандий'],
				rightAnswer: 1
			},
			{
				question: 'С какого уровня можно отсчитать абсолютную высоту?',
				answers: ['С уровня земли','С уровня моря','С уровня самой высокой точки','С уровня самой низкой точки'],
				rightAnswer: 1
			},
			{
				question: 'Кто автор "Денискиных рассказов"?',
				answers: ['Эдуард Успенский','Виктор Драгунский','Корней Чуковский','Алексей Толстой'],
				rightAnswer: 1
			},
			{
				question: 'О ком снят фильм ТопГан?',
				answers: ['О стрелках','О моряках','О пилотах','О полицейских'],
				rightAnswer: 2
			}]
	},
	8: {
		value: 25000, 
		milestone: false, 
		db: [			
			{
				question: 'В какое море впадает река Урал?',
				answers: ['Азовское','Черное','Средиземное','Каспийское'],
				rightAnswer: 3
			},
			{
				question: 'Какой самый жирный орган в организме человека?',
				answers: ['Печень','Лёгкие','Поджелудочная железа','Мозг'],
				rightAnswer: 3
			},
			{
				question: 'Благодаря какому пигменту появляется загар?',
				answers: ['Меланин','Аденохром','Гелин','Липофусцин'],
				rightAnswer: 0
			},
			{
				question: 'Кто не относился к мышиным из мультсериала Чип и Дейл?',
				answers: ['Чип','Дейл','Гайка','Вжик'],
				rightAnswer: 3
			},
			{
				question: 'Какое государство не находится на территории пустыни Сахара?',
				answers: ['Тунис','Алжир','Ливия','Эфиопия'],
				rightAnswer: 3
			}]
	},
	9: {
		value: 50000, 
		milestone: false, 
		db: [			
			{
				question: 'На что кладут руку члены английского общества лысых во время присяги?',
				answers: ['Мяч','Бильярдный шар','Апельсин','Кокос'],
				rightAnswer: 1
			},
			{
				question: 'Назовите материки на земном шаре, которые начинаются на букву «А». Сколько их по количеству?',
				answers: ['Три','Четыре','Пять','Шесть'],
				rightAnswer: 2
			},
			{
				question: 'Писателем-классиком какой страны был Джек Лондон?',
				answers: ['США','Англия','Австралия','Канада'],
				rightAnswer: 0
			},
			{
				question: 'Как звали человека, который вошёл в историю под именем Лжедмитрия I?',
				answers: ['Николай','Григорий','Сергей','Борис'],
				rightAnswer: 1
			},
			{
				question: 'Какое время года, "сама не зная почему", любила Татьяна — героиня "Евгения Онегина"',
				answers: ['Зиму','Весну','Лето','Осень'],
				rightAnswer: 0
			}]
	},
	10: {
		value: 100000, 
		milestone: true, 
		db: [			
			{
				question: 'Как назывался каменный монолит, на котором установлен памятник Петру I в СпБ?',
				answers: ['Дом-камень','Гром-камень','Гора-камень','Разрыв-камень'],
				rightAnswer: 1
			},
			{
				question: 'Какая марка автомобиля названа в честь французского офицера, основавшего город Детройт?',
				answers: ['Кадиллак','Опель','Мерседес','Форд'],
				rightAnswer: 0
			},
			{
				question: 'Кто присматривает за любителями ягеля?',
				answers: ['Чабан','Табунщик','Оленевод','Свинопас'],
				rightAnswer: 2
			},
			{
				question: 'Кто написал картину «Рождение Венеры» 1486 г.',
				answers: ['Джованни Беллини','Сандро Ботиччели','Микеланджело Буонаротти','Рафаэль Санти'],
				rightAnswer: 1
			},
			{
				question: 'Вода реагирует с оксидами активных металлов с образованием ...',
				answers: ['Основания(Щелочи)','Антиоксиданта','Кислоты','Оксида'],
				rightAnswer: 0
			}]	},
	11: {
		value: 200000, 
		milestone: false, 
		db: [
			{
				question: 'Как Чайковский назвал свою серенаду для скрипки с оркестром си-бемоль минор?',
				answers: ['Флегматическая','Меланхолическая','Холерическая','Холерическая'],
				rightAnswer: 1
			},
			{
				question: 'В каком веке жил Вольфганг Амадей Моцарт?',
				answers: ['18','17','16','19'],
				rightAnswer: 0
			},
			{
				question: 'У какого животного коренные зубы могут смениться в течение жизни 6 раз?',
				answers: ['Тигр','Зубр','Медведь','Слон'],
				rightAnswer: 3
			},
			{
				question: 'Что прославило город Валдай?',
				answers: ['Самовары','Платки','Матрёшки','Колокольчики'],
				rightAnswer: 3
			},
			{
				question: 'Какое из этих слов в переводе с французского означает "хранить платье"?',
				answers: ['Шкаф','Шифоньер','Гардероб','Буфет'],
				rightAnswer: 2
			}]
	},
	12: {
		value: 400000, 
		milestone: false, 
		db: [			
			{
				question: 'Какого ордена не было у первого советского космонавта Юрия Гагарина?',
				answers: ['«Ожерелье Нила»','«Крест Грюнвальда»','«Плайя Хирон»','«Орден двойного дракона»'],
				rightAnswer: 3
			},
			{
				question: 'В каком приборе 30-х годов XX века в Америке использовали колючки кактуса?',
				answers: ['Телефон','Радиопередатчик','Кассовый аппарат','Патефон'],
				rightAnswer: 3
			},
			{
				question: 'Что получают из млечного сока дерева гевеи?',
				answers: ['Красители','Крахмал','Каучук','Соль'],
				rightAnswer: 2
			},
			{
				question: 'С какой страной Швеция имеет сухопутную границу?',
				answers: ['Норвегия','Бельгия','Испания','Франция'],
				rightAnswer: 0
			},
			{
				question: 'Какое прозвище было у царя Алексея Михайловича?',
				answers: ['Благословенный','Мудрый','Тишайший','Грозный'],
				rightAnswer: 2
			}]
	},
	13: {
		value: 800000, 
		milestone: false, 
		db: [			
			{
				question: 'Какое животное имеет второе название — кугуар?',
				answers: ['Оцелот','Леопард','Пума','Пантера'],
				rightAnswer: 2
			},
			{
				question: 'В какой из этих столиц бывших союзных республик раньше появилось метро',
				answers: ['Ереван','Тбилиси','Баку','Минск'],
				rightAnswer: 1
			},
			{
				question: 'Сколько морей омывают Балканский полуостров?',
				answers: ['Три','Четыре','Пять','Шесть'],
				rightAnswer: 3
			},
			{
				question: 'В какой части атмосферы содержится 80% массы воздуха?',
				answers: ['Тропосфера','Биосфера','Литосфера','Гидросфера'],
				rightAnswer: 0
			},
			{
				question: 'Куда нужно посмотреть, чтобы увидеть пунт?',
				answers: ['На бутылку вина','На карандаш','На циркуль','На наконечник шнурка'],
				rightAnswer: 0
			}]
	},
	14: {
		value: 1500000, 
		milestone: false, 
		db: [		
			{
				question: 'Что в России 19 века делали в дортуаре?',
				answers: ['Ели','Спали','Ездили верхом','Купались'],
				rightAnswer: 1
			},
			{
				question: 'С какой фигуры начинаются соревнования по городошному спорту?',
				answers: ['Часовые','Артиллерия','Пушка','Пулеметное гнездо'],
				rightAnswer: 2
			},
			{
				question: 'Сколько раз в сутки подзаводят куранты Спасской башни Кремля?',
				answers: ['Один','Два','Три','Четыре'],
				rightAnswer: 1
			},
			{
				question: 'Как назвали первую кимберлитовую трубку, открытую Ларисой Попугаевой 21 августа 1954 года?',
				answers: ['Советская','Зарница','Удачная','Мир'],
				rightAnswer: 1
			},
			{
				question: 'Что Иван Ефремов в романе «Лезвие бритвы» назвал наивысшей степенью целесообразности?',
				answers: ['Красоту','Мудрость','Смерть','Свободу'],
				rightAnswer: 0
			}]
	},
	15: {
		value: 3000000, 
		milestone: true, 
		db: [			
			{
				question: 'Какой химический элемент назван в честь злого подземного гнома?',
				answers: ['Гафний','Кобальт','Теллур','Бериллий'],
				rightAnswer: 1
			},
			{
				question: 'Кто был первым военным министром Российской империи?',
				answers: ['Аракчеев','Барклай-де-Толли','Вязимитинов','Коновницын'],
				rightAnswer: 2
			},
			{
				question: 'Реки с каким названием нет на территории России?',
				answers: ['Спина','Уста','Палец','Шея'],
				rightAnswer: 0
			},
			{
				question: 'Что Шекспир назвал «вкуснейшим из блюд в земном пиру»?',
				answers: ['Опьянение','Любовь','Уединение','Сон'],
				rightAnswer: 3
			},
			{
				question: 'Кто из этих философов в 1864 году написал музыку на стихи А. С. Пушкина «Заклинание» и «Зимний вечер»?',
				answers: ['Юнг','Ницше','Шопунгауэр','Гегель'],
				rightAnswer: 1
			}]
	}
};
/**
 * Основной метод нашей игры кто хочет стать миллионером. Этот метод будет инициализировать игрока и запускать игровую сессию
 * @property {Object} settings Свойство, которое содержит указатель на объект основных настроек игры
 * @property {Object} player Свойство, которое содержит указатель на объект данных нашего игрока
 * @property {Object} questions Свойство, которое содержит указатель на объект доступных вопросов, по сути некой БД
 * @property {Object} lifelines Свойство, которое содержит указатель на объект существующих подсказок в игре
 * @property {Object} conversationalMatrix Свойство, которое содержит указатель на объект разговорной матрицы
 * @property {string} gameMessage Это свойство хранит информационное сообщение для пользователя
 */
const gameMillionaire = {
	settings: settingsMillionaire,
	player: playerMillionaire,
	questions: questionsMillionaire,
	lifelines: lifelinesMillionaire,
	dialogGenerator,
	gameMessage: '',
	/**
	 * Данный метод будет инициализировать саму игру. Заполняем
	 * массив monetaryAmount, который отвечает за ценности вопросов, массив monetaryMilestone, который хранит данные о несгораемых
	 * суммах и свойство, которое отвечает за количество вопросов в игре
	 * Дополнительно регистрируем номера доступных подсказок в игре и спрашиваем имя пользователя
	 */
	init() {
		// Данный цикл перебирает базу данных вопросов и на основе этого перебора формируются массивы
		// monetaryAmount из свойства value и monetaryMilestones из свойства milestone. Дополнительно к этому
		// актуализируется свойство amountOfQuestions, которое хранит количество вопросов для игрока
		for(let num in this.questions) {
			this.settings.monetaryAmount.push(this.questions[num].value);
			if (this.questions[num].milestone === true) {
				this.settings.monetaryMilestones.push(this.questions[num].value);
			};
			this.settings.amountOfQuestions++;
		}
		// Данный цикл проходит по массиву доступных подсказок для игры и добавляет их номера в список
		// зарегистрированных подсказок для игрока для универсальности, чтобы номера менять в одном месте, в списке подсказок
		for (let lifelineNumber = 0; lifelineNumber < this.lifelines.lifelinesList.length; lifelineNumber++) {
			let iteratedLifelineNumber = this.lifelines.lifelinesList[lifelineNumber].number
			this.player.lifelinesRegisteredNumbers.push(iteratedLifelineNumber);
		}
		let playerName = prompt('Приветствую Вас на игре Кто хочет стать миллионером. Меня зовут Денис. А как Ваше имя?');
		if (playerName) {
			this.player.playerName = playerName;
		} else {
			this.player.playerName = 'Player Name';
		}
	},
	/**
	 * Основной метод игры, который будет запускать игровую сессию. Сначала инициализируем саму игру, затем инициализируем нового игрока
	 */
	run() {
		this.init();
		while(this.player.turn < this.settings.amountOfQuestions) {
			this.player.turn++;
			this.getQuestionAndAnswers();
			this.formatQuestion();
			this.player.enteredAnswer = +prompt(this.player.formattedQuestion);
			let rightAnswer = this.player.bodyQA.rightAnswer + 1;
			if (this.player.enteredAnswer === -1) {
				this.gameMessage = `Что же, ${this.player.playerName}, выбор ваш. Ваш выигрыш составил ${this.player.moneyAmount} кредитов! Всего доброго!`;
				alert(this.gameMessage);
				return;
			}
			if (this.checkIfLifeline()) {
				if (this.player.enteredAnswer === rightAnswer) {
					this.player.moneyAmount = this.settings.monetaryAmount[this.player.turn];
					let random = Math.trunc(Math.random() * (this.dialogGenerator.congratulations.length - 0) + 0);
					this.gameMessage  = `${this.dialogGenerator.congratulations[random]}${this.player.playerName}, `;
					random = Math.trunc(Math.random() * (this.dialogGenerator.youHave.length - 0) + 0);
					this.gameMessage += `вы угадали и ${this.dialogGenerator.youHave[random]} ${this.player.moneyAmount} кредитов! `;
					if (this.player.turn !== this.settings.amountOfQuestions) {
						this.gameMessage += `Следующий вопрос ... `;
					}
					alert(this.gameMessage);
					if (this.settings.monetaryMilestones.includes(this.player.moneyAmount)) {
						this.player.moneyMilestone = this.player.moneyAmount;
					}
				} else {
					this.gameMessage = `Что же, ${this.player.playerName}, вы проиграли.\n`;
					this.gameMessage += `Вы заработали ${this.player.moneyMilestone} кредитов.\n`;
					this.gameMessage += `Правильный ответ: "${this.player.bodyQA.answers[this.player.bodyQA.rightAnswer]}"` 
					this.gameMessage += `под номером ${rightAnswer}`;
					alert(this.gameMessage);
					return;
				}
			}
		}
		this.gameMessage = `Вы Победитель Игры Кто хочет стать миллионером и заработали ${this.player.moneyMilestone} кредитов!\n`;
		this.gameMessage += `Поздравляю вас. Возможно вы хотите сыграть ещё раз?`;
		if (confirm(this.gameMessage)) {
			this.game.run();
		}
		return;

	},
	/**
	 * Метод, который получает вопрос из базы
	 * При этом сначала получаем рандомное число на основе длины массива вопросов (по диапазону)
	 */
	getQuestionAndAnswers() {
		let randomNumber = Math.trunc(Math.random() * (this.questions[this.player.turn].db.length - 0) + 0);
		this.player.bodyQA = this.questions[this.player.turn].db[randomNumber];
	},
	/**
	 * Метод, который форматирует вопрос в уобный вид и отдаёт его в виде строки
	 */
	formatQuestion() {
		if (this.player.turn === this.settings.amountOfQuestions) {
			this.player.formattedQuestion = `${this.player.playerName}! Это последний вопрос и вы можете стать Победителем Игры\n`;
			this.player.formattedQuestion += `Соберитесь с мыслями, последний вопрос на ${this.settings.monetaryAmount[this.player.turn]} кредитов\n`; 
		} else {
			let random = Math.trunc(Math.random() * (this.dialogGenerator.parenthesis.length - 0) + 0);
			this.player.formattedQuestion  = `${this.dialogGenerator.parenthesis[random]}${this.player.playerName}, `;
			random = Math.trunc(Math.random() * (this.dialogGenerator.youHave.length - 0) + 0);
			this.player.formattedQuestion += `${this.dialogGenerator.youHave[random]} ${this.player.moneyAmount} кредитов!\n`;
			random = Math.trunc(Math.random() * (this.dialogGenerator.it.length - 0) + 0);
			this.player.formattedQuestion += `${this.dialogGenerator.it[random]} ${this.player.turn} вопрос и `;
			random = Math.trunc(Math.random() * (this.dialogGenerator.onAStack.length - 0) + 0);
			this.player.formattedQuestion += `${this.dialogGenerator.onAStack[random]} ${this.settings.monetaryAmount[this.player.turn]} кредитов\n`;
		}

		this.player.formattedQuestion += `${this.player.bodyQA.question}\nВарианты ответов:\n`;		
		for (let i = 0; i < this.player.bodyQA.answers.length; i++) {
			this.player.formattedQuestion += `${i+1}: ${this.player.bodyQA.answers[i]}\n`;
		}
		this.player.formattedQuestion += `\nДля ввода предполагаемого вариант ответа введите число от 1 до 4.\n`;
		this.player.formattedQuestion += this.formStringLifelines();
		this.player.formattedQuestion += `\nЕсли вы желаете покинуть игру и забрать деньги, то введите -1\n`;
		this.player.formattedQuestion += `\nЛюбые другие введённые цифры будут неверными и приведут к проигрышу!`;
	},
	/**
	 * Метод, который будет определять сколько подсказок осталось у игрока и возвращать в виде строки
	 * чтобы приклеить их к информационному выводу
	 */
	formStringLifelines() {
		let avalaibleLifelinesString = '';
		if (this.player.avalaibleLifelines.length > 0) {
			avalaibleLifelinesString += '\nВы хотите использовать подсказку?\n';
			for (let i = 0; i < this.player.avalaibleLifelines.length; i++) {
				let lifeline = this.player.avalaibleLifelines[i];
				avalaibleLifelinesString += `Введите число ${lifeline.number} - "${lifeline.name}"\n`;
			}
		} else {
			avalaibleLifelinesString += 'Вы потратили все подсказки!';
		}
		return avalaibleLifelinesString;
	},
	/**
	 * В данный метод вынесена логика проверки хочет ли игрок покинуть игру или воспользоваться подсказкой. Сделан для того
	 * чтобы разгрузить метод run()
	 * @return {boolean} Возвращает TRUE когда введено значение, которое отличается или номеров подсказок (
	 * на текущий момент это 5, 6 и 7)
	 */
	checkIfLifeline() {
		while (true) {
			if (this.player.lifelinesRegisteredNumbers.includes(this.player.enteredAnswer)) {
				for (let i = 0; i < this.player.avalaibleLifelines.length; i++) {
					let numberOfIteratedLifeline = this.player.avalaibleLifelines[i].number;
					if (this.player.enteredAnswer === numberOfIteratedLifeline) {
						let lifelineMethod = this.player.avalaibleLifelines[i].methodName;
						// В этой строке используем метод объекта подсказок, опираясь на его имя, хранящееся в "БД"
						this.lifelines[lifelineMethod](this.player.bodyQA, this.player.turn);
						this.player.avalaibleLifelines.splice([i], 1);
						this.player.lifelinesRegisteredNumbers.splice([i], 1);
						this.formatQuestion();
					}
					break;
				}
				this.player.enteredAnswer = +prompt(this.player.formattedQuestion);
			} else {
				return true;
			}
		}
	}

};
// Сделать матрицу уникального приветствия для каждого хода с прибаутками и все такое
// Добавить недостающие или исправить некорректные места по JSDoc

///////////////////////////////////////////////////////////////////////////////////////////////////

// Задание № 1 (раскомментируйте, чтобы запустить) :
//console.log(convertNumToObj(+prompt('Введите число от 0 до 999')));

// Задание № 2 (раскомментируйте, чтобы запустить) :
//game.run();

// Задание № 3 (раскомментируйте, чтобы запустить) :
//gameMillionaire.run();
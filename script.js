class Calculator {
    constructor() {
        this.display = '0';
        this.previousValue = null;
        this.operation = null;
        this.waitingForOperand = false;
        this.memory = 0;
        this.history = [];
        this.currentMode = 'standard';
        
        this.initializeEventListeners();
        this.updateDisplay();
    }

    initializeEventListeners() {
        // Mode switching
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchMode(e.target.dataset.mode);
            });
        });

        // Keyboard support
        document.addEventListener('keydown', (e) => {
            this.handleKeyboard(e);
        });
    }

    switchMode(mode) {
        // Update active mode button
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-mode="${mode}"]`).classList.add('active');

        // Update active mode content
        document.querySelectorAll('.mode').forEach(modeEl => {
            modeEl.classList.remove('active');
        });
        
        const modeMap = {
            'standard': 'standardMode',
            'scientific': 'scientificMode',
            'history': 'historyMode'
        };
        
        document.getElementById(modeMap[mode]).classList.add('active');
        this.currentMode = mode;

        if (mode === 'history') {
            this.updateHistoryDisplay();
        }
    }

    handleKeyboard(e) {
        e.preventDefault();
        
        if (e.key >= '0' && e.key <= '9') {
            this.inputDigit(e.key);
        } else if (e.key === '.') {
            this.inputDecimal();
        } else if (e.key === '+') {
            this.setOperation('+');
        } else if (e.key === '-') {
            this.setOperation('-');
        } else if (e.key === '*') {
            this.setOperation('×');
        } else if (e.key === '/') {
            this.setOperation('÷');
        } else if (e.key === 'Enter' || e.key === '=') {
            this.calculate();
        } else if (e.key === 'Escape') {
            this.clearAll();
        } else if (e.key === 'Backspace') {
            this.backspace();
        } else if (e.key === 'Delete') {
            this.clearEntry();
        }
    }

    inputDigit(digit) {
        if (this.waitingForOperand) {
            this.display = digit;
            this.waitingForOperand = false;
        } else {
            this.display = this.display === '0' ? digit : this.display + digit;
        }
        this.updateDisplay();
    }

    inputDecimal() {
        if (this.waitingForOperand) {
            this.display = '0.';
            this.waitingForOperand = false;
        } else if (this.display.indexOf('.') === -1) {
            this.display += '.';
        }
        this.updateDisplay();
    }

    clearEntry() {
        this.display = '0';
        this.updateDisplay();
    }

    clearAll() {
        this.display = '0';
        this.previousValue = null;
        this.operation = null;
        this.waitingForOperand = false;
        this.updateDisplay();
    }

    backspace() {
        if (this.display.length > 1) {
            this.display = this.display.slice(0, -1);
        } else {
            this.display = '0';
        }
        this.updateDisplay();
    }

    toggleSign() {
        if (this.display !== '0') {
            this.display = this.display.startsWith('-') 
                ? this.display.slice(1) 
                : '-' + this.display;
        }
        this.updateDisplay();
    }

    setOperation(nextOperation) {
        const inputValue = parseFloat(this.display);

        if (this.previousValue === null) {
            this.previousValue = inputValue;
        } else if (this.operation) {
            const currentValue = this.previousValue || 0;
            const newValue = this.performCalculation(this.operation, currentValue, inputValue);
            
            this.display = this.formatNumber(newValue);
            this.previousValue = newValue;
            
            const expression = `${currentValue} ${this.operation} ${inputValue} = ${newValue}`;
            this.addToHistory(expression);
        }

        this.waitingForOperand = true;
        this.operation = nextOperation;
        this.updateDisplay();
    }

    calculate() {
        const inputValue = parseFloat(this.display);

        if (this.previousValue !== null && this.operation) {
            const newValue = this.performCalculation(this.operation, this.previousValue, inputValue);
            
            const expression = `${this.previousValue} ${this.operation} ${inputValue} = ${newValue}`;
            this.addToHistory(expression);
            
            this.display = this.formatNumber(newValue);
            this.previousValue = null;
            this.operation = null;
            this.waitingForOperand = true;
        }

        this.updateDisplay();
    }

    performCalculation(operation, firstOperand, secondOperand) {
        switch (operation) {
            case '+':
                return firstOperand + secondOperand;
            case '-':
                return firstOperand - secondOperand;
            case '×':
                return firstOperand * secondOperand;
            case '÷':
                return secondOperand !== 0 ? firstOperand / secondOperand : 0;
            case '^':
                return Math.pow(firstOperand, secondOperand);
            case 'mod':
                return firstOperand % secondOperand;
            default:
                return secondOperand;
        }
    }

    scientificFunction(func) {
        const inputValue = parseFloat(this.display);
        let result;
        let expression;

        switch (func) {
            case 'sin':
                result = Math.sin(inputValue * Math.PI / 180);
                expression = `sin(${inputValue}°) = ${this.formatNumber(result)}`;
                break;
            case 'cos':
                result = Math.cos(inputValue * Math.PI / 180);
                expression = `cos(${inputValue}°) = ${this.formatNumber(result)}`;
                break;
            case 'tan':
                result = Math.tan(inputValue * Math.PI / 180);
                expression = `tan(${inputValue}°) = ${this.formatNumber(result)}`;
                break;
            case 'ln':
                if (inputValue <= 0) {
                    this.display = 'Greška';
                    this.updateDisplay();
                    return;
                }
                result = Math.log(inputValue);
                expression = `ln(${inputValue}) = ${this.formatNumber(result)}`;
                break;
            case 'log':
                if (inputValue <= 0) {
                    this.display = 'Greška';
                    this.updateDisplay();
                    return;
                }
                result = Math.log10(inputValue);
                expression = `log(${inputValue}) = ${this.formatNumber(result)}`;
                break;
            case 'sqrt':
                if (inputValue < 0) {
                    this.display = 'Greška';
                    this.updateDisplay();
                    return;
                }
                result = Math.sqrt(inputValue);
                expression = `√(${inputValue}) = ${this.formatNumber(result)}`;
                break;
            case 'square':
                result = inputValue * inputValue;
                expression = `(${inputValue})² = ${this.formatNumber(result)}`;
                break;
            case 'cube':
                result = inputValue * inputValue * inputValue;
                expression = `(${inputValue})³ = ${this.formatNumber(result)}`;
                break;
            case 'reciprocal':
                if (inputValue === 0) {
                    this.display = 'Ne mogu deliti nulom';
                    this.updateDisplay();
                    return;
                }
                result = 1 / inputValue;
                expression = `1/(${inputValue}) = ${this.formatNumber(result)}`;
                break;
            case 'factorial':
                if (inputValue < 0 || inputValue !== Math.floor(inputValue) || inputValue > 170) {
                    this.display = 'Greška';
                    this.updateDisplay();
                    return;
                }
                result = this.factorial(inputValue);
                expression = `${inputValue}! = ${this.formatNumber(result)}`;
                break;
            case 'pi':
                result = Math.PI;
                expression = `π = ${this.formatNumber(result)}`;
                break;
            case 'e':
                result = Math.E;
                expression = `e = ${this.formatNumber(result)}`;
                break;
            case 'percent':
                result = inputValue / 100;
                expression = `${inputValue}% = ${this.formatNumber(result)}`;
                break;
            default:
                return;
        }

        this.display = this.formatNumber(result);
        this.waitingForOperand = true;
        this.addToHistory(expression);
        this.updateDisplay();
    }

    factorial(n) {
        if (n <= 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) {
            result *= i;
        }
        return result;
    }

    memoryOperation(operation) {
        const currentValue = parseFloat(this.display);

        switch (operation) {
            case 'MC':
                this.memory = 0;
                break;
            case 'MR':
                this.display = this.formatNumber(this.memory);
                this.waitingForOperand = true;
                break;
            case 'M+':
                this.memory += currentValue;
                break;
            case 'M-':
                this.memory -= currentValue;
                break;
            case 'MS':
                this.memory = currentValue;
                break;
            case 'M×':
                this.memory *= currentValue;
                break;
        }

        this.updateMemoryIndicator();
        this.updateDisplay();
    }

    addToHistory(expression) {
        this.history.unshift(expression);
        if (this.history.length > 50) {
            this.history.pop();
        }
    }

    clearHistory() {
        this.history = [];
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const historyList = document.getElementById('historyList');
        
        if (this.history.length === 0) {
            historyList.innerHTML = '<div class="no-history">Nema istorije kalkulacija</div>';
        } else {
            historyList.innerHTML = this.history
                .map(item => `<div class="history-item" onclick="calculator.useHistoryItem('${item}')">${item}</div>`)
                .join('');
        }
    }

    useHistoryItem(expression) {
        const result = expression.split(' = ')[1];
        if (result) {
            this.display = result;
            this.waitingForOperand = true;
            this.updateDisplay();
            this.switchMode('standard');
        }
    }

    formatNumber(num) {
        if (isNaN(num)) return 'Greška';
        if (!isFinite(num)) return '∞';
        
        if (num === Math.floor(num) && Math.abs(num) < 1e15) {
            return num.toString();
        }
        
        const str = num.toPrecision(12);
        return parseFloat(str).toString();
    }

    updateDisplay() {
        document.getElementById('display').textContent = this.display;
        
        let expression = '';
        if (this.previousValue !== null && this.operation) {
            expression = `${this.previousValue} ${this.operation}`;
        }
        document.getElementById('expression').textContent = expression;
    }

    updateMemoryIndicator() {
        const indicator = document.getElementById('memoryIndicator');
        if (this.memory !== 0) {
            indicator.style.display = 'block';
        } else {
            indicator.style.display = 'none';
        }
    }
}

// Global functions for button clicks
let calculator;

function inputDigit(digit) {
    calculator.inputDigit(digit);
}

function inputDecimal() {
    calculator.inputDecimal();
}

function setOperation(operation) {
    calculator.setOperation(operation);
}

function calculate() {
    calculator.calculate();
}

function clearEntry() {
    calculator.clearEntry();
}

function clearAll() {
    calculator.clearAll();
}

function backspace() {
    calculator.backspace();
}

function toggleSign() {
    calculator.toggleSign();
}

function scientificFunction(func) {
    calculator.scientificFunction(func);
}

function memoryOperation(operation) {
    calculator.memoryOperation(operation);
}

function clearHistory() {
    calculator.clearHistory();
}

// Initialize calculator when page loads
document.addEventListener('DOMContentLoaded', () => {
    calculator = new Calculator();
});
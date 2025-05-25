package main

import (
	"context"
	"embed"
	"fmt"
	"math"
	"strconv"
	"strings"
)

//go:embed all:frontend/dist
var assets embed.FS

type App struct {
	ctx context.Context
}

func NewApp() *App {
	return &App{}
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

type Calculator struct {
	display     string
	memory      float64
	history     []string
	lastResult  float64
	operation   string
	operand     float64
	waitingOp   bool
}

func NewCalculator() *Calculator {
	return &Calculator{
		display: "0",
		history: make([]string, 0),
	}
}

func (a *App) Calculate(operation string, operand1, operand2 float64) float64 {
	switch operation {
	case "+":
		return operand1 + operand2
	case "-":
		return operand1 - operand2
	case "×":
		return operand1 * operand2
	case "÷":
		if operand2 == 0 {
			return 0
		}
		return operand1 / operand2
	case "^":
		return math.Pow(operand1, operand2)
	case "mod":
		return math.Mod(operand1, operand2)
	default:
		return 0
	}
}

func (a *App) ScientificFunction(function string, value float64) float64 {
	switch function {
	case "sin":
		return math.Sin(value * math.Pi / 180)
	case "cos":
		return math.Cos(value * math.Pi / 180)
	case "tan":
		return math.Tan(value * math.Pi / 180)
	case "ln":
		if value <= 0 {
			return math.NaN()
		}
		return math.Log(value)
	case "log":
		if value <= 0 {
			return math.NaN()
		}
		return math.Log10(value)
	case "sqrt":
		if value < 0 {
			return math.NaN()
		}
		return math.Sqrt(value)
	case "square":
		return value * value
	case "cube":
		return value * value * value
	case "factorial":
		if value < 0 || value != math.Floor(value) || value > 170 {
			return math.NaN()
		}
		return factorial(int(value))
	case "reciprocal":
		if value == 0 {
			return math.Inf(1)
		}
		return 1 / value
	case "pi":
		return math.Pi
	case "e":
		return math.E
	default:
		return 0
	}
}

func factorial(n int) float64 {
	if n <= 1 {
		return 1
	}
	result := 1.0
	for i := 2; i <= n; i++ {
		result *= float64(i)
	}
	return result
}

func (a *App) FormatNumber(num float64) string {
	if math.IsInf(num, 0) {
		return "∞"
	}
	if math.IsNaN(num) {
		return "Greška"
	}
	
	if num == math.Floor(num) && math.Abs(num) < 1e15 {
		return fmt.Sprintf("%.0f", num)
	}
	
	str := fmt.Sprintf("%.10g", num)
	if len(str) > 15 {
		return fmt.Sprintf("%.6e", num)
	}
	return str
}

func main() {
	app := NewApp()
	
	err := wails.Run(&options.App{
		Title:            "Profesionalni Kalkulator",
		Width:            400,
		Height:           600,
		MinWidth:         350,
		MinHeight:        550,
		MaxWidth:         500,
		MaxHeight:        700,
		DisableResize:    false,
		Fullscreen:       false,
		Frameless:        false,
		StartHidden:      false,
		HideWindowOnClose: false,
		BackgroundColour: &options.RGBA{R: 15, G: 15, B: 25, A: 1},
		OnStartup:        app.startup,
		Assets:           assets,
		Ctx:              context.Background(),
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
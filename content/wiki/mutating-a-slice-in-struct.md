---
title: 'Mutating a slice in struct'
tags: ["golang"]
---

```go
package main

import "fmt"

type Bar struct {
	Bar string
}

type Bars []Bar

type Foo struct {
	Bars Bars
}

func main() {
	f := Foo{Bars: []Bar{{Bar: "ege"}}}
	fmt.Printf("Foo: %+v\n", f)
	for _, e := range f.Bars {
		e.Bar = "gule"
	}
	fmt.Printf("Foo: %+v\n", f)

	f = Foo{Bars: []Bar{{Bar: "ege"}}}
	fmt.Printf("Foo: %+v\n", f)
	for i, _ := range f.Bars {
		x := &f.Bars[i]
		x.Bar = "gule"
	}
	fmt.Printf("Foo: %+v\n", f)
}
```

```
Foo: {Bars:[{Bar:ege}]}
Foo: {Bars:[{Bar:ege}]}
Foo: {Bars:[{Bar:ege}]}
Foo: {Bars:[{Bar:gule}]}
```

package main

import (
    "fmt"
    "html/template"
    "net/http"
)

func index(w http.ResponseWriter, r *http.Request) {
    t := template.Must(template.ParseFiles("index.html"))
    t.Execute(w, "")
}
 
func main() {
    //Directorios que ayudan a encontrar los archivos dentro de carpetas
    http.Handle("/codemirror/", http.StripPrefix("/codemirror/", http.FileServer(http.Dir("codemirror/"))))
    http.Handle("/css/", http.StripPrefix("/css/", http.FileServer(http.Dir("css/"))))
    http.Handle("/js/", http.StripPrefix("/js/", http.FileServer(http.Dir("js/"))))

    http.HandleFunc("/", index)
    fmt.Printf("Servidor GO escuchando en: http://localhost:8000/ ")
    http.ListenAndServe(":8000", nil)
}
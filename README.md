
# Deploy
https://rent-car-grupa-4.herokuapp.com/
# Funkcjonalność
Aplikacja daje możliwość wyświetlenia listy wszystkich klientów wypożyczalni oraz listy wszystkich samochodów. Lista klientów musi zawierać: Id klienta, jego imię i nazwisko oraz datę uzyskania prawa jazdy. Lista samochodów musi zawierać Id samochodu, markę wraz z modelem, segment, rodzaj paliwa, cenę wypożyczenia za dobę oraz status. Ponadto aplikacja daje możliwość wypożyczenia samochodu przez Klienta. Wybieramy Klienta, którego obsługujemy. Następnie wprowadzamy preferencje Klienta, tzn: segment samochodu jaki chce wypożyczyć, rodzaj paliwa pojazdu oraz oczywiście okres (ilość dni) na jaki pragnie wypożyczyć samochód. Jeżeli w aktualnie w ofercie posiadamy samochód spełniający kryteria Klienta, następuje proces wypożyczenia i wyświetlamy wszystkie dane na temat wypożyczenia: Data wypożyczenia, Imię i nazwisko Klienta, Data zwrotu pojazdu, marka i model pojazdu oraz całkowitą cenę za wypożyczenie. Jeżeli nie mamy aktualnie w ofercie pojazdu spełniającego kryteria, wyświetlamy informacje o braku odpowiedniego samochodu. Nastepnie ponownie dajemy możliwość zawarcia innego wypożyczenia.

## Zasady dotyczące wypożyczenia !!!
- Jeżeli Klient posiada prawo jazdy mniej niż 4 lata, wówczas całkowita cena za wypożyczenie wzrasta o 20%.
- Jeżeli Klient wypożycza samochód na okres dłuższy niż 7 dni wówczas otrzymuje jedną dobę wypożyczenia gratis.
- Jeżeli Klient wypożycza samochód na okres dłuższy niż 30 dni wówczas otrzymuje 3 doby wypożyczenia gratis.
- Jeżeli Klient posiada prawo jazdy mniej niż 4 lata, nie może wypożyczyć samochodu segmentu premium.



## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
#� �W�y�p�o�-�y�c�z�a�l�n�i�a�-�s�a�m�o�c�h�o�d�-�w�
�
�
Funkcjonalność

# [Описание задания](DESCRIPTION.md)

## Getting started

```sh
  git clone git@github.com:Caranell/Quadcode-test-task.git
  ./copyConfigs.sh
```

Для запуска приложения необходим `Docker`

### Development mode

```sh
  docker-compose up -d --build
```

Приложение будет доступно на [localhost](http://localhost:3000)

### Production mode
```sh
  docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
```

Приложение будет доступно на [localhost](http://localhost:8080)

Схема API сделана через swagger и доступна на [данной странице](http://localhost:3002/api)

---

Сделал функционал, показавшийся мне логичным:
  - удаление шаров, если настроки корзины меняются
  - запрет на создание корзин с дублирующимися настройками -- можно разрешить дубли, но тогда в текущей реализации необходимо будет добавить распределение между "одинаковыми" корзинами (напр., чтобы в них всегда было +-1 одинаковое количество шаров), иначе шары будут класться в первую нашедшуюся в бд корзину.
  - т.к. корзины и шары должны обладать одинаковыми характеристиками для соотношения, наследовал обе эти сущности от одного класса `BallConfiguration`.

---
### Troubleshooting

_Иногда при билде бэка возникает ошибка подключения к базе (не нашел закономерности, чтобы вычислить), в таком случае нужно сделать_
```sh
docker exec -it backend /bin/sh
yarn db:cli schema:sync
yarn db:migrate
```

---

_[Оффтоп о возможном бизнес-требовании с приоритезацией весов](OFFTOP.md)_
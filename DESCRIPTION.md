# Test, backend, chats

## Задание

- **Продуктовая задача.** Есть разные шары и корзины для них. Нужно уметь класть шары в нужные корзины
- **Технологии** Node.js, PostgreSQL, остальное вы выбираете сами. TypeScript будет бонусом
- **Аналог бизнес-логики, имеющий смысл** Задание является сильно упрощённым и абстрагированным вариантом распределения чатов на операторов

У шаров есть набор параметров: цвет, размер и т.д. (несколько на ваш выбор, пусть будут и enum и булевые). Ответственность сервиса — хранить настройки матчинга для корзин по этим параметрам. Корзин конечное кол-во, каждая из них может быть настроена принимать шары определенных параметров, матчинг строгий (красные большие шары в корзину для красных больших), все параметры матчинга обязательно должны присутствовать.

Результатом задания должен быть сервис с возможностью получить и установить настройки для корзин, запросить как выбор корзины для конкретного шара, так и шара (одного или нескольких) для размещения в корзину. В общей сложности ~4 эндпоинта. Код и инструкцию для запуска предоставить через github.com.

## На что будем смотреть

- Инструкция для запуска, как в прод, так и для разработки. README.md
- Схема публичного интерфейса сервиса
- Валидация входных параметров и ошибки
- Тесты относительно публичного интерфейса сервиса
- Подход к работе с базой
- Наличие кодстайла и инструментов его контроля
- Разделение на абстракции, отделение логики от представления
- Предусмотрена ли возможность поднять несколько инстансов сервиса
- Простота понимания кода и внесения изменений. Будем моделировать ситуацию изменения или дополнения бизнес требований (добавление новых параметров распределения, переход от строгого матчинга к приоритезации через веса для отдельных параметров)

В readme можете указать технические решения, на которые нам стоит обратить внимание при ревью.

***Bonus:*** Реализация фронта для настроек
import { extraParams } from "./baseInfo/carParams";
export default [
  {
    key: "main",
    title: (options) =>
      "Pogrooz - сервис поиска заказа, предложения или водителя на перевозку груза",
    descriptions: (options) =>
      `Более сотни заказов и предложений на перевозку груза в твоем городе. На Pogrooz Вы можете найти подходящего водителя на перевозку груза. Отличные цены на грузоперевозку без посредников. Объявления от водителей напрямую: поиск по городу, области, улице, дому, весу, объему, типу груза и другим параметрам.`,
  },
  {
    key: "orderSearch",
    title: (options) =>
      `${options.city
        ? `Найти заказ на перевозку груза${options.city ? " из " + options.city : ""
        }`
        : `Найти заказ на перевозку груза по Росcии`
      } | Pogrooz - Попутные перевозки`,
    descriptions: (options) =>
      `${options.city
        ? `Заказы на перевозку груза${options.city ? " из " + options.city : ""
        }.`
        : `Заказы на перевозку груза по Росcии.`
      } На Pogrooz Вы можете найти подходящий заказ на перевозку груза, выбрав предложения без посредников. Цены на грузоперевозку. Объявления от клиентов напрямую: поиск по городу, области, улице, дому, весу, объему, типу груза и другим параметрам.`,
  },
  {
    key: "offerSearch",
    title: (options) =>
      `Найти предложение или водителя на перевозку груза ${options.city ? "из " + options.city : "по России"
      } | Pogrooz - Попутные перевозки`,
    descriptions: (options) =>
      `${options.city && options.count
        ? `Предложения на перевозку груза ${options.city ? "из " + options.city : " по Росии"
        }.`
        : `Предложения на перевозку груза по Росcии`
      } На Pogrooz Вы можете найти подходящего водителя на перевозку груза, выбрав предложения без посредников. Цены на грузоперевозку. Объявления от водителей напрямую: поиск по городу, области, улице, дому, весу, объему, типу груза и другим параметрам.`,
  },
  {
    key: "order",
    title: (options) =>
      `Заказ на перевозку груза: ${options.cargoTypes}. Из ${options.start} до ${options.finish} | Pogrooz`,
    descriptions: (options) =>
      `Заказ на перевозку груза:из ${options.start} до ${options.finish}.  ${options.tags.map((item, index, all) => {
        return (
          extraParams.find((itemX) => item.id === itemX.id).name +
          (all.length - 1 === index ? "." : "")
        );
      })} Самые ВЫГОДНЫЕ ЗАКАЗЫ на перевозку груза на Pogrooz. ${options.comment
      }`,
  },
  {
    key: "offer",
    title: (options) =>
      `Предложение на перевозку груза: ${options.cargoTypes}. Из ${options.start} до ${options.finish
      }  | Pogrooz`,
    descriptions: (options) =>
      `Предложение на перевозку груза:из ${options.start} до ${options.finish}. ${options.tags.map((item, index, all) => {
        return (
          extraParams.find((itemX) => item.id === itemX.id).name +
          (all.length - 1 === index ? "." : "")
        );
      })} Самые ВЫГОДНЫЕ ПРЕДЛОЖЕНИЯ и ЛУЧШИЕ ВОДИТЕЛИ на перевозку груза на Pogrooz. ${options.comment
      }`,
  },
  {
    key: "user",
    title: (options) =>
      `Профиль пользователя ${options.fio} на сайте Pogrooz. Контакты, свежие заказы (или предложения) на перевозку, история и рейтинг пользователя.`,
    descriptions: (options) =>
      `${options.fio}, ${options.type}, рейтинг:${options.rating}${options.address ? ", " + options.address : "."
      }`,
  },
  {
    key: "faq",
    title: (options) =>
      `Частые вопросы о портале | Pogrooz - Попутные перевозки`,
    descriptions: (options) =>
      `Что такое PoGrooz?Попутные грузоперевозки с PoGrooz – это шаг в будущее удобных грузоперевозок. Зачем заказывать услуги транспортных компаний и переплачивать за перевозку, когда можно найти попутную машину и договриться с водителе напрямую! Зачем бесконечно регистрироваться на сайтах объявлений или отдавать большую часть прибыли компании, когда можно один раз зарегистрироваться на сайте PoGrooz или в приложении PoGrooz и искать грузовладельцев быстро и просто!`,
  },
  {
    key: "questions",
    title: (options) =>
      `${options.partial} | Частые вопросы о портале | Pogrooz - Попутные перевозки`,
    descriptions: (options) => `${options.text}`,
  },
  {
    key: "tariffs",
    title: (options) => `Тарифы для подключения водителей PoGrooz`,
    descriptions: (options) =>
      `Оптимальный Тариф PRO в размере 140 руб в неделю. Тариф рассчитывается понедельно. При регистрации перевозчика он может активировать Тариф ДЕМО режим на 1 неделю. Далее необходимо продлить тариф. Историю и данные по текущему тарифу Вы можете посмотреть на странице Тарифы. У вас есть возможность купить тариф (на 1 неделю, месяц, 3 месяца, полгода и год). При оплате Тарифа PRO от 3 до 12 месяцев дается скидка от 10 до 20%.`,
  },
  {
    key: "cargo",
    title: (options) =>
      `БЕСПЛАТНО найти предложение или водителя на перевозку груза | Pogrooz - Попутные перевозки`,
    descriptions: (options) =>
      `Более 100 предложений на перевозку груза в Вашем городе! На Pogrooz Вы можете найти подходящего водителя на перевозку груза, выбрав предложения без посредников. Цены на грузоперевозку. Объявления от водителей напрямую: поиск по городу, области, улице, дому, весу, объему, типу груза и другим параметрам.`,
  },
  {
    key: "carrier",
    title: (options) =>
      `Найти заказ на перевозку груза БЫСТРО и НАДЕЖНО | Pogrooz - Попутные перевозки`,
    descriptions: (options) =>
      `Более 100 предложений на перевозку груза в Вашем городе! На Pogrooz Вы можете найти подходящий заказ на перевозку груза, выбрав предложения без посредников. Цены на грузоперевозку. Объявления от заказчиков напрямую: поиск по городу, области, улице, дому, весу, объему, типу груза и другим параметрам.`,
  },
  {
    key: "page",
    title: (options) => `${options.title} | Pogrooz - Попутные перевозки`,
    descriptions: (options) => options.content,
  },
];
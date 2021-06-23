This is a demo project for [@JBtje/Vue3PDF](https://github.com/JBtje/vue3pdf). This project is based upon Laravel 8 and
Vue 3 (with Typescript). It contains some extra packages like dayjs, vue-i18n, axios, etc.

Download

```
git clone git@github.com:JBtje/vue3pdf-demo.git
```

Install Composer

```
composer install
```

The below commands will copy the .env.example to .env, and fill in the secrets.

```
cp .env.example .env
php artisan key:generate
```

Install NPM

```
npm install
```

Run migrations (database is not needed for this demo)

```
php artisan migrate --seed
```

Deploy application using

```
sh deploy.sh
```

![Demo](https://github.com/JBtje/vue3pdf-demo/raw/master/demo.png "Demo")
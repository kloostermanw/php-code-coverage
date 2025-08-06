FROM php:8.4-cli

COPY entrypoint.php /entrypoint.php
COPY ./src /src

RUN composer install  \
    --ignore-platform-reqs \
    --no-ansi \
    --no-dev \
    --no-autoloader \
    --no-interaction \
    --no-scripts

RUN composer dump-autoload --optimize --no-dev --no-scripts

RUN chmod +x /entrypoint.php

ENTRYPOINT ["/entrypoint.php"]
FROM php:8.4-cli

# Create app directory
WORKDIR /app

# Copy composer.json and source files
COPY composer.json /app/
COPY ./src /app/src
COPY entrypoint.php /app/entrypoint.php

# Install composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install dependencies
RUN composer install  \
    --ignore-platform-reqs \
    --no-ansi \
    --no-dev \
    --no-autoloader \
    --no-interaction \
    --no-scripts

RUN composer dump-autoload --optimize --no-dev --no-scripts

RUN chmod +x /app/entrypoint.php

ENTRYPOINT ["/app/entrypoint.php"]
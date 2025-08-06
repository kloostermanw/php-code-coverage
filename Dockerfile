FROM php:8.4-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && docker-php-ext-install zip \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy composer.json and source files
COPY composer.json /app/

COPY ./src /app/src
COPY entrypoint.php /app/entrypoint.php

# Install composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Install dependencies
RUN composer install

RUN composer dump-autoload --optimize --no-dev --no-scripts

RUN chmod +x /app/entrypoint.php

ENTRYPOINT ["/app/entrypoint.php"]
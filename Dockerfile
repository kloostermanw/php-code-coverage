FROM php:8.4-cli

COPY entrypoint.php /entrypoint.php
RUN chmod +x /entrypoint.php

ENTRYPOINT ["/entrypoint.php"]
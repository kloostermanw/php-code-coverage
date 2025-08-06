#!/usr/bin/env php
<?php

use KloostermanW\Coverage\Application;

include 'vendor/autoload.php';

$args = [
    "name" => getenv('INPUT_FILE'),
];

$application = new Application($args);
echo $application->run();

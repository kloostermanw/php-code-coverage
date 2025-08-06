<?php

namespace KloostermanW\Coverage;

class Application
{
    protected array $args;

    public function __construct(array $args)
    {
        $this->args = $args;
    }

    public function run(): string
    {
        return "Hello World";
    }
}
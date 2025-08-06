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
        $threshold = 70;

        $coverage = simplexml_load_string(file_get_contents($this->args['file']));
        $ratio = (double) ($coverage->project->metrics["coveredstatements"] / $coverage->project->metrics["statements"] * 100);

        echo sprintf('Line coverage: %s%%', $ratio);
        echo sprintf('Threshold: %s%%', $threshold);

        if ($ratio < $threshold) {
            echo "FAILED!";
            exit(-1);
        }

        echo "SUCCESS!";
    }
}
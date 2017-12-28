<?php
namespace torneo\V1\Rest\Fixture;

class FixtureResourceFactory
{
    public function __invoke($services)
    {
        // return new FixtureResource();
        $mapper = $services->get('torneo\V1\Rest\Fixture\FixtureMapper');
        return new FixtureResource($mapper);

    }
}

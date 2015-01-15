<?php

    $a = 2;
    $array()

    $tabell = array(2,4,5,2,1);
    //lengden i et array => count($tabell);

    foreach ($tabell as $verdi) {
        echo $verdi; //skriver ut verdien i tabell[index]
    }

    foreach($tabell as $index => $verdi) {
        echo "$index -> $verdi"; //skriver ut index i tilleg til verdien av index
    }

    $tabell[] = "her er et nytt element bakerst i tabellen";

    unset($tabell[$pososjon]); //sette verdien i index til null

    $nyarray= array(
            "verdinavn" => 3,
            "daddr" => "hovebakken 34",
            "postnr" => 4332
    );

    echo $nyarray["verdinavn"];

    sort($tabell);  //sortere array. mange forskjellige ---> rsort(), asort(), arsort(), ksort(), krsort()
    var_dump($tabell); //skrive ut array/objekt
    print_r($tabell); ////skrive ut array/objekt


    implode(":", $tabell); //skriv ut verdiene i aray med : i mellom
    explode(" ", $tabell);  //lager et nytt array fra en streng
    array_sum($tabell);
    in_array(2, $tabell); //bool if exist

    Matrise =>              //array inni arrayet
        $matrix = array(
        "oslo" => array(
            "innbyggere"=>500000,
            "Studenter"=>30000);
    );
    echo $matrix["oslo"]["innbyggere"];

    $test = range(1,5) //nytt array fra 1 til 5
?>

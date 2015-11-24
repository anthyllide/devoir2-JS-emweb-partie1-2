<?php

//Création de l'array de corespondance des notes
$note = array(
'Do' => 'C',
'Ré' => 'D',
'Mi' => 'E',
'Fa' => 'F',
'Sol' => 'G',
'La' => 'A',
'Si' => 'B',
'Do' => 'C'
);

    
    echo 'La notation américaine pour la note '.$_GET['note'].' est '.$note[$_GET['note']].' .';


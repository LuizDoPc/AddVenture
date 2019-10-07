<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Fase 0</title>
</head>
<body>
    <form action="" method="post">
        Nome: <input type="text" name="nome" id="nome"> <br>
        E-mail: <input type="email" name="email" id="email"> <br>
        <input type="submit" value="Enviar">
    </form>

    <hr>

    <?php
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $nome = strtoupper($_POST['nome']);
            $email = strtoupper($_POST['email']);

            echo "O e-mail <strong>{$email}</strong> pertence a <strong>{$nome}</strong>";
        }
    ?>

</body>
</html>
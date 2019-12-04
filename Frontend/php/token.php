<?php
  session_start();

  function tokenControl ($request, $token='') {
    switch ($request) {
      case 'has-token':
        if (isset($_SESSION['token'])) return $_SESSION['token'];
        else return false;
      break;

      case 'new-session':
        $_SESSION['token'] = $token;
        return true;
      break;
    }

    return null;
  }

  $request = isset($_POST['request']) && !empty($_POST['request']) ? $_POST['request'] : '';
  $token = isset($_POST['token']) && !empty($_POST['token']) ? $_POST['token'] : '';

  echo tokenControl ($request, $token);
?>
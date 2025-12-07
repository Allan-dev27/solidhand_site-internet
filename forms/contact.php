<?php
/**
 * Formulaire de contact - Version gratuite
 * Ne nécessite pas de bibliothèque externe
 */

// Configuration
$receiving_email_address = 'associationleqg@gmail.com';
$success_message = 'Votre message a été envoyé avec succès. Merci de nous avoir contactés !';
$error_message = 'Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer.';

// Headers pour la réponse JSON
header('Content-Type: application/json');

// Fonction de validation d'email
function isValidEmail($email) {
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}

// Fonction de nettoyage des données
function cleanInput($data) {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    return $data;
}

// Fonction anti-spam simple (honeypot et délai)
function checkSpam() {
    // Vérifier si le champ honeypot est rempli (invisible pour les humains)
    if (!empty($_POST['website'])) {
        return true;
    }
    
    // Vérifier le temps de soumission (minimum 3 secondes)
    if (isset($_POST['form_time'])) {
        $form_time = (int)$_POST['form_time'];
        $current_time = time();
        if (($current_time - $form_time) < 3) {
            return true;
        }
    }
    
    return false;
}

// Vérifier si c'est une requête POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit;
}

try {
    // Vérification anti-spam
    if (checkSpam()) {
        http_response_code(403);
        echo json_encode(['success' => false, 'message' => 'Activité suspecte détectée']);
        exit;
    }

    // Récupération et validation des données
    $name = isset($_POST['name']) ? cleanInput($_POST['name']) : '';
    $email = isset($_POST['email']) ? cleanInput($_POST['email']) : '';
    $subject = isset($_POST['subject']) ? cleanInput($_POST['subject']) : '';
    $message = isset($_POST['message']) ? cleanInput($_POST['message']) : '';

    // Validation des champs requis
    $errors = [];

    if (empty($name) || strlen($name) < 2) {
        $errors[] = 'Le nom doit contenir au moins 2 caractères';
    }

    if (empty($email) || !isValidEmail($email)) {
        $errors[] = 'Veuillez entrer une adresse email valide';
    }

    if (empty($subject) || strlen($subject) < 4) {
        $errors[] = 'Le sujet doit contenir au moins 4 caractères';
    }

    if (empty($message) || strlen($message) < 10) {
        $errors[] = 'Le message doit contenir au moins 10 caractères';
    }

    // Si des erreurs de validation
    if (!empty($errors)) {
        http_response_code(400);
        echo json_encode([
            'success' => false,
            'message' => implode('. ', $errors)
        ]);
        exit;
    }

    // Préparation de l'email
    $to = $receiving_email_address;
    $email_subject = "Contact Le QG: $subject";
    
    // Corps de l'email en HTML
    $email_body = "
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset='UTF-8'>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #0d42ff; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f7f9fc; padding: 20px; margin-top: 20px; }
            .field { margin-bottom: 15px; }
            .label { font-weight: bold; color: #001973; }
            .value { margin-top: 5px; padding: 10px; background-color: white; border-left: 3px solid #0d42ff; }
            .footer { margin-top: 20px; padding: 15px; text-align: center; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class='container'>
            <div class='header'>
                <h2>Nouveau message depuis Le QG</h2>
            </div>
            <div class='content'>
                <div class='field'>
                    <div class='label'>Nom:</div>
                    <div class='value'>" . htmlspecialchars($name) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Email:</div>
                    <div class='value'>" . htmlspecialchars($email) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Sujet:</div>
                    <div class='value'>" . htmlspecialchars($subject) . "</div>
                </div>
                <div class='field'>
                    <div class='label'>Message:</div>
                    <div class='value'>" . nl2br(htmlspecialchars($message)) . "</div>
                </div>
            </div>
            <div class='footer'>
                <p>Ce message a été envoyé depuis le formulaire de contact du site Le QG</p>
                <p>Date: " . date('d/m/Y à H:i:s') . "</p>
            </div>
        </div>
    </body>
    </html>
    ";

    // Headers de l'email
    $headers = "MIME-Version: 1.0" . "\r\n";
    $headers .= "Content-type: text/html; charset=UTF-8" . "\r\n";
    $headers .= "From: " . $name . " <" . $email . ">" . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Envoi de l'email
    $mail_sent = mail($to, $email_subject, $email_body, $headers);

    if ($mail_sent) {
        // Enregistrer dans un fichier log (optionnel)
        $log_entry = date('[Y-m-d H:i:s]') . " Message de: $name ($email) - Sujet: $subject\n";
        file_put_contents('contact_logs.txt', $log_entry, FILE_APPEND);

        http_response_code(200);
        echo json_encode([
            'success' => true,
            'message' => $success_message
        ]);
    } else {
        throw new Exception('Échec de l\'envoi de l\'email');
    }

} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => $error_message
    ]);
    
    // Logger l'erreur
    error_log("Erreur formulaire contact: " . $e->getMessage());
}
?>
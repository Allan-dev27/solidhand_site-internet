/**
 * Gestion du formulaire de contact
 */
(function() {
  "use strict";

  // Sélectionner le formulaire
  const contactForm = document.querySelector('.php-email-form');

  if (contactForm) {
    // Ajouter un champ caché pour le timestamp (anti-spam)
    const formTimeInput = document.createElement('input');
    formTimeInput.type = 'hidden';
    formTimeInput.name = 'form_time';
    formTimeInput.value = Math.floor(Date.now() / 1000);
    contactForm.appendChild(formTimeInput);

    // Ajouter un champ honeypot (invisible, anti-spam)
    const honeypotInput = document.createElement('input');
    honeypotInput.type = 'text';
    honeypotInput.name = 'website';
    honeypotInput.style.display = 'none';
    honeypotInput.tabIndex = -1;
    honeypotInput.autocomplete = 'off';
    contactForm.appendChild(honeypotInput);

    // Gestionnaire de soumission
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      // Éléments du formulaire
      const submitButton = contactForm.querySelector('button[type="submit"]');
      const loadingDiv = contactForm.querySelector('.loading');
      const errorDiv = contactForm.querySelector('.error-message');
      const sentDiv = contactForm.querySelector('.sent-message');

      // Récupérer les données du formulaire
      const formData = new FormData(contactForm);

      // Validation côté client
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');

      // Fonction de validation d'email
      function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      }

      // Vérifications
      if (!name || name.trim().length < 2) {
        displayError('Veuillez entrer un nom valide (minimum 2 caractères)');
        return;
      }

      if (!email || !isValidEmail(email)) {
        displayError('Veuillez entrer une adresse email valide');
        return;
      }

      if (!subject || subject.trim().length < 4) {
        displayError('Veuillez entrer un sujet (minimum 4 caractères)');
        return;
      }

      if (!message || message.trim().length < 10) {
        displayError('Veuillez entrer un message (minimum 10 caractères)');
        return;
      }

      // Masquer les messages précédents
      hideMessages();

      // Désactiver le bouton et afficher le chargement
      submitButton.disabled = true;
      if (loadingDiv) loadingDiv.style.display = 'block';

      // Envoyer les données
      fetch(contactForm.action, {
        method: 'POST',
        body: formData
      })
      .then(response => {
        // Vérifier le statut de la réponse
        if (!response.ok) {
          return response.json().then(data => {
            throw new Error(data.message || 'Erreur lors de l\'envoi');
          });
        }
        return response.json();
      })
      .then(data => {
        // Masquer le chargement
        if (loadingDiv) loadingDiv.style.display = 'none';
        
        // Réactiver le bouton
        submitButton.disabled = false;

        if (data.success) {
          // Afficher le message de succès
          if (sentDiv) {
            sentDiv.textContent = data.message;
            sentDiv.style.display = 'block';
          }

          // Réinitialiser le formulaire
          contactForm.reset();
          
          // Mettre à jour le timestamp
          formTimeInput.value = Math.floor(Date.now() / 1000);

          // Masquer le message après 5 secondes
          setTimeout(() => {
            if (sentDiv) sentDiv.style.display = 'none';
          }, 5000);
        } else {
          displayError(data.message || 'Une erreur est survenue');
        }
      })
      .catch(error => {
        // Masquer le chargement
        if (loadingDiv) loadingDiv.style.display = 'none';
        
        // Réactiver le bouton
        submitButton.disabled = false;

        // Afficher l'erreur
        displayError(error.message || 'Erreur de connexion. Veuillez réessayer.');
      });
    });

    // Fonction pour afficher un message d'erreur
    function displayError(message) {
      const errorDiv = contactForm.querySelector('.error-message');
      if (errorDiv) {
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';

        // Masquer après 5 secondes
        setTimeout(() => {
          errorDiv.style.display = 'none';
        }, 5000);
      } else {
        alert(message);
      }
    }

    // Fonction pour masquer tous les messages
    function hideMessages() {
      const loadingDiv = contactForm.querySelector('.loading');
      const errorDiv = contactForm.querySelector('.error-message');
      const sentDiv = contactForm.querySelector('.sent-message');

      if (loadingDiv) loadingDiv.style.display = 'none';
      if (errorDiv) errorDiv.style.display = 'none';
      if (sentDiv) sentDiv.style.display = 'none';
    }

    // Validation en temps réel (optionnel)
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', function() {
        validateField(this);
      });
    });

    function validateField(field) {
      const value = field.value.trim();
      const fieldName = field.name;

      // Supprimer les messages d'erreur précédents
      const existingError = field.parentElement.querySelector('.field-error');
      if (existingError) {
        existingError.remove();
      }

      let errorMessage = '';

      switch(fieldName) {
        case 'name':
          if (value.length < 2) {
            errorMessage = 'Le nom doit contenir au moins 2 caractères';
          }
          break;
        case 'email':
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
            errorMessage = 'Email invalide';
          }
          break;
        case 'subject':
          if (value.length < 4) {
            errorMessage = 'Le sujet doit contenir au moins 4 caractères';
          }
          break;
        case 'message':
          if (value.length < 10) {
            errorMessage = 'Le message doit contenir au moins 10 caractères';
          }
          break;
      }

      if (errorMessage) {
        const errorSpan = document.createElement('span');
        errorSpan.className = 'field-error';
        errorSpan.style.color = '#df1529';
        errorSpan.style.fontSize = '12px';
        errorSpan.style.display = 'block';
        errorSpan.style.marginTop = '5px';
        errorSpan.textContent = errorMessage;
        field.parentElement.appendChild(errorSpan);
        field.style.borderColor = '#df1529';
      } else {
        field.style.borderColor = '';
      }
    }
  }

})();
// Form submit functie
    document.getElementById('contactForm').addEventListener('submit', function(e) {
      e.preventDefault();
      document.getElementById('successMsg').classList.add('show');
      this.reset();
      
      // Verberg bericht na 5 seconden
      setTimeout(function() {
        document.getElementById('successMsg').classList.remove('show');
      }, 5000);
    });
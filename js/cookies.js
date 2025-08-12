document.addEventListener("DOMContentLoaded", function () {
  const consent = localStorage.getItem("cookies_consent");

  if (!consent) {
    // Cargar el banner
    fetch("/componentes/banner-cookies.html")
      .then(res => res.text())
      .then(html => {
        document.getElementById("contenedor-cookies").innerHTML = html;

        // Esperar a que se inserte el HTML antes de añadir eventos
        setTimeout(() => {
          const btnAceptar = document.getElementById("btn-aceptar");
          const btnRechazar = document.getElementById("btn-rechazar");
          const banner = document.getElementById("cookieBanner");

          if (btnAceptar && btnRechazar && banner) {
            btnAceptar.addEventListener("click", () => {
              localStorage.setItem("cookies_consent", "accepted");
              banner.style.display = "none";
            });

            btnRechazar.addEventListener("click", () => {
              localStorage.setItem("cookies_consent", "rejected");
              banner.style.display = "none";
            });
          } else {
            console.warn("Elementos del banner de cookies no encontrados.");
          }
        }, 100);
      })
      .catch(err => console.error("❌ Error al cargar el banner de cookies:", err));
  }
});

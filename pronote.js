function activePornote() {
    chrome.storage.sync.set({ isPornoteActivated: true });
    console.log("button activated");
  
      chrome.storage.sync.get([
          'customLogo',
          'customColorPrimary',
          'customColorSecondary',
          'customColorTerciary'
      ], function(param) {
  
          // Logo en haut à droite
          const imgTop = document.getElementsByClassName('Image_Logo_PronoteBarreHaut')[0]
          imgTop.style.backgroundImage = param.customLogo
  
          // changer le gif
          gif_element_ids = ["id_16", "id_8_image"] // id des gifs sur les différentes pages
          const gif = document.querySelectorAll(gif_element_ids.map(id => `#${id}`).join(', '))[0];
          if (gif) {
              const width = gif.clientWidth;
              gif.src = "https://attraptemps.fr/wp-content/uploads/2017/12/poste-developpeur-integrateur.gif"; // TODO : a stocker en local
              gif.style.width = `${width}px`;
              gif.style.height = 'auto';
          }
  
          // changer le titre de la page
          const name = document.querySelector('.ibe_util_texte.ibe_actif');
          if (name) {
              console.log(name);
              name.innerHTML = name.innerHTML +" - EL PATRON";
          }
      });
  }

  setTimeout(activePornote, 5000);
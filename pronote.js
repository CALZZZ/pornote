function activePornote() {
    // changer le titre de la page
    const name = document.querySelector('.ibe_util_texte.ibe_actif');
    if (name) {
        console.log(name);
        name.innerHTML = name.innerHTML + " - EL PATRON";
    }
}

setTimeout(activePornote, 5000);
function toggleBurgerMenu() {

    document.getElementById("onBurgerMenu").classList.toggle('toggle_burger_menu');
    document.getElementById("offBurgerMenu").classList.toggle('toggle_burger_menu');
}



let ifeefgood = new Audio('/sounds/james-brown-i-feel-good.mp3')
function playSound() {
    ifeefgood.play();

}
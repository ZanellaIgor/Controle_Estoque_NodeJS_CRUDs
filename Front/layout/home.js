// Selecionar todos os elementos com a classe "menu-title"
const menuTitles = document.querySelectorAll('.container-menu');

// Adicionar um evento de clique a cada elemento
menuTitles.forEach(menuTitle => {
    menuTitle.addEventListener('click', () => {
        // Encontrar o submenu correspondente
        let submenu = menuTitle.querySelector('.sub-menu');

        // Alternar a exibição do submenu
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';

    
        // Adicionar ou remover a classe "active" para realçar o item de menu
        submenu.classList.toggle('active');
    });
});

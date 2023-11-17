//JSON Array

function showflexbasket(){
    document.getElementById('flexbasket').classList.add('flexbasketvisible');
    document.getElementById('restaurantsection').classList.add('blurdiv');
    document.getElementById('asidebasket').classList.add('blurdiv');
    document.getElementById('footerid').classList.add('blurdiv');
}

function closebasket(){
    document.getElementById('flexbasket').classList.remove('flexbasketvisible');
    document.getElementById('restaurantsection').classList.remove('blurdiv');
    document.getElementById('asidebasket').classList.remove('blurdiv');
    document.getElementById('footerid').classList.remove('blurdiv');
}
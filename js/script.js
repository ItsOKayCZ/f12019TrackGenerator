var all_tracks = {};
var normals = true;
var shorts = false; 
var selected = undefined;
var tracks = [];
var generating = false;
var usetimeout = true;
var tracks2020 = true;

function init(){
    shorts = document.getElementById('incshorts').checked;
    usetimeout = document.getElementById('usetimeout').checked;
    tracks2020 = document.getElementById('2020tracks').checked;

    fetch('data/tracks.json')
    .then(response => response.json())
    .then(data => {
        all_tracks = data;
        setup()});

}

function setup(){
    draw_logos();
}

//creates logos of tracks based on user input
function draw_logos(){
    tracks = [];
    let div = document.getElementById('tracks');
    div.innerHTML = '';

    if(normals){
        all_tracks['tracks'].forEach(element => {
            createlogo(div, element);
        });
    }

    if(shorts){
        all_tracks['short_tracks'].forEach(element => {
            createlogo(div, element);
        });
    }

    if(tracks2020){
        all_tracks['2020'].forEach(element => {
            createlogo(div, element);
        });
    }
}

//creates every single track logo
function createlogo(parent, element){
    let img = document.createElement('img');
    img.classList.add('track_logo');

    if(element['logo_src'] == ''){
        img.setAttribute('src', 'missing.jpg')
    }else{
        img.setAttribute('src', element['logo_src'])
    }        

    img.setAttribute('name', element['name'])
    img.setAttribute('track_name', element['track_name'])
    img.setAttribute('track_src', element['track_src'])
    parent.appendChild(img);
    tracks.push(img);
}

function rewriteText(){
    let racename = document.getElementById('race_name');
    let trackname = document.getElementById('track_name');
    let trackimg = document.getElementById('track_map');

    racename.innerHTML = selected.getAttribute('name');
    trackname.innerHTML = selected.getAttribute('track_name');
    trackimg.setAttribute('src', selected.getAttribute('track_src'));
}

//generate random track
function generate(){
    if(!generating){

        //reset selected style
        for (let i = 0; i < tracks.length; i++) {
            const element = tracks[i];
            element.classList.remove('selected');
        }

        //variables
        let rnum = Math.floor(Math.random()*tracks.length*3);
        generating = true; 
        let delay = 5;
        let timeout = 0;

        //generating
        if (usetimeout){
            //selecting animation
            for (let i = 0; i < rnum; i++) {
                setTimeout(() => {            
                    tracks[i%tracks.length].classList.add('selected');            
                }, timeout);
        
                setTimeout(() => {
                    tracks[i%tracks.length].classList.remove('selected');
                }, timeout + i*delay);
                timeout += i*delay; 
            }
            //setting the final selected track
            setTimeout(() => {
                selected =  tracks[rnum%tracks.length];
                selected.classList.add('selected');
                rewriteText();
                generating = false;
            },((rnum*(rnum-1))/2)*delay);
        }
        else{
            //set selected track without timeout
            selected =  tracks[rnum%tracks.length];
            selected.classList.add('selected');
            rewriteText();
            generating = false;
        }
    }
}

//include short tracks or not
function selectchanged(){
    shorts = !shorts;
    setup();
}

//user selected to change instantly
function timeoutchange(){
    usetimeout = !usetimeout;
}

function tracks2020change(){
    tracks2020 = !tracks2020;
}
/*
    global $
*/

let nameUser;

let $wrapper = $('#wrapper');

let directory = 'images/';

let islands = [];

let islandsShowed = [];

let score = 0;

/**
 * @constructor
 * @param {string} id name of Island formatted to id attribute
 * @param {boolean} hide
 * @param {HTMLElement} element div
 * @param {Array} images name of field without extension
 */
function Island(id, hide, element, ...images) {
    this.id = id;
    this.hide = hide;
    this.element = element;
    this.images = images;
}

/**
 * utility to hide and show the island, change the propertie hide
 */
Island.prototype.toggleHide = function() {
    if (this.hide) {
        $(this.element).show();
        this.hide = false;
    } else {
        $(this.element).hide();
        this.hide = true;
    }
};

/**
 * Initialization modals, open modal form and set the event to start
 */
$(document).ready(function() {
    $('.modal').modal({
        // Modal can be dismissed by clicking outside of the modal
        dismissible: false,
    });
    $wrapper.hide();
    $('#modalForm').modal('open');
    $('#start').click(start);
});

/**
 * Main method, validate the form, load the board game with images
 * and stablish all the features game
 */
function start() {
    let name = $('#name').val();
    let difficulty = $('input[name="difficulty"]:checked');

    if (allFieldsAreFilled(name, difficulty)) {
        $('#modalForm').modal('close');
        $wrapper.show();
        setName(name);
        setDifficulty(difficulty);
        setGameFeatures();
    } else {
        Materialize.toast(
            'Rellene todos los campos',
            4000,
            'white teal-text lighten-2 rounded'
        );
    }
}

/**
 *
 * @param {string} name Value from input name
 * @param {string} difficulty Value from input difficulty
 * @return {boolean} true if all is ok
 */
function allFieldsAreFilled(name, difficulty) {
    let regExp = /^[a-zA-Z\s]*$/;
    let checked = false;
    if (regExp.test(name) && name != '') {
        if (difficulty.length != 0) {
            checked = true;
        }
    } else {
        Materialize.toast(
            'Esta campo solo acepta letras y espacios',
            4000,
            'white teal-text lighten-2 rounded'
        );
    }
    return checked;
}

/**
 * Set on the class user-name text, the player name
 * @param {string} name
 */
function setName(name) {
    nameUser = name;
    $('.user-name').text(nameUser);
}

/**
 * This method load all the board with images, since island until
 * images with the places
 * @param {string} difficulty level of difficulty
 */
function setDifficulty(difficulty) {
    createIslands();
    islands.forEach((element) => {
        element.toggleHide();
    });

    let nIslandsToShow = 0;
    let nImagesToShow = 0;
    switch ($(difficulty).val()) {
        case 'easy':
            nIslandsToShow = 4;
            nImagesToShow = 4;
            break;
        case 'medium':
            nIslandsToShow = 5;
            nImagesToShow = 7;
            break;
        case 'hard':
            nIslandsToShow = 7;
            nImagesToShow = 9;
            break;
    }

    selectIslands(nIslandsToShow);
    let images = selectImages(nImagesToShow, nIslandsToShow);
    buildImagesHtml(images);
}

/**
 * Between a random and the level difficulty set the islands that
 * will be show.
 * @param {int} nIslandsToShow Number of islands to show, give it for
 * the difficulty
 */
function selectIslands(nIslandsToShow) {
    let random = permutation(0, 6);
    for (let i = 0; i < nIslandsToShow; i++) {
        let index = random.next().value;
        islands[index].toggleHide();
        islandsShowed.push(islands[index]);
    }
}

/**
 * Search the places images randomly, according to the islands showed
 * @param {int} nImagesToShow
 * @param {int} nIslandsToShow
 * @return {Array} names of fields which will be use
 */
function selectImages(nImagesToShow, nIslandsToShow) {
    let directoryImages = [];
    let rest = nImagesToShow % nIslandsToShow;

    // First catch one image from each island showed
    islandsShowed.forEach((element) => {
        let random = permutation(0, 3);
        directoryImages.push(element.images[random.next().value]);
    });

    // Then catch the rest from the firsts islands showed, checking repeats
    for (let i = 0; i < rest; i++) {
        let random = permutation(0, 3);
        let index = random.next().value;
        if (directoryImages.indexOf(
                islandsShowed[i].images[index]) == -1) {
            directoryImages.push(islandsShowed[i].images[index]);
        } else {
            i--;
        }
    }
    return directoryImages;
}

/**
 * Build the elements group to print the place images
 * @param {Array} array contains the images name
 */
function buildImagesHtml(array) {
    let $gallery = $('#gallery');
    array.forEach((element) => {
        let html = `<li class="ui-widget-content ui-corner-tr">
                        <a href="${directory}${element}.jpg" 
                        title="View larger image" 
                        class="ui-icon ui-icon-zoomin">View larger</a>
                        <img src="${directory}${element}-min.jpg">
                    </li>`;
        $gallery.append($(html));
    });
}

/**
 * Push on the array all the Islands objects
 */
function createIslands() {
    let lanzarote = new Island(
        'lanzarote',
        false,
        $('#lanzarote')[0],
        'lanzarote-1', 'lanzarote-2', 'lanzarote-3', 'lanzarote-4'
    );
    let laPalma = new Island(
        'laPalma',
        false,
        $('#laPalma')[0],
        'laPalma-1', 'laPalma-2', 'laPalma-3', 'laPalma-4'
    );
    let fuerteventura = new Island(
        'fuerteventura',
        false,
        $('#fuerteventura')[0],
        'fuerteventura-1', 'fuerteventura-2',
        'fuerteventura-3', 'fuerteventura-4'
    );
    let tenerife = new Island(
        'tenerife',
        false,
        $('#tenerife')[0],
        'tenerife-1', 'tenerife-2', 'tenerife-3', 'tenerife-4'
    );
    let laGomera = new Island(
        'laGomera',
        false,
        $('#laGomera')[0],
        'laGomera-1', 'laGomera-2', 'laGomera-3', 'laGomera-4'
    );
    let granCanaria = new Island(
        'granCanaria',
        false,
        $('#granCanaria')[0],
        'granCanaria-1', 'granCanaria-2', 'granCanaria-3', 'granCanaria-4'
    );
    let elHierro = new Island(
        'elHierro',
        false,
        $('#elHierro')[0],
        'elHierro-1', 'elHierro-2', 'elHierro-3', 'elHierro-4'
    );

    islands.push(
        lanzarote,
        laPalma,
        fuerteventura,
        tenerife,
        laGomera,
        granCanaria,
        elHierro
    );
}

/**
 * Method generator number random between the limits without repeats
 * @param {int} min
 * @param {int} max
 */
function* permutation(min, max) {
    let array = [];
    for (let i = min; i <= max; i++) {
        array.push(i);
    }

    let i = array.length;
    while (i--) {
        yield array.splice(Math.floor(Math.random() * (i + 1)), 1)[0];
    }
}

/**
 * Set all the properties, functions and parameters to drag & drop model
 */
function setGameFeatures() {
    let $gallery = $('#gallery');
    let $islands = $('#islands');

    // Listener for click
    $('ul.gallery > li').on('click', function(event) {
        let $item = $(this);
        let $target = $(event.target);

        if ($target.is('a.ui-icon-zoomin')) {
            viewLargerImage($target);
        }

        return false;
    });

    // Gallery items be draggable
    $('li', $gallery).draggable({
        cancel: 'a.ui-icon', // clicking an icon won't initiate dragging
        revert: 'invalid', // when not dropped, the item will
                            // revert back to its initial position
        containment: '.row',
        helper: 'clone',
        cursor: 'move',
    });

    // The islands be droppable
    Array.prototype.forEach.call(islandsShowed, (element) => {
        $(element.element).droppable({
            accept: '#gallery > li, #islands li',
            drop: function(event, ui) {
                moveToIsland(ui.draggable, this);
            },
        });
    });

    // Let the gallery be droppable as well, accepting items from the islands
    $gallery.droppable({
        accept: '#islands li',
        drop: function(event, ui) {
            returnImage(ui.draggable);
        },
    });

    /**
     * Move the image to the island
     * @param {*} $item item dropped
     * @param {HTMLElement} islandSelected element which dropped the image
     */
    function moveToIsland($item, islandSelected) {
        let nameIsland = $(islandSelected).attr('data-name');
        $item.fadeOut(function() {
            $item.appendTo(islandSelected).fadeIn();
        });
        Materialize.toast(
            `Ha soltado la imagen en la isla de ${nameIsland}`,
            4000,
            'white teal-text lighten-2 rounded'
        );
    }

    /**
     * Return the image to the gallery
     * @param {*} $item item dropped
     */
    function returnImage($item) {
        $item.fadeOut(function() {
            $item
                .appendTo($gallery)
                .fadeIn();
        });
    }
}

/**
 * Load and active the modal with a image expansion
 * @param {*} $link element to check if the modal it was created
 */
function viewLargerImage($link) {
    let src = $link.attr('href');
    let title = $link.siblings('img').attr('alt');
    let $modal = $('img[src$="' + src + '"]');

    if ($modal.length) {
        $modal.dialog('open');
    } else {
        let img = $(`<img alt="${title}" 
        style="display: none; padding: 8px;" />`)
            .attr('src', src).appendTo('body');
        setTimeout(function() {
            img.dialog({
                title: title,
                width: 400,
                modal: true,
            });
        }, 1);
    }
}

/**
 * Set the handler to the button check
 */
$('#checkButton').on('click', gameOfFinalModals);

/**
 * Shuffle, and nested modals
 */
function gameOfFinalModals() {
    let $modal = $('#modalCheckAnswers');
    $('#checkAnswersForm').slideDown();
    $('#yesButton').removeAttr('disabled');
    $modal.find('#finalMessageScore').hide();
    $modal.find('#restart').hide();
    $modal.on('click', '#yesButton', function() {
        $(this).off('click', '**');
        $('#checkAnswersForm').slideUp();
        setScore();
        updateScore();
        $modal.find('#restart').slideDown();
        setEventsRestartButtons();
    });
    $modal.on('click', '#noButton', function(event) {
        $modal.modal('close');
    });
    $modal.modal('open');
}

/**
 * Set the score one point with each success
 */
function setScore() {
    // Find the divs which contains li which contains the attribute href
    let $aElements = $('#islands').find('div>li').find('[href]');
    let arrayImage = [];
    let arrayIsland = [];

    $aElements.each(function() {
        // Save the href value
        arrayImage.push($(this).attr('href'));
        // Save the id value from first div parent of the a element
        arrayIsland.push($(this).parents('div').first().attr('id'));
    });

    for (let i = 0; i < arrayImage.length; i++) {
        let image = arrayImage[i];
        // Remove the directory image and extension file
        image = image.slice(7);
        image = image.substring(0, image.length - 6);
        const island = arrayIsland[i];

        if (image == island) {
            score++;
        }
    }
}

/**
 * Update the score fields
 */
function updateScore() {
    let $score = $('.score');
    $score.text(score);
    $('#modalCheckAnswers').find('#finalMessageScore').slideDown();
}

/**
 *
 */
function setEventsRestartButtons() {
    $('#yesButtonRestart').on('click', function() {
        restart();
    });
    $('#noButtonRestart').on('click', function() {
        $wrapper.slideUp();
        $('#modalCheckAnswers').modal('close');
        $('#finishModal').modal('open');
    });
}

/**
 * Put on the initial state all the game
 */
function restart() {
    $wrapper.slideUp();
    $('#modalCheckAnswers').modal('close');
    islands = [];
    islandsShowed = [];
    $('#gallery').empty();
    $('.island').empty();
    $('#name').attr('disabled', 'disabled');
    $('#modalForm').modal('open');
}

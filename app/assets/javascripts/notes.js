$(document).ready(function(){
  compileIndexNoteTemplate();
  compileNewNoteTemplate();
  compileShowNoteTemplate();
  compileEditNoteTemplate();
  newNote();
  createNote();
  showNote();
  editNote();
  updateNote();
  deleteNote();
});

class Note {
  constructor(attributes){
    this.id = attributes.id;
    this.title = attributes.title;
    this.content = attributes.content;
  }

  // Render the handlebars template
  renderIndexNote() {
    return indexNoteTemplate(this);
  }

  renderNewNote(){
    return newNoteTemplate(this);
  }

  renderShowNote(){
    return showNoteTemplate(this);
  }

  renderEditNote(){
    return editNoteTemplate(this);
  }
}

function newNote() {
  $(document).on("click", '.js-new-note', function(event) {
    event.preventDefault();
    $.get( $(event.target).attr('href'), function( data ) {
      var note = new Note(data);
      var noteRender = note.renderNewNote();
      $("#new-note").html("");
      $("#new-note").append(noteRender);
    });
  });
}

function createNote() {
  $(document).on("submit", ".create-note", function(event) {
    event.preventDefault();
    var values = $(this).serialize();
    var url = $(event.target).attr('action');
    $.post(url, values, function( data ) {
      $("#new-note").html("");
      var note = new Note(data);
      var noteRender = note.renderIndexNote();
      $(".notes-block").prepend(noteRender);
    });
  }); 
}

function showNote() {
  $(document).on("click", '.js-get-note', function(event) {
    event.preventDefault();
    $.get( $(event.target).attr('href'), function( data ) {
      var note = new Note(data);
      var noteRender = note.renderShowNote();
      $("#note-" + note.id).html("");
      $("#note-" + note.id).append(noteRender);
    });
  });
}

// GET Request the edit form for a Note
function editNote() {
  $(document).on("click", ".js-edit-note", function(event){
    event.preventDefault();
     $.get( $(event.target).attr('href'), function( data ) {
      var note = new Note(data);
      var noteRender = note.renderEditNote();
      var id = '#' + data.id;
      $("#note-" + note.id).html(noteRender);
      $("#note-" + note.id + ' #note_title').val(note.title);
      $("#note-" + note.id + ' textarea').val(note.content);
    });
  });
}

// Update the Note on the page via AJAX post request
function updateNote() {
  $(document).on("submit", ".save-note", function(event) {
    event.preventDefault();
    var values = $(this).serialize();
    var url = $(event.target).attr('action');
    $.post(url, values, function( data ) {
      var note = new Note(data);
      $("#note-" + note.id).html("");
      $("#note-" + note.id).html(noteRender);
      var noteRender = note.renderIndexNote();
      $(".notes-block").prepend(noteRender);
    });
  }); 
}

function deleteNote() {
  $(document).on("submit", ".delete-note", function(event) {
    event.preventDefault();
    var values = $(this).serialize();
    var url = $(event.target).attr('action');
   $.post(url, values, function( data ) {
      var note = new Note(data);
      $("#note-" + note.id).html("");
    });
  }); 
}

// compile the handlebars template on document load
function compileIndexNoteTemplate(){
  indexNoteSource = $("#indexNoteTemplate").html();
  if ( indexNoteSource !== undefined ) {
    indexNoteTemplate = Handlebars.compile(indexNoteSource); 
  }
}

function compileNewNoteTemplate(){
  newNoteSource = $("#newNoteTemplate").html();
  if ( newNoteSource !== undefined ) {
    newNoteTemplate = Handlebars.compile(newNoteSource); 
  }
}

function compileShowNoteTemplate(){
  showNoteSource = $("#showNoteTemplate").html();
  if ( showNoteSource !== undefined ) {
    showNoteTemplate = Handlebars.compile(showNoteSource); 
  }
}

// compile the handlebars EditComment template on load
function compileEditNoteTemplate(){
  var editNoteSource = $("#editNoteTemplate").html();
  if ( editNoteSource !== undefined ) {
    editNoteTemplate = Handlebars.compile(editNoteSource); 
  }
}

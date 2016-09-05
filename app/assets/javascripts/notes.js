$(document).ready(function(){
  compileNoteTemplate();
  compileNewNoteTemplate();
  compileEditNoteTemplate();
  newNote();
  showNote();
  editNote();
  updateNote();
});

class Note {
  constructor(attributes){
    this.id = attributes.id;
    this.title = attributes.title;
    this.content = attributes.content;
  }

  // Render the handlebars template
  renderNote() {
    return noteTemplate(this);
  }

  renderNewNote(){
    return newNoteTemplate(this);
  }

  renderEditNote(){
    return editNoteTemplate(this);
  }
}

function newNote() {
  $(document).on("click", '.js-new-note', function(event) {
    event.preventDefault();
    $.ajax({
      url: $(event.target).attr('href'),
      method: "GET",
      dataType: 'JSON'
    }).success(function(data) {
      var note = new Note(data);
      var noteRender = note.renderNewNote();
      $("#new-note").html("");
      $("#new-note").append(noteRender);
    });
  });
}

function showNote() {
  $(document).on("click", '.js-get-note', function(event) {
    event.preventDefault();
    $.ajax({
      url: $(event.target).attr('href'),
      method: "GET",
      dataType: 'JSON'
    }).success(function(data) {
      var note = new Note(data);
      var noteRender = note.renderNote();
      $("#note-" + note.id).html("");
      $("#note-" + note.id).append(noteRender);
    });
  });
}

// GET Request the edit form for a Note
function editNote() {
  $(document).on("click", ".js-edit-note", function(event){
    event.preventDefault();
    var href = $(this).attr('href');
    $.ajax({
      url: href,
      method: "GET",
      dataType: 'JSON'
    }).success(function(data) {
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
    $.ajax({
      url:  url,
      method: "POST",
      dataType: 'JSON',
      data: values
    }).success(function(data) {
      var note = new Note(data);
      var noteRender = note.renderNote();
      $(".notes-block").prepend(noteRender);
    });
  }); 
}

// compile the handlebars template on document load
function compileNoteTemplate(){
  noteSource = $("#noteTemplate").html();
  if ( noteSource !== undefined ) {
    noteTemplate = Handlebars.compile(noteSource); 
  }
}

function compileNewNoteTemplate(){
  newNoteSource = $("#newNoteTemplate").html();
  if ( newNoteSource !== undefined ) {
    newNoteTemplate = Handlebars.compile(newNoteSource); 
  }
}

// compile the handlebars EditComment template on load
function compileEditNoteTemplate(){
  var editNoteSource = $("#editNoteTemplate").html();
  if ( editNoteSource !== undefined ) {
    editNoteTemplate = Handlebars.compile(editNoteSource); 
  }
}

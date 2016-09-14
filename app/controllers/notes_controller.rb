class NotesController < ApplicationController
  before_action :set_note, except: [:index, :new]

  def index
    @notes = Note.all
    render json: @notes
  end

  def new
    @note = Note.new
    render json: @note
  end

  def create
    @note = Note.new(note_params)
    if @note.save
      render json: @note
    end
  end

  def show
    render json: @note
  end

  def edit
    render json: @note
  end

  def update
    if @note.update(note_params)
      render json: @note
    end
  end

  def destroy
    @note.destroy
    redirect_to notes_path
  end

  private
  def note_params
    params.require(:note).permit(:content, :title)
  end

  def set_note
    @note = Note.find_by(id: params[:id])
  end
end

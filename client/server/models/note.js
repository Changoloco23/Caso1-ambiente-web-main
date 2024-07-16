class Note {
    constructor(id, title, content, tags = []) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.tags = tags;
      this.createdAt = new Date();
      this.updatedAt = new Date();
    }
  }
  
  module.exports = Note;